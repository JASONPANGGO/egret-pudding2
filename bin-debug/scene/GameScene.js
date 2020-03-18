var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scene;
(function (scene) {
    /**
     * 游戏场景
     */
    var GameScene = (function (_super) {
        __extends(GameScene, _super);
        function GameScene() {
            var _this = _super.call(this) || this;
            // public header: com.ComHeader;
            _this.isLoadRes = null; //是否已loadRes()资源
            _this.isFirstOpen = true; //是否第一次打开场景
            _this.firstTouch = true;
            _this.gridDic = {};
            _this.skillProgress = 0;
            _this.playerAction = false;
            _this.goldSpace = 10;
            _this.isOpenChat = true;
            _this.skinName = skins.GameScene;
            _this.initBg();
            return _this;
        }
        /**
         * 打开场景
         * @param {any[]} args open()传参会通过init()传过去
         */
        GameScene.prototype.open = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var mainView = GameMgr.mainView;
            this.init.apply(this, args);
            if (this.isFirstOpen) {
                mainView.initResizeView(this.isFirstOpen);
            }
            this.createChildren2();
            if (!this.isLoadRes) {
                this.isLoadRes = true;
                this.load();
            }
            mainView.resizeView(void 0, this.isFirstOpen);
            // mainView.resizeView();
            GameMgr.stage.removeEventListener(egret.Event.RESIZE, mainView.resizeView, mainView);
            GameMgr.stage.addEventListener(egret.Event.RESIZE, mainView.resizeView, mainView);
            this.start();
            this.update();
            this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
            this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
            this.removeEvent();
            this.addEvent();
            if (this.isFirstOpen) {
                this.isFirstOpen = false;
            }
        };
        /** 结束界面 */
        GameScene.prototype.end = function () {
            var mainView = GameMgr.mainView;
            this.isLoadRes = false;
            GameMgr.stage.removeEventListener(egret.Event.RESIZE, mainView.resizeView, mainView);
            this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
            this.removeEvent();
            gComMgr.rmEvent(this);
            this.stop();
        };
        /* =========== 框架结构代码-start =========== */
        /**
         * 初始化
         * @param {any[]} args open()传参会通过init()传过去
         */
        GameScene.prototype.init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // console.info("init", ...args);
        };
        /** 首次打开场景时调用 */
        GameScene.prototype.load = function () {
            // console.info("load");
        };
        /** 每次打开场景都会调用 */
        GameScene.prototype.start = function () {
            // console.info("start");
            this.openFirst();
            this.firstTouch = true;
            this.autoEnd();
            this.endToNoOperation();
            this.initProgress();
            this.tipsEnter();
            this.loadMovieClip();
            this.boyEnter();
        };
        /** 每次结束场景都会调用 */
        GameScene.prototype.stop = function () {
            // console.info("stop");
        };
        /** 每帧都会调用 */
        GameScene.prototype.update = function () {
            // console.info("update");
            // this.moveBg(this.bg_0);
            // this.moveBg(this.bg_1);
            // this.shadowBg();
        };
        /** 注册事件 */
        GameScene.prototype.addEvent = function () {
            // console.info("addEvent");
            this.guide_1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.boyAction1, this);
            this.guide_2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.boyAction2, this);
            this.guide_3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.boyAction3, this);
            // GameMgr.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchStage, this);
            // GameMgr.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchStageStart, this);
            // GameMgr.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchStageMove, this);
            // GameMgr.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.touchStageEnd, this);
            // this.addEventListener(gConst.eventType.ONE_STEP_COMPLETE, this.openTran, this);
            // this.addEventListener(gConst.eventType.ONE_STEP_FAIL, this.playTranEnd, this);
            // this.addEventListener(gConst.eventType.UPDATE_GOLD, this.updateGold, this);
        };
        /** 移除事件 */
        GameScene.prototype.removeEvent = function () {
            // console.info("removeEvent");
            this.guide_1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.boyAction1, this);
            this.guide_2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.boyAction2, this);
            this.guide_3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.boyAction3, this);
            // GameMgr.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchStage, this);
            // GameMgr.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchStageStart, this);
            // GameMgr.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchStageMove, this);
            // GameMgr.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchStageEnd, this);
            // this.removeEventListener(gConst.eventType.ONE_STEP_COMPLETE, this.openTran, this);
            // this.removeEventListener(gConst.eventType.ONE_STEP_FAIL, this.playTranEnd, this);
            // this.removeEventListener(gConst.eventType.UPDATE_GOLD, this.updateGold, this);
        };
        /** 游戏结束 */
        GameScene.prototype.gameEnd = function () {
            Mapi.gameEnd();
            // GameMgr.isEnd = true;
            this.UiFirst.updateDir({
                horDir: gConst.direction.RIGHT_TOP,
                verDir: gConst.direction.CENTER_TOP
            }, {
                horDir: gConst.direction.RIGHT_TOP,
                verDir: gConst.direction.CENTER_BOTTOM
            });
            this.UiFirst.gameEnd();
        };
        /**
         * 创建组件接口
         * @description 每次创建、重玩时调用
         */
        GameScene.prototype.createChildren2 = function () {
        };
        /** 窗口大小改变时调用 */
        GameScene.prototype.resizeView = function () {
            // console.info("resizeView", this.width, this.height, GameMgr.screenType, GameMgr.mobileType);
            this.dispatchEventWith(gConst.eventType.RESIZE_VIEW);
            var baseScale = gConst.mobileByScale[GameMgr.screenType][GameMgr.mobileType];
            this.conBg.scaleX = this.conBg.scaleY = Math.max(this.width / this.conBg.width, this.height / this.conBg.height);
            // this.con.scaleX = this.con.scaleY = baseScale
            if (GameMgr.screenType == 1 /* VERTICAL */) {
                //竖屏
                switch (GameMgr.mobileType) {
                    //iPhoneX或以上
                    case 1 /* IPHONE_X */:
                        break;
                    //iPhone8或以下
                    case 2 /* IPHONE_8 */:
                        break;
                    //iPad或其它
                    case 3 /* IPAD */:
                        break;
                }
            }
            else {
                //横屏
                switch (GameMgr.mobileType) {
                    //iPhoneX或以上
                    case 1 /* IPHONE_X */:
                        break;
                    //iPhone8或以下
                    case 2 /* IPHONE_8 */:
                        break;
                    //iPad或其它
                    case 3 /* IPAD */:
                        break;
                }
            }
        };
        /** 屏幕横竖屏转换时调用 */
        GameScene.prototype.rotateView = function () {
            // console.info("GameScene.rotateView", GameMgr.screenType);
            this.dispatchEventWith(gConst.eventType.ROTATE_VIEW);
            if (GameMgr.screenType == 1 /* VERTICAL */) {
            }
            else {
            }
            // this.updateHandScreen();
        };
        /** 重玩游戏 */
        GameScene.prototype.replay = function () {
            this.destroy();
            GameMgr.init();
            GameMgr.gameview = new scene.GameScene();
            GameMgr.gameview.open();
            if (this.parent) {
                this.parent.addChild(GameMgr.gameview);
                this.parent.removeChild(this);
            }
            Mapi.gameRetry();
        };
        /** 销毁 */
        GameScene.prototype.destroy = function () {
            if (this.UiFirst) {
                this.UiFirst.destroy();
            }
            if (this.UiStart) {
                this.UiStart.destroy();
            }
            if (this.UiTran) {
                this.UiTran.destroy();
            }
            if (this.UiTranEnd) {
                this.UiTranEnd.destroy();
            }
            if (this.UiEnd) {
                this.UiEnd.destroy();
            }
            if (this.UiEndFail) {
                this.UiEndFail.destroy();
            }
            // if (this.UiChat) {
            // 	this.UiChat.destroy();
            // }
            if (this.UiCongrats) {
                this.UiCongrats.destroy();
            }
            // if (this.UiPeople) {
            // 	this.UiPeople.destroy();
            // }
            this.removeEvent();
        };
        /** 点击下载(用户点击下载，调用SDK函数) */
        GameScene.prototype.clickInstall = function (event) {
            if (event) {
                event.stopPropagation();
            }
            Mapi.install();
        };
        /** 自动结束 */
        GameScene.prototype.autoEnd = function () {
            var autoEndTime = GameMgr.getConfig("autoEndTime");
            if (autoEndTime != void 0 && autoEndTime > 0) {
                egret.clearTimeout(this.endDelay);
                this.endDelay = egret.setTimeout(this.openEnd, this, autoEndTime * 1000);
            }
        };
        /** 玩家多久未操作，结束游戏 */
        GameScene.prototype.endToNoOperation = function () {
            if (GameMgr.isEnd) {
                return;
            }
            if (!gGuideMgr.lastGuideFinish()) {
                return;
            }
            var endToNoOperationTimer = gConst.endToNoOperationTimer;
            if (endToNoOperationTimer != void 0 && endToNoOperationTimer > 0) {
                egret.clearTimeout(this.endToNoOperationDelay);
                this.endToNoOperationDelay = egret.setTimeout(this.openEndFail, this, endToNoOperationTimer);
            }
        };
        GameScene.prototype.initBg = function () {
            var con = this.con;
            var conBg = this.conBg;
            // const conScene = this.conScene;
            this.camera = new util.CameraMgr(conBg);
            // gComMgr.setObjSize(conScene, true);
            // this.camera = new util.CameraMgr(conScene);
        };
        GameScene.prototype.tipsEnter = function () {
            gTween.toTopShow(this.tips, 800, 300, void 0, 1, egret.Ease.quadOut);
        };
        GameScene.prototype.loadMovieClip = function () {
            this.pboy_mc.open();
            this.pboy_mc.bm.horizontalCenter = 0;
            this.pboy_mc.bm.bottom = 0;
            this.pboy_mc.setData([new data.McData('boy_walk', 4, 'pboy{1}_png', { minBit: 2 }),
                new data.McData('boy_shake', 2, 'pboy{1}_png', { firstIndex: 5, minBit: 2 }),
                new data.McData('boy_go', 1, 'pboy0{1}_png', { firstIndex: 7 }),
                new data.McData('boy_lamp', 1, 'pboy0{1}_png', { firstIndex: 8 }),
                new data.McData('boy_fail_lamp', 1, 'pboy{1}_png', { firstIndex: 11 }),
                new data.McData('boy_fail_bed', 1, 'pboy0{1}_png', { firstIndex: 9 }),
                new data.McData('boy_success', 1, 'pboy{1}_png', { firstIndex: 10 }),
                new data.McData('boy_crawl_right', 1, 'pboy{1}_png', { firstIndex: 12 }),
                new data.McData('boy_crawl_left', 1, 'pboy{1}_png', { firstIndex: 13 })]);
            this.progress_girl_mc.open();
            this.progress_girl_mc.setData([new data.McData('progress', 2, 'psmallgirl{1}_png'), new data.McData('progess_start', 1, 'psmallgirl{1}_png')]);
            this.progress_girl_mc.width = 95;
            this.progress_girl_mc.anchorOffsetY = 20;
            this.progress_girl_mc.gotoAndPlay('progess_start', 1);
            this.pgirl_mc.open();
            this.pgirl_mc.bm.horizontalCenter = 0;
            this.pgirl_mc.bm.bottom = 0;
            this.pgirl_mc.setData([new data.McData('girl_walk', 4, 'pgirl0{1}_png'),
                new data.McData('girl_find', 2, 'pgirl0{1}_png', { firstIndex: 5 })]);
        };
        GameScene.prototype.boyEnter = function () {
            var _this = this;
            var enterPoint = this.POS_boyStart;
            var initPoint = this.POS_peopleInit;
            this.pboy_mc.interval = 180;
            this.pboy_mc.gotoAndPlay('boy_walk', 1);
            gTween.toMove(this.pboy_con, enterPoint.x, enterPoint.y, { x: 1000, y: 500 }, initPoint.x, initPoint.y, { x: egret.Ease.quadOut, y: egret.Ease.quadOut }, void 0, {
                callback: function () {
                    _this.showGuide();
                    _this.progressStart();
                    _this.boyShakeHead();
                }
            });
        };
        GameScene.prototype.boyShakeHead = function () {
            var _this = this;
            this.pboy_mc.interval = 500;
            this.pboy_mc.gotoAndPlay('boy_shake');
            var shakeSpeedUp = egret.setInterval(function () {
                if (_this.pboy_mc.interval <= 200 || _this.playerAction) {
                    egret.clearInterval(shakeSpeedUp);
                }
                else {
                    _this.pboy_mc.interval -= 50;
                }
            }, this, 1000);
        };
        GameScene.prototype.initProgress = function () {
            this.progress_red.mask = this.progress_mask;
            this.progress_mask_con.width = 0;
        };
        GameScene.prototype.progressStart = function () {
            gTween.toWidthChange(this.progress_mask_con, 15 * 1000, this.progress_red.width);
            this.progress_girl_mc.interval = 200;
            this.progress_girl_mc.gotoAndPlay('progress');
        };
        GameScene.prototype.progressStop = function () {
            gTween.rmTweens(this.progress_mask_con);
            this.progress_girl_mc.gotoAndStop('progress', 1);
            this.removeEvent();
            this.hideGuide();
            this.playerAction = true;
        };
        // 床尾
        GameScene.prototype.boyAction1 = function (event) {
            this.progressStop();
        };
        // 床头
        GameScene.prototype.boyAction2 = function (event) {
            this.progressStop();
        };
        // 台灯
        GameScene.prototype.boyAction3 = function (event) {
            var _this = this;
            this.progressStop();
            var boyLampPoint1 = this.POS_boyLamp1;
            var boyLampPoint2 = this.POS_boyLamp2;
            this.pboy_mc.gotoAndPlay('boy_go');
            gTween.toMove(this.pboy_con, boyLampPoint1.x, boyLampPoint1.y, { x: 500, y: 500 }, void 0, void 0, { x: egret.Ease.quadOut, y: egret.Ease.quadOut }, void 0, {
                callback: function () {
                    _this.con.setChildIndex(_this.pboy_con, 0);
                    _this.pboy_con.y = boyLampPoint2.y;
                    _this.pboy_mc.gotoAndPlay('boy_lamp');
                    _this.light_up.y = -100;
                    egret.setTimeout(function () {
                        _this.girlWalkTo(_this.POS_girlWalk1, function () {
                            _this.pgirl_con.scaleX = -1;
                            _this.girlShockAndFind();
                        });
                    }, _this, 1000);
                }
            });
        };
        GameScene.prototype.girlWalkTo = function (POS, callback) {
            this.pgirl_mc.interval = 180;
            this.pgirl_mc.gotoAndPlay('girl_walk');
            gTween.toMoveX(this.pgirl_con, POS.x, 500, void 0, void 0, void 0, {
                callback: function () {
                    callback();
                }
            });
        };
        GameScene.prototype.girlShockAndFind = function () {
            this.pgirl_mc.interval = 500;
            this.pgirl_mc.gotoAndPlay('girl_find', 1);
        };
        GameScene.prototype.gameStart = function () {
            // console.info("gameStart");
            // if (this.gameStared) {
            // 	return;
            // }
            this.gameStared = true;
            this.openStarted = false;
            // this.UiFirst.conBtn.visible = true;
            // this.black.visible = false;
            // gSoundMgr.playEff("smbar");
            this.showGuide();
            // this.showHand();
            if (GameMgr.firstToMaxLv) {
                GameMgr.auto = true;
            }
            // const time: number = this.firstTouch ? gConst.firstGuideTimer : gConst.afterGuideTimer;
            // this.showHandsDelay = egret.setTimeout(this.showHands, this, time);
            // this.showHands();
        };
        GameScene.prototype.hasUiFirstLogo = function () {
            return this.UiFirst && this.UiFirst.parent && this.UiFirst.conLogo && this.UiFirst.conLogo.parent;
        };
        GameScene.prototype.resizeUiFirst = function (event) {
            // const conLogo = this.UiFirst.conLogo;
            // const conGold = this.conGold;
            // if (!conGold || !conGold.parent) {
            // 	return;
            // }
            // let pos = gComMgr.toGlobal(conLogo);
            // pos = gComMgr.toLocal(conGold.parent, pos.x, pos.y);
            // conGold.x = pos.x;
            // conGold.y = pos.y + (conLogo.height - conLogo.anchorOffsetY) * conLogo.scaleY
            // 	+ conGold.anchorOffsetY * conGold.scaleY + this.goldSpace;
        };
        /** 打开顶层页面 */
        GameScene.prototype.openFirst = function () {
            this.UiFirst = gUiMgr.create(ui.UiFirst);
            this.UiFirst.addEventListener(gConst.eventType.RESIZE_VIEW, this.resizeUiFirst, this);
            this.UiFirst.open(
            // logo
            {
                horDir: gConst.direction.RIGHT_TOP,
                verDir: gConst.direction.CENTER_TOP
            }, {
                // 下载
                horDir: gConst.direction.RIGHT_BOTTOM,
                verDir: gConst.direction.CENTER_BOTTOM
            });
        };
        /** 关闭顶层页面 */
        GameScene.prototype.closeFirst = function () {
            if (!this.UiFirst) {
                return;
            }
            this.UiFirst.removeEventListener(gConst.eventType.RESIZE_VIEW, this.resizeUiFirst, this);
            this.UiFirst.close();
        };
        /** 打开启动页面 */
        GameScene.prototype.openStart = function (chatId) {
            if (chatId === void 0) { chatId = 1; }
            if (this.openStarted) {
                return;
            }
            this.openStarted = true;
            this.hideGuide();
            this.UiStart = gUiMgr.create(ui.UiStart);
            // this.UiStart.once(gConst.eventType.IN_COMPLETE, () => {
            // 	this.isGameStar = true;
            // }, this);
            // this.UiStart.addEventListener(gConst.eventType.TOUCH_TAP, this.clickItem, this);
            this.UiStart.once(gConst.eventType.CLOSE, this.gameStart, this);
            this.UiStart.open(chatId);
            if (chatId == 3) {
                return;
            }
            if (GameMgr.screenType == 0 /* HORIZONTAL */) {
                // this.conGold.visible = false;
                var UiFirst = this.UiFirst;
                var conLogo = void 0;
                if (UiFirst) {
                    conLogo = UiFirst.conLogo;
                }
                if (conLogo) {
                    conLogo.visible = false;
                }
            }
        };
        /** 关闭启动页面 */
        GameScene.prototype.closeStart = function () {
            // if (!this.openStarted) {
            // 	return;
            // }
            // this.openStarted = false;
            if (!this.UiStart) {
                return;
            }
            this.UiStart.hide(void 0, true);
        };
        /** 关闭过场页面 */
        GameScene.prototype.closeTran = function () {
            if (!this.UiTran) {
                return;
            }
            this.UiTran.close();
        };
        /** 打开恭喜页面 */
        GameScene.prototype.openCongrats = function () {
            // console.info("openCongrats");
            // gTween.fadeIn(this.black, 300, 0.5);
            this.UiCongrats = gUiMgr.create(ui.UiCongrats);
            // this.UiCongrats.once(gConst.eventType.CLOSE, this.nextPass, this);
            // this.UiCongrats.once(gConst.eventType.GAME_END, this.gameEnd, this);
            this.UiCongrats.open();
            gSoundMgr.playEff("sm_success");
        };
        /** 关闭恭喜页面 */
        GameScene.prototype.closeCongrats = function () {
            if (!this.UiCongrats) {
                return;
            }
            this.UiCongrats.close();
        };
        /** 打开结束过场页面 */
        GameScene.prototype.openTranEnd = function () {
            if (GameMgr.isEnd) {
                return;
            }
            this.openEnd();
            // this.UiTranEnd = gUiMgr.create(ui.UiTranEnd) as ui.UiTranEnd;
            // this.UiTranEnd.once(gConst.eventType.IN_COMPLETE, this.nextScene, this);
            // this.UiTranEnd.once(gConst.eventType.SHOW_CURTAIN_FULL, this.showEnd, this);
            // this.UiTranEnd.once(gConst.eventType.CLOSE, this.openEnd, this);
            // const data: { isReplay: boolean } = event ? event.data : void 0;
            // this.UiTranEnd.open(/*data*/);
            this.UiStart.once(gConst.eventType.SHOW_CURTAIN_FULL, this.showEnd, this);
            this.UiStart.showParticles();
        };
        /** 关闭结束过场页面 */
        GameScene.prototype.closeTranEnd = function () {
            if (!this.UiTranEnd) {
                return;
            }
            this.UiTranEnd.close();
        };
        /** 打开结束界面 */
        GameScene.prototype.openEnd = function (isShowEnd) {
            if (isShowEnd === void 0) { isShowEnd = true; }
            // console.info("openEnd");
            egret.clearTimeout(this.endDelay);
            egret.clearTimeout(this.endToNoOperationDelay);
            if (GameMgr.isEnd) {
                return;
            }
            GameMgr.isEnd = true;
            this.hideGuide();
            // this.hideHands();
            this.removeEvent();
            // GameMgr.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, Mapi.install, Mapi);
            // this.closePeople();
            // this.closeStart();
            // this.UiEnd = gUiMgr.create(ui.UiEnd) as ui.UiEnd;
            // this.UiEnd.hide();
            // this.UiEnd.open();
            // egret.setTimeout(this.showEnd, this, 500);
            // GameMgr.endType = gConst.endType.VICTORY;
            // this.showHead();
            // this.comPanel.stopBar();
            // this.allStopPlay();
            Mapi.gameEnd();
            if (isShowEnd) {
                this.showEnd();
            }
        };
        /** 显示结束界面 */
        GameScene.prototype.showEnd = function () {
            // console.info("showEnd");
            // this.UiFirst.gameEnd();
            // this.closeFirst();
            // this.closeStart();
            // const comGold = this.comGold;
            // gComMgr.fadeOutDestory(comGold, 300, () => {
            // 	gComMgr.destory(this.conGold);
            // });
            // this.header.destroy();
            // this.nav.destroy();
            // gComMgr.destory(this.con);
            // gComMgr.destory(this.conBg);
            // gComMgr.fadeOutDestory(this.con, 300, () => {
            // 	gComMgr.destory(this.conBg);
            // });
            // gComMgr.destory(this.hand);
            // gComMgr.fadeOutDestory(this.conWin);
            // gComMgr.fadeOutDestory(this.conBody, 300, () => {
            // 	this.lamp.destroy();
            // 	this.oldMan.destroy();
            // });
            // this.progress.destroy(true);
            // this.closeChat();
            // this.closePeople();
            // this.UiEnd.hide();
            // this.UiEnd.open();
            // this.UiEnd.show();
            // egret.setTimeout(this.UiEnd.show, this.UiEnd, 500);
            // if (GameMgr.endType == gConst.endType.VICTORY) {
            // 	gSoundMgr.playEff("sm_win");
            // } else {
            // 	gSoundMgr.playEff("sm_fail");
            // }
            this.openStart(3);
            this.gameEnd();
            this.showEndOther();
        };
        /** 结束界面其它元素展示 */
        GameScene.prototype.showEndOther = function () {
            // console.info("showEndOther");
            if (!this.UiEnd) {
                return;
            }
            this.UiEnd.showOther();
        };
        /** 关闭结束界面 */
        GameScene.prototype.closeEnd = function () {
            if (!this.UiEnd) {
                return;
            }
            this.UiEnd.close();
        };
        /** 打开结束界面（失败） */
        GameScene.prototype.openEndFail = function () {
            // console.info("openEndFail");
            // egret.clearTimeout(this.endDelay);
            // egret.clearTimeout(this.endToNoOperationDelay);
            // // if (GameMgr.isEnd) {
            // // 	return;
            // // }
            // GameMgr.isEnd = true;
            // this.hideGuide();
            // this.removeEvent();
            // this.UiEndFail = gUiMgr.create(ui.UiEndFail) as ui.UiEndFail;
            // this.UiEndFail.hide();
            // this.UiEndFail.open();
            // this.showEndFail();
            this.openEnd();
        };
        /** 显示结束界面（失败） */
        GameScene.prototype.showEndFail = function () {
            // console.info("showEndFail");
            // this.UiFirst.gameEnd();
            // this.closeFirst();
            // this.header.destroy();
            // gComMgr.rmObj(this.bg_0);
            // gComMgr.rmObj(this.bg_1);
            // gComMgr.rmObj(this.con_tree);
            // gComMgr.rmObj(this.bg_2);
            // this.boy.destroy();
            // this.girl.destroy();
            // gComMgr.rmObj(this.con);
            // gComMgr.rmObj(this.g_paper);
            // this.closeChat();
            // if (this.UiChat) {
            // 	this.UiChat.hideChat();
            // }
            this.UiEndFail.show();
            this.UiFirst.updateDir({
                horDir: gConst.direction.RIGHT_TOP,
                verDir: gConst.direction.CENTER_TOP
            }, {
                horDir: gConst.direction.RIGHT_TOP,
                verDir: gConst.direction.CENTER_TOP
            });
            this.showEndFailOther();
        };
        /** 结束界面（失败）其它元素展示 */
        GameScene.prototype.showEndFailOther = function () {
            // console.info("showEndFailOther");
            if (!this.UiEndFail) {
                return;
            }
            this.UiEndFail.showOther();
        };
        /** 关闭结束界面（失败） */
        GameScene.prototype.closeEndFail = function () {
            if (!this.UiEndFail) {
                return;
            }
            this.UiEndFail.close();
        };
        GameScene.prototype.createGuide = function () {
            for (var i = 1; i < 4; i++) {
                var guideBone = this['guideBone' + i];
                var guidePoint = this['guide_' + i];
                guideBone = new com.ComBones();
                guideBone.setData(guidePoint, 'ppeople');
                guideBone.show();
                guideBone.play('guide', 0);
            }
        };
        /** 显示引导 */
        GameScene.prototype.showGuide = function () {
            var _this = this;
            egret.setTimeout(function () {
                _this.createGuide();
            }, this, 2000);
        };
        /** 隐藏引导 */
        GameScene.prototype.hideGuide = function () {
            // this.firstTouch = false;
            // // this.closeChat();
            // // egret.clearTimeout(this.showLightDelay);
            // // if (this.light) {
            // // 	this.light.hide();
            // // }
            // if (!this.guide) {
            // 	return;
            // }
            // if (!this.showGuided) {
            // 	return;
            // }
            // this.showGuided = false;
            // this.guide.over();
            for (var i = 1; i < 4; i++) {
                gTween.fadeOut(this['guide_' + i], 200);
            }
            // const target1: com.ComHouse = this.getCurrHouse();
            // let propsType = target1 && target1.propsType ? target1 && target1.propsType : this.currGuidePropsType;
            // gGuideMgr.updateFirstGuideByProps(propsType)
        };
        return GameScene;
    }(eui.Component));
    scene.GameScene = GameScene;
    __reflect(GameScene.prototype, "scene.GameScene");
})(scene || (scene = {}));
//# sourceMappingURL=GameScene.js.map