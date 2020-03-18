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
     * 提示组件
     */
    var ComTips = (function (_super) {
        __extends(ComTips, _super);
        function ComTips() {
            var _this = _super.call(this) || this;
            _this.skinName = skins.ComTips;
            return _this;
        }
        /* =========== 框架结构代码-start =========== */
        /**
         * 初始化
         * @param {any[]} args 构建传参会通过init()传过去
         */
        ComTips.prototype.init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // console.info("init", ...args);
        };
        /** 首次创建组件时调用 */
        ComTips.prototype.load = function () {
            // console.info("load");
        };
        /** 每次创建组件都会调用 */
        ComTips.prototype.start = function () {
            // console.info("start");
            this.conWord.visible = false;
        };
        /** 每次结束组件都会调用 */
        ComTips.prototype.stop = function () {
            // console.info("stop");
        };
        /** 监听组件，每帧都会调用 */
        ComTips.prototype.update = function () {
            // console.info("update");
        };
        /** 注册事件 */
        ComTips.prototype.addEvent = function () {
            // console.info("addEvent");
            this.head.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHead, this);
        };
        /** 移除事件 */
        ComTips.prototype.removeEvent = function () {
            // console.info("removeEvent");
            this.head.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHead, this);
        };
        /** 窗口大小改变时调用 */
        ComTips.prototype.resizeView = function (event) {
            // console.info("resizeView", event, GameMgr.gameview.width, GameMgr.gameview.height);
            var con = this.con;
            var baseScale = gConst.mobileByScale[GameMgr.screenType][GameMgr.mobileType];
            con.scaleX = con.scaleY = baseScale;
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
        ComTips.prototype.rotateView = function (event) {
            // console.info("rotateView", event, GameMgr.screenType, GameMgr.mobileType);
            var con = this.con;
            var gWord = this.gWord;
            var conBubble = this.conBubble;
            var word = this.word;
            if (GameMgr.screenType == 1 /* VERTICAL */) {
                //竖屏
                con.width = 350;
                con.height = 299;
                gWord.x = 133;
                gWord.y = 142;
                conBubble.rotation = 0;
                word.horizontalCenter = -10;
                word.verticalCenter = -35;
            }
            else {
                //横屏
                con.width = 246;
                con.height = 402;
                gWord.x = 36;
                gWord.y = 194;
                conBubble.rotation = 15;
                word.horizontalCenter = -32;
                word.verticalCenter = -14;
            }
        };
        /* =========== 框架结构代码-end =========== */
        /* =========== 业务代码-start =========== */
        ComTips.prototype.showWord = function () {
            gTween.showBubble(this.conWord, 500, { orgS: 1, orgA: 1, ease: egret.Ease.backOut });
        };
        ComTips.prototype.hideWord = function () {
            gTween.hideBubble(this.conWord, 200, { orgS: 1, orgA: 1 });
        };
        ComTips.prototype.clickHead = function (event) {
            // Mapi.sendAction(5);
            this.clickInstall(event);
        };
        return ComTips;
    }(com.ComFile));
    com.ComTips = ComTips;
    __reflect(ComTips.prototype, "com.ComTips");
})(com || (com = {}));
//# sourceMappingURL=ComTips.js.map