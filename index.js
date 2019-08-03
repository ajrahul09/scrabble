var express = require('express');
var app = express();
var fs = require('fs');
var http = require('http').Server(app);
var io = require('socket.io')(http);

var sotm=[];
var ospd=[];

var flag_SOTM=true;
var flag_OSPD=true;

var rooms=[];
var people={};
var clients = [];
var clientNum=0;
var roomNum=0;



// app.get('/', function(req, res){
// 	var done = finalhandler(req, res);
// 	serve(req,res,done);
//   // res.sendfile('board.html');
// });

app.use(express.static(__dirname));

// var server=http.createServer(function(request, response) {
// 	var path=url.parse(request.url).pathname;
// 	var done = finalhandler(request, response);
//     serve(request,response,done);
// }

// io.sockets.on('connect', function(client) {
// 	var c=client.id;
//     clients.push(client.id);
//     clientNum++;
//     if(clientNum>1) {
//       io.sockets.connected[c].emit("storeClientId", {id: c, turn: false, num: clientNum});
//     } else {
//       io.sockets.connected[c].emit("storeClientId", {id: c, turn: true, num: clientNum});
//     }
//     console.log(c);

//     client.on('disconnect', function() {
//         clients.splice(clients.indexOf(client), 1);
//         clientNum--;
//         console.log(clientNum);
//     });
// });

// setTimeout(function(){
// 	console.log("here!");
    // io.sockets.connected[clients[0]].emit("greeting", "Howdy, User 1!");
    // io.sockets.connected[clients[1]].emit("greeting", "Hey there, User 2");
// }, 3000);

io.on('connection', function(socket) {
  var c=socket.id;
  clients.push(c);

  io.sockets.connected[c].emit("storeClientId", c);

  clientNum++;

  console.log('Scrabbler #'+clientNum+' connected');

  socket.on('disconnect', function() {

    var cli=socket.id;

    if(people[cli]!=null) {
    
      var p=people[cli]["room"];
      var index=rooms[p].indexOf(cli);
      rooms[p].splice(index, 1);

      var disuser=people[cli]["name"];
      for(var i=0;i<rooms[p].length;i++) {
        io.sockets.connected[rooms[p][i]].emit("disconnectmsg", disuser);
      }
      people[cli]=null;

    }

    console.log('Scrabbler #'+clientNum+' disconnected');

    var ids=clients.indexOf(cli);
    clients.splice(ids, 1);
    clientNum--;
  });

  socket.on('roomPick', function(map) {
  
    if(rooms[roomNum]==null) {
      rooms[roomNum]=[];
    }
      rooms[roomNum].push(map["id"]);
      // console.log(rooms[roomNum]);
      people[map["id"]]={"name": map["name"], "room": roomNum};

      console.log(map["name"]+' connected');

      var scrabblers=[];
      for(var i=0;i<rooms[roomNum].length;i++) {
        scrabblers.push(rooms[roomNum][i]);
        scrabblers.push(people[rooms[roomNum][i]]["name"]);
      }

      if(rooms[roomNum].length==4) {
        io.sockets.connected[map["id"]].emit("gameStart", scrabblers);
      }

      else if(rooms[roomNum].length==1) {
          io.sockets.connected[map["id"]].emit("waiting", true);
      }

      else if(rooms[roomNum].length>=2) {
        for(var i=0;i<rooms[roomNum].length;i++) {
            io.sockets.connected[rooms[roomNum][i]].emit("gameMatch", scrabblers);
        }
      }     

  });

  socket.on('roomTaken', function(id) {
    var p=people[id]["room"];
    // console.log(p);
    for(var i=0;i<rooms[p].length;i++) {
      if(i==0)
          io.sockets.connected[rooms[p][i]].emit("gameisOn", true);
        else
          io.sockets.connected[rooms[p][i]].emit("gameisOn", false);
    }
    roomNum++;
  });

  socket.on('addScrabblers', function(scr) {
    var id=scr[0];
    var p=people[id]["room"];

    for(var i=0;i<rooms[p].length;i++) {
      io.sockets.connected[rooms[p][i]].emit("addScrabblers", scr);
    }
  });

  socket.on('sendWords', function(msg) {
    var wrds=msg["words"];
    console.log(wrds);
    var val=wordsValidate(wrds);
    console.log(val);
    if(val<=3) {
      var p=people[msg["id"]]["room"];
      for(var i=0;i<rooms[p].length;i++) {
        io.sockets.connected[rooms[p][i]].emit("sendBoard", msg["position"]);
      }
      // io.emit('sendBoard', msg["position"]);
      if(val<=2)
        io.sockets.connected[msg["id"]].emit("scoreUpdate", {id: msg["id"], scoreBonus:50});
      else 
        io.sockets.connected[msg["id"]].emit("scoreUpdate", {id: msg["id"], scoreBonus:0});

      turnChange(msg["id"]);

    } else {
      io.sockets.connected[msg["id"]].emit("sendBoardFalse", wrds);
    }
  });

  socket.on('sendScore', function(msg){
    var p=people[msg["id"]]["room"];
    // var pos=rooms[p].indexOf(msg["id"]);
    // msg["id"]=pos;
    for(var i=0;i<rooms[p].length;i++) {
        io.sockets.connected[rooms[p][i]].emit("scoring", msg);
    }
    // io.emit('scoring', msg);
  });

  socket.on('turn', function(id){
    turnChange(id);
  });

  socket.on('chat message', function(map) {

    var p=people[map["id"]]["room"];
    // var pos=rooms[p].indexOf(map["id"]);
    var msg={};
    msg["scrabbler"]=people[map["id"]]["name"];
    msg["msg"]=map["msg"];
    for(var i=0;i<rooms[p].length;i++) {
      io.sockets.connected[rooms[p][i]].emit('chat message', msg);
    }

    // var ids=clients.indexOf(map["id"]);
    // map["id"]=(ids+1);
    // io.emit('chat message', map);
  });

  });

function turnChange(ids) {

  var p=people[ids]["room"];
  var pos=rooms[p].indexOf(ids);

  pos++;
  if(pos>=rooms[p].length)
    pos=0;
  for(var i=0;i<rooms[p].length;i++) {
    if(i!=pos) {
      io.sockets.connected[rooms[p][i]].emit("playerTurn", false);
    }
    else {
      io.sockets.connected[rooms[p][i]].emit("playerTurn", true);
    }
  }
}



fs.readFile(__dirname+'/sotm.txt', function(err, data) {
	    if(err) throw err;
	    var array =data.toString().split('\n');
	    //var arr=[];
	    // arr.push(array);
	    for (i in array)
	    {
	        sotm[i]=array[i].replace(/[\n\r]+/g, '').toUpperCase();
	    }
	    console.log("sotm Loaded" );
	});

fs.readFile(__dirname+'/ospd.txt', function(err, data) {
        if(err) throw err;                                                                                                                                                                               
	    var array =data.toString().split('\n');
	    //var arr=[];
	    // arr.push(array);

	    for (i in array)
	    {
	        ospd[i]=array[i].replace(/[\n\r]+/g, '').toUpperCase();
	    }
	     console.log("ospd Loaded" );
	                                                        // console.log(num_of_clients);
	  });


http.listen(3000, function(){
  console.log('listening on *:3000');
});

function wordsValidate(message) {
	flag_OSPD=true;
	flag_SOTM=true;
	
	for(var i=0;i<message.length;i++) {
		console.log(message[i]);
		if(flag_OSPD || flag_OSPD){
	    	flag_SOTM= (sotm.indexOf(message[i])!=-1 );
        	flag_OSPD=(ospd.indexOf(message[i])!=-1);
    	}else{
    		break;
    	}
    }
    console.log("flag_SOTM || flag_OSPD :" + flag_SOTM +":"+ flag_OSPD);

    if(flag_OSPD && flag_SOTM) {
      return 1;
    } else if(flag_SOTM) {
      return 2;
    } else if(flag_OSPD) {
      return 3;
    } else {
      return 4;
    }

}

