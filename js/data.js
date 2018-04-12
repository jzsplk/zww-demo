var Data = (function(global) {
    /* 用于提供排行榜服务
     * 由于该API不支持中文，采用了Base64转码
     */
    var win = global.window;
    var API_KEY = "ad11126e9f76200f4c5ca97776ef75cf57f1aee3b19ee3101fd61a2eb51f529a";
    var SECRET_KEY = "1a04f14d799f2ec924c049d8af318d50902af4130606ec1a8af7628b08719432";
    App42.initialize(API_KEY,SECRET_KEY);
    var gameName = "name",description = "description",result, myId = "id";  

    //create game
    var gameService  = new App42Game();

    //get game 
    gameService.getAllGames({
        success: function(object) {    
            var game = JSON.parse(object);    
            result = game.app42.response.games.game;  
            console.log(result)  },    
            error: function(error) {
                }    
            });       

    //get game count
    gameService.getAllGamesCount({    
        success: function(object) {
        var game = JSON.parse(object);    
        result = game.app42.response;  
        var getRank = setTimeout(function() {
            console.log("totalRecords : " + result.totalRecords);
        }, 1000);
        console.log("totalRecords : " + result.totalRecords);  
        },error: function(error) {

            }    
        }); 

    //all game with paging 
    // var max = 10,  offset = 0 ,  result ;    
    // gameService.getAllGamesWithPaging(max,offset,{
    //     success: function(object) { 
    //        var game = JSON.parse(object);    
    //        result = game.app42.response.games.game;  
    //        console.log("result is " + result)  },    
    //        error: function(error) {
    //            }   
    //         }); 
    //

    //由于API原因必须先用Base64转码之后再存储，并在取出后解码，no-English solution Base64 trasform
    function utf16to8(str) {
      var out, i, len, c;

      out = "";
      len = str.length;
      for(i = 0; i < len; i++) {
      c = str.charCodeAt(i);
      if ((c >= 0x0001) && (c <= 0x007F)) {
      out += str.charAt(i);
      } else if (c > 0x07FF) {
      out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
      out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
      out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
      } else {
      out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
      out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
      }
      }
      return out;
      }

      function utf8to16(str) {
        var out, i, len, c;
        var char2, char3;

        out = "";
        len = str.length;
        i = 0;
        while(i < len) {
        c = str.charCodeAt(i++);
        switch(c >> 4)
        {
        case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
        // 0xxxxxxx
        out += str.charAt(i-1);
        break;
        case 12: case 13:
        // 110x xxxx 10xx xxxx
        char2 = str.charCodeAt(i++);
        out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
        break;
        case 14:
        // 1110 xxxx 10xx xxxx 10xx xxxx
        char2 = str.charCodeAt(i++);
        char3 = str.charCodeAt(i++);
        out += String.fromCharCode(((c & 0x0F) << 12) |
        ((char2 & 0x3F) << 6) |
        ((char3 & 0x3F) << 0));
        break;
        }
        }

        return out;
      }

//
var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64DecodeChars = new Array(
-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
-1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);

function base64encode(str) {
    var out, i, len;
    var c1, c2, c3;

    len = str.length;
    i = 0;
    out = "";
    while(i < len) {
    c1 = str.charCodeAt(i++) & 0xff;
    if(i == len)
    {
    out += base64EncodeChars.charAt(c1 >> 2);
    out += base64EncodeChars.charAt((c1 & 0x3) << 4);
    out += "==";
    break;
    }
    c2 = str.charCodeAt(i++);
    if(i == len)
    {
    out += base64EncodeChars.charAt(c1 >> 2);
    out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
    out += base64EncodeChars.charAt((c2 & 0xF) << 2);
    out += "=";
    break;
    }
    c3 = str.charCodeAt(i++);
    out += base64EncodeChars.charAt(c1 >> 2);
    out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
    out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >>6));
    out += base64EncodeChars.charAt(c3 & 0x3F);
    }
    return out;
    }

function base64decode(str) {
    var c1, c2, c3, c4;
    var i, len, out;

    len = str.length;
    i = 0;
    out = "";
    while(i < len) {
    /* c1 */
    do {
    c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
    } while(i < len && c1 == -1);
    if(c1 == -1)
    break;

    /* c2 */
    do {
    c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
    } while(i < len && c2 == -1);
    if(c2 == -1)
    break;

    out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

    /* c3 */
    do {
    c3 = str.charCodeAt(i++) & 0xff;
    if(c3 == 61)
    return out;
    c3 = base64DecodeChars[c3];
    } while(i < len && c3 == -1);
    if(c3 == -1)
    break;

    out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

    /* c4 */
    do {
    c4 = str.charCodeAt(i++) & 0xff;
    if(c4 == 61)
    return out;
    c4 = base64DecodeChars[c4];
    } while(i < len && c4 == -1);
    if(c4 == -1)
    break;
    out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
    }
    return out;
    }

    //测试Base64转码
    // var userName1  = '齐天大圣';
    // var encodedString = base64encode(utf16to8(userName1));
    // console.log("Encoded String is : " + encodedString);
    // var decodedString = utf8to16(base64decode(encodedString));
    // console.log("Decoded String is : " + decodedString);

    //取得名字的函数
    var userName = 'no-name';


    //初始化取得名字
    // getName();
    console.log(userName);
    //save user score
    var gameName = "frogger",  result ;    
    var scoreBoardService  = new App42ScoreBoard();

    //向服务器保存数据函数
    var saveUserScore = function(userName, gameScore) {
        var encodedString = base64encode(utf16to8(userName));
        scoreBoardService.saveUserScore(gameName,encodedString,gameScore,{        
        success: function(object)       { 
                   var game = JSON.parse(object);       
                   result = game.app42.response.games.game;          
                   // console.log("gameName is : " + result.name)          
                   var scoreList = result.scores.score;
                   myId = scoreList.scoreId;
                   console.log('ok myId = ' + myId);
                   // getMyRanking(myId);          
                   // console.log("userName is : " + scoreList.userName)          
                   // console.log("scoreId is : " + scoreList.scoreId)          
                   // console.log("value is : " + scoreList.value)      
               },        
                   error: function(error) {        }    });
    };


    //get score by user 
    // var userName = "Nick"    
    // scoreBoardService.getScoresByUser(gameName,userName,{        
    //     success: function(object)       { 
    //               var game = JSON.parse(object);            
    //               result = game.app42.response.games.game;          
    //               console.log("gameName is : " + result.name)          
    //               var scoreList = result.scores.score[0];
    //               console.log(result.scores.score);          
    //               console.log("userName is : " + scoreList.userName)          
    //               console.log("scoreId is : " + scoreList.scoreId)          
    //               console.log("value is : " + scoreList.value)      },        
    //               error: function(error) {        }    }); 

    //get highest score by user
    // scoreBoardService.getHighestScoreByUser(gameName,userName,{        
    //     success: function(object)       {
    //         var game = JSON.parse(object);            
    //         result = game.app42.response.games.game;          
    //         console.log("gameName is : " + result.name)          
    //         var scoreList = result.scores.score;          
    //         console.log("userName is : " + scoreList.userName)          
    //         console.log("scoreId is : " + scoreList.scoreId)          
    //         console.log("value is : " + scoreList.value)
    //               },        
    //         error: function(error) { 
    //            }   
    //         }); 

    //为了得到玩家排名先获取分数数据的函数rankings result
    var getRankingResults = function() {
        scoreBoardService.getTopRankings(gameName,{
        success: function(object)       {
            var game = JSON.parse(object);            
            result = game.app42.response.games.game;          
            console.log("gameName is : " + result.name)          
            var scoreList = result.scores.score;
            console.log(scoreList);
            player.result = scoreList; 
            console.log(player.result);              
        },        
        error: function(error) {        
        }    
    });  
    };
     

    //列出排名100的玩家显示在leaderboard中
        var getTopNRanking = function(num) {
        var max = num; 
        scoreBoardService.getTopNRankings(gameName,max,{  
            success: function(object) 
            {  
                var game = JSON.parse(object);  
                result = game.app42.response.games.game;
                console.log("gameName is : " + result.name)
                var scoreList = result.scores.score;
                if (scoreList instanceof Array) {
                        for (var i = 0; i < scoreList.length; i++) {
                            $('.leaderboard').append($('<li class="rank">'  + (i + 1) + ' ' + utf8to16(base64decode(scoreList[i].userName)) + '<small>' + scoreList[i].value +  '</small></li>'));
                            // console.log("userName is : " + scoreList[i].userName)
                            // console.log("userName is : " + utf8to16(base64decode(scoreList[i].userName)))
                            // console.log("scoreId is : " + scoreList[i].scoreId)
                            // console.log("value is : " + scoreList[i].value)
                        }
                    } else {
                        // console.log("userName is : " + scoreList.userName)
                        // console.log("scoreId is : " + scoreList.scoreId)
                        // console.log("value is : " + scoreList.value)
                    }
            },  
            error: function(error) {  
            }  
        });  
    };

    getTopNRanking(100);
    
    //change name function
    // var changeName = function() {
    //     userName = win.prompt('请输入您的尊号', '太乙真人');
    // };


    return {
        userName: userName,
        win: win,
        saveUserScore: saveUserScore,
        getTopNRanking: getTopNRanking,
        myId: myId,
        getRankingResults: getRankingResults
    };
})(this);