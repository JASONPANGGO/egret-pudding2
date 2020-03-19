var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ui;
(function (ui) {
    /**
     * 结束页面
     */
    var UiEnd = (function (_super) {
        __extends(UiEnd, _super);
        // public conParticles_0: eui.Group;
        // public conParticles_1: eui.Group;
        // private readonly bannerBefore: string = "epic_";
        // private readonly bannerMax: number = 3;
        function UiEnd() {
            var _this = _super.call(this) || this;
            _this.skinName = skins.UiEnd;
            return _this;
        }
        /* =========== 框架结构代码-start =========== */
        /**
         * 初始化
         * @param {any[]} args open()传参会通过init()传过去
         */
        UiEnd.prototype.init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // console.info("init", ...args);
        };
        /** 首次打开界面时调用 */
        UiEnd.prototype.load = function () {
            // console.info("load");
            // gComMgr.setItemAnchor(this.logo);
            // gComMgr.setItemAnchor(this.btn);
            // if (GameMgr.isShowReplay()) {
            // 	gComMgr.setItemAnchor(this.replay);
            // }
            // gComMgr.setItemAnchor(this.bg);
            // this.mcBg.open();
            // this.mcBg.setData([new data.McData("bg", 2, "ending_{1}_png", { backplay: true })]);
            // this.mcBg.interval = 400;
        };
        /** 每次打开界面都会调用 */
        UiEnd.prototype.start = function () {
            // console.info("start");
            // if (GameMgr.endType == gConst.endType.VICTORY) {
            // this.showParticles();
            // }
            // this.mcBg.gotoAndPlay("bg");
            var _this = this;
            // if (GameMgr.isShowReplay()) {
            // 	const space: number = 20;
            // 	// const conBtnH = this.replay.height + space + this.btn.height;
            // 	// this.conBtn.height = conBtnH;
            // 	// this.btn.y = conBtnH - this.btn.anchorOffsetY;
            // 	// this.conBtn.anchorOffsetY = conBtnH / 2;
            // 	this.btn.y = this.replay.y + this.replay.anchorOffsetY + space + this.btn.anchorOffsetY;
            // }
            this.bg.mask = this.bg_mask;
            this.btnRe.visible = false;
            this.logo.visible = false;
            gTween.toScale(this.conBg, 1, 800, 1.8, egret.Ease.quadIn, void 0, {
                callback: function () {
                    gTween.fadeIn(_this.boygirl, 300);
                    gTween.toTopShow(_this.btnRe, 1200, 500, void 0, 1, egret.Ease.elasticOut);
                    gTween.toBottomShow(_this.logo, 1200, 500, void 0, 1, egret.Ease.elasticOut);
                }
            });
            // gTween.toBottomShow(this)
        };
        /** 每次结束界面都会调用 */
        UiEnd.prototype.stop = function () {
            // console.info("stop");
        };
        /** 监听界面，每帧都会调用 */
        UiEnd.prototype.update = function () {
            // console.info("update");
        };
        /** 注册事件 */
        UiEnd.prototype.addEvent = function () {
            // console.info("addEvent");
            if (gConst.globalClick) {
                this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickInstall, this);
            }
            this.btnRe.addEventListener(egret.TouchEvent.TOUCH_TAP, this.restart, this);
            // this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
            // if (GameMgr.replayInstall()) {
            // 	this.replay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickInstall, this);
            // } else {
            // 	this.replay.once(egret.TouchEvent.TOUCH_TAP, this.clickReplay, this);
            // }
        };
        /** 移除事件 */
        UiEnd.prototype.removeEvent = function () {
            // console.info("removeEvent");
            if (gConst.globalClick) {
                this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickInstall, this);
            }
            // this.btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
            // this.replay.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickReplay, this);
            // this.replay.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickInstall, this);
        };
        /** 窗口大小改变时调用 */
        UiEnd.prototype.resizeView = function () {
            // console.info("resizeView", this.width, this.height);
            var baseScale = gConst.mobileByScale[GameMgr.screenType][GameMgr.mobileType];
            // const conLogo = this.conLogo;
            // const conBtn = this.conBtn;
            var conBg = this.conBg;
            // conLogo.scaleX = conLogo.scaleY = baseScale;
            // conBtn.scaleX = conBtn.scaleY = baseScale;
            conBg.scaleX = conBg.scaleY = Math.max(this.width / conBg.width, this.height / conBg.height);
            // conBg.width = this.width;
            // conBg.height = this.height;
            if (this.screenType == 1 /* VERTICAL */) {
                //竖屏
                switch (this.mobileType) {
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
                switch (this.mobileType) {
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
            // this.con_logo.scaleX = this.con_logo.scaleY =
            // this.con.scaleX = this.con.scaleY = baseScale;
        };
        /** 屏幕横竖屏转换时调用 */
        UiEnd.prototype.rotateView = function () {
            // console.info("rotateView", this.screenType);
            if (this.screenType == 1 /* VERTICAL */) {
            }
            else {
            }
        };
        /* =========== 框架结构代码-end =========== */
        /* =========== 业务代码-start =========== */
        UiEnd.prototype.restart = function () {
            this.close();
            GameMgr.replay();
        };
        UiEnd.prototype.toTopShow = function (item, callback, thisObj) {
            var arg = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                arg[_i - 3] = arguments[_i];
            }
            gTween.toTopShow(item, 800, void 0, void 0, 1, egret.Ease.elasticOut, void 0, {
                callback: function () {
                    if (callback) {
                        callback.call.apply(callback, [thisObj].concat(arg));
                    }
                    ;
                }
            });
        };
        UiEnd.prototype.toBottomShow = function (item, callback, thisObj) {
            var arg = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                arg[_i - 3] = arguments[_i];
            }
            gTween.toBottomShow(item, 800, void 0, void 0, 1, egret.Ease.elasticOut, void 0, {
                callback: function () {
                    if (callback) {
                        callback.call.apply(callback, [thisObj].concat(arg));
                    }
                    ;
                }
            });
        };
        // private showLogo() {
        // 	this.conLogo.visible = true;
        // 	this.toBottomShow(this.logo/*, () => {
        // 		//发光
        // 		this.showLine();
        // 	}*/);
        // }
        // private showBody() {
        // 	this.toTopShow(this.conBody, this.showBtn, this);
        // }
        // private showBtn() {
        // 	this.conBtn.visible = true;
        // 	this.toTopShow(this.btn, gTween.yoyoBtn, gTween, this.btn);
        // 	if (GameMgr.isShowReplay()) {
        // 		this.toTopShow(this.replay);
        // 	}
        // }
        // private palyBg() {
        // 	this.cool.play(0);
        // }
        // private replayBg() {
        // 	this.cool.play(0);
        // }
        // private swingWord(item: egret.DisplayObject | egret.DisplayObjectContainer) {
        // 	gTween.swing(item, 3, 500, 0, void 0, { duration: 1000 });
        // }
        // private swingPaw(paw: egret.DisplayObject) {
        // 	gTween.swing(paw, 5, 1000, 0);
        // }
        // public showLogoBtn() {
        // 	this.showLogo();
        // 	this.showBtn();
        // 	// this.toBottomShow(this.replay);
        // }
        // private createPeople() {
        // 	if (GameMgr.endType == gConst.endType.VICTORY) {
        // 		const people: com.ComBones = new com.ComBones();
        // 		people.setData(this.conPeople, "ppeople");
        // 		this.conPeople.width = 255;
        // 		this.conPeople.height = 382;
        // 		people.setPos({ x: this.conPeople.width * .5, y: this.conPeople.height });
        // 		people.play("people", 0);
        // 	} else {
        // 		const people: eui.Image = new eui.Image("epic2_png");
        // 		this.conPeople.addChild(people);
        // 		gComMgr.setItemAnchor(people);
        // 	}
        // 	if (GameMgr.endType == gConst.endType.VICTORY) {
        // 		gSoundMgr.playEff("smsuccess");
        // 	} else {
        // 		gSoundMgr.playEff("smfail");
        // 	}
        // }
        /** 显示界面 */
        UiEnd.prototype.show = function () {
            // this.bg.visible = true;
            // gTween.toSmallShow(this.conBg, 3, 500, 1, 1, void 0, void 0, {
            // 	callback: () => {
            // 		this.showLogoBtn();
            // 		this.createPeople();
            // 	}
            // });
            // gTween.fadeIn(this.bg, 500);
            // this.conBg.visible = true;
            // gTween.toScale(this.conBg, 1, 500, 3, void 0, void 0, {
            // 	callback: () => {
            // 		this.showLogoBtn();
            // 		// this.createPeople();
            // 	}
            // });
        };
        /** 其它元素展示 */
        UiEnd.prototype.showOther = function () {
            // gSoundMgr.changeBg("bm_ending");
            gSoundMgr.playEff("smsuccess");
            this.gameEnd();
            // this.con.visible = true;
            //Banner
            // for (let i: number = 0; i < 3; i++) {
            // 	var banner: eui.Image = this["banner" + i] as eui.Image;
            // 	banner.alpha = 0;
            // 	banner.visible = true;
            // }
            // this.playBannering = false;
            // this.playBannerLeft();
            // var _y: number = this.g_banner.y;
            // egret.Tween.get(this.g_banner, { loop: true }).to({ y: _y + 20 }, 800).to({ y: _y }, 800);
            // this.replay.visible = GameMgr.isShowReplay();
            // this.cool.addEventListener(egret.Event.COMPLETE, this.replayBg, this);
            // this.palyBg();
            // this.showBlack();
            // this.showGold();
            // this.showTitle();
            // this.showBanner();
            // this.showLogoBtn();
            // this.showLogo();
            // this.showBody();
            // gTween.yoyoBtn(this.btn);
            // this.bg.visible = true;
            // gTween.fadeIn(this.conBg, 500, 1, void 0, void 0, { callback: this.showLogoBtn, thisObj: this });
        };
        /** 隐藏界面 */
        UiEnd.prototype.hide = function () {
            // this.bg.visible = false;
            // // this.black.visible = false;
            // this.conBg.visible = false;
            // // this.con.visible = false;
            // this.conLogo.visible = false;
            // this.conBtn.visible = false;
            // this.btn.visible = false;
            // this.replay.visible = false;
        };
        return UiEnd;
    }(ui.UiFile));
    ui.UiEnd = UiEnd;
    __reflect(UiEnd.prototype, "ui.UiEnd");
})(ui || (ui = {}));
//# sourceMappingURL=UiEnd.js.map