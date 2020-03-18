var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var com;
(function (com) {
    /**
     * 头像组件
     */
    var ComHead = (function (_super) {
        __extends(ComHead, _super);
        function ComHead() {
            var _this = _super.call(this) || this;
            _this.skinName = skins.ComHead;
            return _this;
        }
        /* =========== 框架结构代码-start =========== */
        /**
         * 初始化
         * @param {any[]} args 构建传参会通过init()传过去
         */
        ComHead.prototype.init = function (showBg) {
            // console.info("init", ...args);
            // this.showBg = showBg;
        };
        /** 首次创建组件时调用 */
        ComHead.prototype.load = function () {
            // console.info("load");
            this.touchEnabled = this.touchChildren = false;
        };
        /** 每次创建组件都会调用 */
        ComHead.prototype.start = function () {
            // console.info("start");
            // this.bg.visible = !!this.showBg;
            var emoji = this.emoji;
            var chat = this.chat;
            this.isShowChat = false;
            emoji.visible = false;
            chat.visible = false;
            this.playSmile();
        };
        /** 每次结束组件都会调用 */
        ComHead.prototype.stop = function () {
            // console.info("stop");
        };
        /** 监听组件，每帧都会调用 */
        ComHead.prototype.update = function () {
            // console.info("update");
        };
        /** 注册事件 */
        ComHead.prototype.addEvent = function () {
            // console.info("addEvent");
        };
        /** 移除事件 */
        ComHead.prototype.removeEvent = function () {
            // console.info("removeEvent");
        };
        /** 窗口大小改变时调用 */
        ComHead.prototype.resizeView = function (event) {
            // console.info("resizeView", event, GameMgr.gameview.width, GameMgr.gameview.height);
            var baseScale = gConst.mobileByScale[GameMgr.screenType][GameMgr.mobileType];
            this.scaleX = this.scaleY = baseScale;
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
        ComHead.prototype.rotateView = function (event) {
            // console.info("rotateView", event, GameMgr.screenType, GameMgr.mobileType);
            if (GameMgr.screenType == 1 /* VERTICAL */) {
            }
            else {
            }
        };
        /** 显示组件 */
        ComHead.prototype.show = function (aim, callback, thisObj, params) {
            if (!aim) {
                _super.prototype.show.call(this);
                if (callback) {
                    callback.call.apply(callback, [thisObj].concat(params));
                }
                return;
            }
            gTween.fadeIn(this, 300, 1, void 0, { duration: 500 }, { callback: callback, thisObj: thisObj, params: params });
        };
        /** 隐藏组件 */
        ComHead.prototype.hide = function (aim, callback, thisObj, params) {
            if (!aim) {
                _super.prototype.hide.call(this);
                if (callback) {
                    callback.call.apply(callback, [thisObj].concat(params));
                }
                return;
            }
            gTween.fadeOut(this, 300, 1, void 0, { duration: 500 }, { callback: callback, thisObj: thisObj, params: params });
        };
        /* =========== 框架结构代码-end =========== */
        /* =========== 业务代码-start =========== */
        /** 播放微笑状态 */
        ComHead.prototype.playSmile = function () {
            this.chgEmoji(11 /* SMILE */);
        };
        /** 播放开心表情 */
        ComHead.prototype.playHappy = function () {
            this.chgEmoji(12 /* HAPPY */);
        };
        /** 播放犯困表情 */
        ComHead.prototype.playSleepy = function () {
            this.chgEmoji(13 /* SLEEPY */);
        };
        /** 播放气愤表情 */
        ComHead.prototype.playAngry = function () {
            this.chgEmoji(14 /* ANGRY */);
        };
        /** 弹出对话 */
        ComHead.prototype.showChat = function () {
            if (this.showChated) {
                return;
            }
            this.showChated = true;
            if (this.isShowChat) {
                return;
            }
            this.isShowChat = true;
            var chat = this.chat;
            gTween.showBubble(chat, 200, { orgS: 1, orgA: 1, ease: egret.Ease.cubicOut, wait: { duration: 2000 } }, this.hideChat, this, void 0, { isFloat: true, orgY: 146 });
        };
        /** 隐藏对话 */
        ComHead.prototype.hideChat = function () {
            if (!this.isShowChat) {
                return;
            }
            this.isShowChat = false;
            var chat = this.chat;
            gTween.hideBubble(chat, 200, { orgS: 1, orgA: 1 });
        };
        ComHead.prototype.chgEmoji = function (id) {
            if (this.emojiId == id) {
                return;
            }
            this.emojiId = id;
            var source = "ui" + id + "_emoji_png";
            var emoji = this.emoji;
            gTween.toSmallHide(emoji, 200, 1, 1, egret.Ease.cubicIn, void 0, {
                callback: function () {
                    emoji.source = source;
                    gComMgr.setObjAnchor(emoji);
                    gTween.toBigShow(emoji, 200, 1, 1, egret.Ease.cubicOut);
                }
            });
        };
        return ComHead;
    }(com.ComFile));
    com.ComHead = ComHead;
    __reflect(ComHead.prototype, "com.ComHead");
})(com || (com = {}));
//# sourceMappingURL=ComHead.js.map