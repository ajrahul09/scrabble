var tileCounts=[9, 2, 2, 4, 12, 2, 3, 2, 9, 1, 1, 4, 2, 6, 8, 2, 1, 6, 4, 6, 4, 2, 2, 1, 2, 1, 2];
var alp=["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "_"];
var tiles=[];
var board=[];
var boardTile=[];
var possWords=[];
var possScores=[];

var boardColour=[[ 1, 0, 0, 3, 0, 0, 0, 1, 0, 0, 0, 3, 0, 0, 1], [0, 2, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 2, 0], [0, 0, 2, 0, 0, 0, 3, 0, 3, 0, 0, 0, 2, 0, 0], [3, 0, 0, 2, 0, 0 ,0, 3, 0, 0 ,0, 2, 0, 0, 3], [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0], [0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0 ,0, 4, 0], [0, 0, 3, 0, 0, 0, 3, 0 ,3, 0, 0, 0, 3, 0, 0], [1, 0, 0, 3, 0, 0, 0, 5, 0, 0, 0, 3, 0, 0, 1], [0, 0, 3, 0, 0, 0, 3, 0 ,3, 0, 0, 0, 3, 0, 0], [0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0], [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0], [3, 0, 0, 2, 0, 0, 0, 3, 0, 0, 0, 2, 0, 0, 3], [0, 0, 2, 0, 0, 0, 3, 0, 3, 0, 0, 0, 2, 0, 0], [0, 2, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 2, 0], [1, 0, 0, 3, 0, 0, 0, 1, 0, 0, 0, 3, 0, 0, 1]];
var boardColour1=[];
var score=[1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3, 1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10, 0];

var tileAlp;
var tileFlag;
var tilePos;
var scores;
var firstmove=true;

function start(scrabblers) {
            scorePanel(scrabblers);
            init();
            fillBoard();
            colorPick();
            fillTiles();
            randomiseTiles();
}

function resume() {
            resetTiles();
            randomiseTiles();           
}

function resetBoardTile() {
            for(var i=0;i<15;i++) {
                        for(var j=0;j<15;j++) {
                                    boardTile[i][j]=-1;
                        }
            }
}

function cloneBoardColour(arr, arr1) {
      for(var i=0;i<15;i++) {
            for(var j=0;j<15;j++) {
                  arr[i][j]=arr1[i][j];
            }
      }
}

function scorePanel(scrabblers) {
      var temp='';

      temp+='<div class="row" id="scoringRow1">';
            temp+='<div class="col-md-6">';
            temp+='<div id="numbuh1">Me</div>';
            temp+='<div id="'+scrabblers[0]+'">'+0+'</div></div></div>';

      for(var i=2;i<scrabblers.length;i+=2) {
                                                           
            temp+='<div class="row" id="scoringRow'+(i/2+1)+'">';
            temp+='<div class="col-md-6">';
            temp+='<div id="numbuh'+(i/2+1)+'">'+scrabblers[i+1]+'</div>';
            temp+='<div id="'+scrabblers[i]+'">'+0+'</div></div></div>';
      }
      document.getElementById('scorePanel').innerHTML=temp;

      document.getElementById('rowTiles').style.visibility = "visible";
      document.getElementById('scorePanel').style.visibility = "visible";
      document.getElementById('legends').style.visibility = "visible";
      document.getElementById('msgBlock').style.visibility = "visible";
      document.getElementById('chat').style.visibility = "visible";
}

function init() {
            scores=0;
            for (var i=0;i<15;i++) {
            boardColour1[i]=[];
            }
            cloneBoardColour(boardColour1, boardColour);
            for (var i=0;i<15;i++) {
            board[i]=[];
            }

            for (var i=0;i<15;i++) {
            boardTile[i]=[];
            }

            for(var i=0;i<15;i++) {
                        for(var j=0;j<15;j++) {
                                    boardTile[i][j]=-1;
                        }
            }

            for(var i=0;i<15;i++) {
                        for(var j=0;j<15;j++) {
                                    board[i][j]=-1;
                        }
            }
}

function fillBoard() {
            for(var i=0;i<15;i++) {
                        var temp="";
                        temp+='<tr id="row_'+i+'">';
                        for(var j=0;j<15;j++) {
                                    temp+='<td id="cell_'+i+'_'+j+'" onClick="boardClick(this)" ></td>';//ondrop="drop(this)"
                        }
                        temp+='</tr>';
                        document.getElementById('board').innerHTML+=temp;
            }
}

function resetBoard() {
      for(var i=0;i<15;i++) {
                        for(var j=0;j<15;j++) {
                                   document.getElementById('cell_'+i+'_'+j).innerHTML="";
                        }
            }
}

function resetBoard1() {
      for(var i=0;i<15;i++) {
                        for(var j=0;j<15;j++) {
                              if(boardTile[i][j]!=-1)
                                   document.getElementById('cell_'+i+'_'+j).innerHTML="";
                        }
      }
}

function fillTiles() {
            var temp="<tr>";
            for(var i=0;i<7;i++) {
                        temp+='<td id="tile_'+i+'" onClick="tileClick(this)"></td>';// ondrag="drag(this)" draggable="true"
            }
            temp+='</tr>';
            document.getElementById('tiles').innerHTML+=temp;
}

function colorPick() {
            for(var i=0; i<15; i++) {
                        for(var j=0; j<15; j++) {
                                    if(boardColour[i][j]==1) {
                                                document.getElementById('cell_'+i+'_'+j).style.backgroundColor="#FF3333";
                                    }
                                    if(boardColour[i][j]==2) {
                                                document.getElementById('cell_'+i+'_'+j).style.backgroundColor="#FF9999";//9CBA7F
                                    }
                                    if(boardColour[i][j]==3) {
                                                document.getElementById('cell_'+i+'_'+j).style.backgroundColor="#ADD8E6";//659D32
                                    }
                                    if(boardColour[i][j]==4) {
                                                document.getElementById('cell_'+i+'_'+j).style.backgroundColor="#60AFFE";//3D5229
                                    }
                                    if(boardColour[i][j]==5) {
                                                document.getElementById('cell_'+i+'_'+j).style.backgroundColor="#FF9999";
                                    }
                                    if(boardColour[i][j]==0) {
                                                document.getElementById('cell_'+i+'_'+j).style.backgroundColor="#36648B";
                                    }
                        }
            }
}

function updateScore(bonus) {
      var score1=0;
      var letterMul=1, wordMul=1;
      for(var i=0;i<possWords.length;i++) {
            var score1=0;
            wordMul=1;
            var str=possWords[i];
            var scr=possScores[i];
            for(var j=0;j<str.length;j++) {
                  letterMul=1;
                  var ch=str.charAt(j);
                  var sc=scr.charAt(j);
                  var index=alp.indexOf(ch);
                  if(sc==3) {
                        letterMul=2;
                  }
                  if(sc==4) {
                        letterMul=3;
                  }
                  if(sc==1) {
                        wordMul=3;
                  }
                  if(sc==2){
                        wordMul=2;
                  }
                  if(sc==5){
                        wordMul=2;
                  }
                  score1+=score[index]*letterMul;
            }
            score1=wordMul*score1;
            console.log(score1);
            scores+=score1;
      }
      scores+=bonus;
      return scores;
}

function sendBoard(msg) {
      for(var i=0;i<15;i++) {
            for(var j=0;j<15;j++) {
                  if(boardTile[i][j]!=-1)
                        document.getElementById('cell_'+i+'_'+j).innerHTML="";
                  if(msg[i][j]!=null) {
                        document.getElementById('cell_'+i+'_'+j).innerHTML=msg[i][j];
                        board[i][j]=1;
                  }
            }
      }
}

function scoring(map) {
      var id=map["id"];
      var score2=map["score"];
      document.getElementById(id).innerHTML=score2;
}


function randomiseTiles() {
      var tileFill=tileCounts;
      for(var i=0;i<7;i++) {
                  var num=random(0, 25);
                  while(tileFill[num]==0) {
                              num=random(0, 25);
                  }
                  // tileFill[num]--;
                  tiles[i]=alp[num];
      }


      for(var i=0;i<7;i++) {
                  document.getElementById('tile_'+i).innerHTML=tiles[i]+"<sub>"+score[alp.indexOf(tiles[i])]+"</sub>";
      }
}

function resetTiles() {
            for(var i=0;i<7;i++) {
                        document.getElementById('tile_'+i).style.visibility = "visible";
                        document.getElementById('tile_'+i).style.backgroundColor="transparent"; 
                        document.getElementById('tile_'+i).style.color="#000";                 
            }
}

function updateTiles() {
            var tileFill=tileCounts;
            for(var i=0;i<7;i++) {
                        if(document.getElementById('tile_'+i).style.visibility=="hidden") {
                                    document.getElementById('tile_'+i).style.visibility = "visible"; 
                                    document.getElementById('tile_'+i).style.backgroundColor="transparent"; 
                                    document.getElementById('tile_'+i).style.color="#000";
                                    var num=random(0, 25);
                                    while(tileFill[num]==0) {
                                                num=random(0, 25);
                                    }
                                    tileFill[num]--;
                                    tiles[i]=alp[num];
                        }
            }
            for(var i=0;i<7;i++) {
                        document.getElementById('tile_'+i).innerHTML=tiles[i]+"<sub>"+score[alp.indexOf(tiles[i])]+"</sub>";
            }
}

function random(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function drop(cell) {
//       console.log("drop");
//       if(tileFlag==true) {
//             if(boardTile[x][y]==-1 && board[x][y]==-1) {
//                   document.getElementById('cell_'+x+'_'+y).innerHTML=tileAlp;
//                   boardTile[x][y]=tilePos;
//                   document.getElementById('tile_'+tilePos).style.visibility = "hidden";
//                   tileFlag=false;
//             }
//       }
// }

// function drag(tile) {
//       console.log("drag");
//             var id=tile.id;
//             var res = id.split("_");
//             tilePos=res[1];
//             tileFlag=true;
//             tileAlp=tiles[tilePos];
// }

function tileClick(tile) {
            var id=tile.id;
            var res = id.split("_");
            if(tilePos!=null) {
                  document.getElementById('tile_'+tilePos).style.backgroundColor="transparent"; 

                  document.getElementById('tile_'+tilePos).style.color="#000";
            }
            tilePos=res[1];
            console.log(tilePos);
            tileFlag=true;
            tileAlp=tiles[tilePos];
            document.getElementById('tile_'+tilePos).style.backgroundColor="#822C07";
            document.getElementById('tile_'+tilePos).style.color="#FFF";
}

function boardClick(cell) {
            var id=cell.id;
            var res = id.split("_");
            var x=res[1];
            var y=res[2];
            if(tileFlag==true) {
                        if(boardTile[x][y]==-1 && board[x][y]==-1) {
                                    document.getElementById('cell_'+x+'_'+y).innerHTML=tileAlp;
                                    boardTile[x][y]=tilePos;
                                    document.getElementById('tile_'+tilePos).style.visibility = "hidden";
                                    tileFlag=false;
                        } else {
                                    var pos=boardTile[x][y];
                                    if(board[x][y]==-1 && tileFlag==true && pos!=tilePos) {
                                                document.getElementById('tile_'+pos).style.visibility = "visible";
                                                document.getElementById('tile_'+tilePos).style.visibility = "hidden";
                                                document.getElementById('cell_'+x+'_'+y).innerHTML=tileAlp;
                                                boardTile[x][y]=tilePos;
                                                tileFlag=false;
                                    } else {

                                    }
                        }
            } else {
                        if(boardTile[x][y]!=-1) {
                                    document.getElementById('tile_'+boardTile[x][y]).style.visibility = "visible";
                                    document.getElementById('tile_'+boardTile[x][y]).style.backgroundColor="transparent";
                                    document.getElementById('tile_'+boardTile[x][y]).style.color="#000"; 
                                    document.getElementById('cell_'+x+'_'+y).innerHTML="";
                                    boardTile[x][y]=-1;
                                    tileFlag=false;
                        }
            }
}

function tileValidation() {
                  var count=0;
                  possWords=[];
                  possScores=[];

            var xmin=14, xmax=0, ymin=14, ymax=0;
            for(var i=0;i<15;i++){
                        for(var j=0;j<15;j++) {
                                    if(boardTile[i][j]!=-1) {
                                                if(xmin>i)
                                                            xmin=i;
                                                if(xmax<i)
                                                            xmax=i;
                                                if(ymin>j)
                                                            ymin=j;
                                                if(ymax<j)
                                                            ymax=j;
                                    }
                        }
            }
            var tileValid=true;
            if(!(boardTile[7][7]!=-1 || board[7][7]!=-1))
                        tileValid=false;
            if((xmax-xmin)==0 || (ymax-ymin)==0) {
                        if(xmin==xmax) {
                                    var stro="";
                                    var scr="";
                                    var partOf=false;
                                    for(var i=ymin;i<=ymax;i++) {
                                                stro+=document.getElementById('cell_'+xmin+'_'+i).innerHTML;
                                                scr+=boardColour[xmin][i];
                                                boardColour1[xmin][i]=0;
                                                if(board[xmin][i]!=-1)
                                                      partOf=true;
                                                if(boardTile[xmin][i]==-1 && board[xmin][i]==-1) {
                                                            tileValid=false;
                                                            break;
                                                }
                                    }
                                    var newstr=stro;
                                    for(var i=ymin-1;i>=0;i--) {
                                                if(board[xmin][i]!=-1) {
                                                            stro=document.getElementById('cell_'+xmin+'_'+i).innerHTML+stro;
                                                            scr=boardColour[xmin][i]+scr;
                                                            boardColour1[xmin][i]=0;
                                                } else {
                                                            break;
                                                }
                                    }
                                    for(var i=ymax+1;i<15;i++) {
                                                if(board[xmin][i]!=-1) {
                                                            stro=stro+document.getElementById('cell_'+xmin+'_'+i).innerHTML;

                                                            scr=scr+boardColour[xmin][i];

                                                boardColour1[xmin][i]=0;
                                                } else {
                                                            break;
                                                }
                                    }
                                    if(tileValid && stro.length>1) {
                                                possWords[count]=stro;
                                                possScores[count]=scr;
                                                count++;
                                    }

                                    if(tileValid==true) {
                                                
                                                for(var i=ymin;i<=ymax;i++) {
                                                            if(boardTile[xmin][i]!=-1) {
                                                                        var x1=xmin, x2=xmax;
                                                                        stro+=document.getElementById('cell_'+xmin+'_'+i).innerHTML;

                                                                        scr+=boardColour[xmin][i];

                                                                        boardColour1[xmin][i]=0;
                                                                        while(x1>0 && board[x1-1][i]!=-1) {
                                                                                    x1--;
                                                                        }
                                                                        while(x2<14 && board[x2+1][i]!=-1) {
                                                                                    x2++;
                                                                        }
                                                                        if(x1!=x2) {
                                                                                    var str="";
                                                                                    for(var j=x1;j<=x2;j++) {
                                                                                                str+=document.getElementById('cell_'+j+'_'+i).innerHTML;

                                                                                                scr+=boardColour[j][i];

                                                                                                boardColour1[j][i]=0;
                                                                                    }
                                                                                    possWords[count]=str;
                                                                                    possScores[count]=scr;
                                                                                    count++;
                                                                        }
                                                            }
                                                }
                                    }
                                    if(!firstmove && !partOf && newstr==possWords[0] && possWords.length==1) {
                                          tileValid=false;
                                    }
                        }
                        else {
                                    var stro="";
                                    var scr="";
                                    var partOf=false;
                                    for(var i=xmin;i<=xmax;i++) {
                                                stro+=document.getElementById('cell_'+i+'_'+ymin).innerHTML;

                                                scr+=boardColour[i][ymin];

                                                boardColour1[i][ymin]=0;
                                                if(board[i][ymin]!=-1)
                                                      partOf=true;
                                                if(boardTile[i][ymin]==-1 && board[i][ymin]==-1) {
                                                            tileValid=false;
                                                            break;
                                                }
                                    }
                                    var newstr=stro;
                                    for(var i=xmin-1;i>=0;i--) {
                                                if(board[i][ymin]!=-1) {
                                                            stro=document.getElementById('cell_'+i+'_'+ymin).innerHTML+stro;

                                                            scr=boardColour[i][ymin]+scr;

                                                            boardColour1[i][ymin]=0;
                                                } else {
                                                            break;
                                                }
                                    }
                                    for(var i=xmax+1;i<15;i++) {
                                                if(board[i][ymin]!=-1) {
                                                            stro=stro+document.getElementById('cell_'+i+'_'+ymin).innerHTML;

                                                            scr=scr+boardColour[i][ymin];

                                                            boardColour1[i][ymin]=0;
                                                } else {
                                                            break;
                                                }
                                    }
                                    if(tileValid && stro.length>1) {
                                                possWords[count]=stro;
                                                possScores[count]=scr;
                                                count++;
                                    }

                                    if(tileValid) {
                                                
                                                for(var i=xmin;i<=xmax;i++) {
                                                            if(boardTile[i][ymin]!=-1) {
                                                                        var y1=ymin, y2=ymax;
                                                                        
                                                                        while(y1>0 && board[i][y1-1]!=-1) {
                                                                                    y1--;
                                                                        }
                                                                        while(y2<14 && board[i][y2+1]!=-1) {
                                                                                    y2++;
                                                                        }

                                                                        if(y1!=y2) {
                                                                                    var str="";
                                                                                    var scr="";
                                                                                    for(var j=y1;j<=y2;j++) {
                                                                                                str+=document.getElementById('cell_'+i+'_'+j).innerHTML;

                                                                                                scr+=boardColour[i][j];

                                                                                                boardColour1[i][j]=0;
                                                                                    }
                                                                                    possWords[count]=str;
                                                                                    possScores[count]=scr;
                                                                                    count++;
                                                                        }
                                                            }
                                                }
                                    }
                                    if(!firstmove && !partOf && newstr==possWords[0] && possWords.length==1) {
                                          tileValid=false;
                                    }
                        }

                        for(var i=0;i<count;i++) {
                                    console.log(possWords[i]);
                                    console.log(possScores[i]);
                        }

                        if(possWords.length==0)
                              tileValid=false;
                        // var text=readTextFile("file:///C:/apache-tomcat-9.0.0.M4/webapps/scrabble/ospd.txt");
                        // alert(text);

                        

            } else {
                        tileValid=false;
            }

            if(tileValid) {
                        var map={};
                        map["words"]=possWords;
                        var x = new Array(15);
                        for (var i = 0; i < 15; i++) {
                          x[i] = new Array(15);
                        }
                        for(var i=0;i<15;i++) {
                                    for(var j=0;j<15;j++) {
                                                if(boardTile[i][j]!=-1) {
                                                      x[i][j]=document.getElementById('cell_'+i+'_'+j).innerHTML;
                                                }
                                    }
                        }
                        map["position"]=x;
                        return map;

            } else {

                  document.getElementById('msgBlock').innerHTML='Wrong tile placement.';
                        for(var i=0;i<15;i++) {
                                    for(var j=0;j<15;j++) {
                                                if(boardTile[i][j]!=-1) {
                                                      document.getElementById('cell_'+i+'_'+j).innerHTML="";
                                                }
                                    }
                        }
                        cloneBoardColour(boardColour1, boardColour);
                        resetBoardTile();
                        resetTiles();
                        // randomiseTiles();
            }
}

function updateBoard() {
    for(var i=0;i<15;i++) {
                for(var j=0;j<15;j++) {
                            if(boardTile[i][j]!=-1)
                                        board[i][j]=boardTile[i][j];
        }
    }
}

function wordsNotValid(wrds) {
      document.getElementById('msgBlock').innerHTML="\""+wrds+'\" may contain one or more invalid words';
      wordsValid(false);
}

function wordsValid(success) {
    if(success==true) {

      firstmove=false;
      resetCount=3;
                cloneBoardColour(boardColour, boardColour1);
                updateBoard();
                resetBoardTile();
                updateTiles();
    } else {
            cloneBoardColour(boardColour1, boardColour);
            for(var i=0;i<15;i++) {
                                    for(var j=0;j<15;j++) {
                                                if(boardTile[i][j]!=-1) {
                                                            document.getElementById('cell_'+i+'_'+j).innerHTML="";
                                                }
                                    }
                        }
            resetBoardTile();
            resetTiles();
    }
}

function scoreUpdate(bonus) {
      document.getElementById('msgBlock').innerHTML='Well Played!!';
      return updateScore(bonus);
}

function playerTurn(msg) {      if(!msg) {
            document.getElementById('b1').style.visibility = "hidden";
            document.getElementById('b2').style.visibility = "hidden";
            document.getElementById('b3').style.visibility = "hidden";
      } else {
            for(var i=0;i<7;i++) {
                  document.getElementById('tile_'+i).style.visibility = "visible";               
            }
            document.getElementById('b1').style.visibility = "visible";
            document.getElementById('b2').style.visibility = "visible";
            document.getElementById('b3').style.visibility = "visible";
      }
}
