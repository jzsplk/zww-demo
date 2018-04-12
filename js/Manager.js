Manager = (function(global) {
    'use strict';

    /* 下面这些DOM元素用来反应游戏状态 */
    var doc = global.document,
        win = global.window,
        scoreTxt = doc.getElementById('score'),
        menuButton = doc.getElementById('btn-menu'),
        menu = doc.getElementById('menu'),
        rankingButton = doc.getElementById('btn-ranking'),
        instructionButton = doc.getElementById('btn-instruction'),
        restartButton = doc.getElementById('btn-restart'),
        leaderBoard = doc.getElementById('leader-board'),

        instructionButton = doc.getElementById('btn-instruction'),
        instructionBoard = doc.getElementById('instruction-board'),
        closeInstructionButton = doc.getElementById('btn-close-instruction'),

        operationPanel = doc.getElementById('operation-panel'),
        arrowUp = doc.getElementById('arrow-up'),
        arrowDown = doc.getElementById('arrow-down'),
        arrowLeft = doc.getElementById('arrow-left'),
        arrowRight = doc.getElementById('arrow-right'),
        sapce = doc.getElementById('space');
    
    //控制玩家头顶文字的变量
    var showWords = "1";

    //添加菜单的响应事件
    var isMenuHidden = true;
    var showMenu = function() {
        menu.style.height = '200px';
        menu.style.borderBottom = '2px solid #251';
        isMenuHidden = false;
    };
    var hideMenu = function() {
        menu.style.height = 0;
        menu.style.borderBottom = 0;
        isMenuHidden = true;
    };

    //添加菜单的点击事件
    menuButton.onclick = function(e) {
        e.stopPropagation();
        if(isMenuHidden) {
            showMenu();
        } else {
            hideMenu();
        }
    };

    /* 除菜单按钮和下面的角色按钮外，点击屏幕中的其它区域都会让菜单栏隐藏 */
    doc.onclick = function() {
        hideMenu();
    };


    /* 给游戏标题栏，以及菜单栏的按钮，按语言设定起好对应的名字 */
    var initDomText = function() {
        var rankingButtonWords = ['Ranking', '排行榜'];
        rankingButton.innerText = rankingButtonWords[1];
        var instructionButtonWords = ['Instruction', '游戏说明'];
        instructionButton.innerText = instructionButtonWords[1];
        var restartButtonWords = ['Restart', '重新开始'];
        restartButton.innerText = restartButtonWords[1];
    };

    initDomText();

    //排行榜toggle函数
    var isRankingHidden = false;
    var toogleRanking = function() {
        if(isRankingHidden) {
            leaderBoard.style.display = 'block';
            isRankingHidden = false;
        } else {
            leaderBoard.style.display = 'none';
            isRankingHidden = true;
        }
    };

    //点击排行榜按钮，弹出排行榜
    rankingButton.onclick = function(e) {
        e.stopPropagation();
        // hideMenu();
        $('.leaderboard').empty();
        Data.getTopNRanking(100);
        toogleRanking();
    };

    restartButton.onclick = function() {
        initGame();
    };

/* 以下一部分内容是关于排行榜面板的，首先动态控制排行榜的高度，让它充满屏幕 */
    instructionBoard.style.height = doc.documentElement.clientHeight + 'px';

    /* 点击游戏说明按钮时，弹出排行榜 */
    instructionButton.onclick = function(e) {
        /* 点击该按钮时，点击事件应当停止向上传递，否则游戏会失去暂停效果 */
        e.stopPropagation();
        hideMenu();
        instructionBoard.style.display = 'block';
    };

    /* 点击游戏说明面板里的OK按钮时，关闭面板
     * 由于该点击事件会向上传递到document，因此会触发hideMenu()，从而继续游戏
     */
    closeInstructionButton.onclick = function() {
        instructionBoard.style.display = 'none';
    };

/* 判断登陆设备是否是PC */
    var isPC = function() {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone",
            "SymbianOS", "Windows Phone",
            "iPad", "iPod"
        ];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    };

    /* 根据登陆设备决定是否显示模拟操作面板 */
        if (isPC()) {
            operationPanel.style.display = 'none';
        } else {
            operationPanel.style.display = 'block';
            /* 再来绑定模拟操作面板上的事件 */
            arrowUp.ontouchstart = function() {
                player.handleInput('up');
            };
            arrowDown.ontouchstart = function() {
                player.handleInput('down');
            };
            arrowLeft.ontouchstart = function() {
                player.handleInput('left');
            };
            arrowRight.ontouchstart = function() {
                player.handleInput('right');
            };
            space.ontouchstart = function() {
                player.handleInput('space');
            };

            /* 以下两个事件监听阻止了移动设备上的双击放大效果 */
            doc.addEventListener('touchstart',function (event) {
                if(event.touches.length>1){
                    event.preventDefault();
                }
            });
            var lastTouchEnd=0;
            doc.addEventListener('touchend',function (event) {
                var now=(new Date()).getTime();
                if(now-lastTouchEnd<=500){
                    event.preventDefault();
                }
                lastTouchEnd=now;
            },false);
        }

    //暂停游戏函数
    var pauseGame = function() {
        player.jump_distance = 0;

        Engine.setTimeSpeed(0);

        pauseTimer();
    };

    //继续游戏函数
    var continueGame = function() {
        player.jump_distance = 1;
        Engine.setTimeSpeed(1);
        if(leftTime > 0) {
            startTimer();
        }
    };


    //暂停计时器
    var pauseTimer = function() {
        win.clearInterval(timerId);
    };
    // //初始化游戏函数
    // var initGame = function () {
    //     Data.changeName();
    //     player.score = 0;
    //     player.resetPlayer();
    //     player.hp = 100;
    //     player.keynum = 0;
    //     allEnemies=[];
    //     allObstacles = [];
    //     allTreasures = [];
    //     pavement.reset();
    //     addObstacle(0);
    //     addEnemy(Enemy, 5);
    //     addEnemy(Tiger, 1);
    //     addRandomTreasure(2);
    // };

    // initGame();
    

    return {
       pauseGame: pauseGame,
       continueGame: continueGame,
       pauseTimer: pauseTimer,
       showWords: showWords
    };

})(this);