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
     * 衣柜组件
     */
    var ComCloset = (function (_super) {
        __extends(ComCloset, _super);
        function ComCloset() {
            var _this = _super.call(this) || this;
            _this.skinName = skins.ComCloset;
            return _this;
        }
        /* =========== 框架结构代码-start =========== */
        /**
         * 初始化
         * @param {any[]} args 构建传参会通过init()传过去
         */
        ComCloset.prototype.init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // console.info("init", ...args);
        };
        /** 首次创建组件时调用 */
        ComCloset.prototype.load = function () {
            // console.info("load");
        };
        /** 每次创建组件都会调用 */
        ComCloset.prototype.start = function () {
            // console.info("start");
            this.door.visible = false;
            this.door.source = "pLv2Ye1_png";
            this.shakeCloset();
            this.shakeClosetDelay = egret.setInterval(this.shakeCloset, this, 1000);
        };
        /** 每次结束组件都会调用 */
        ComCloset.prototype.stop = function () {
            // console.info("stop");
        };
        /** 监听组件，每帧都会调用 */
        ComCloset.prototype.update = function () {
            // console.info("update");
        };
        /** 注册事件 */
        ComCloset.prototype.addEvent = function () {
            // console.info("addEvent");
            // this.once(egret.TouchEvent.TOUCH_TAP, this.openDoor, this);
            this.once(egret.TouchEvent.TOUCH_TAP, this.clickDoor, this);
        };
        /** 移除事件 */
        ComCloset.prototype.removeEvent = function () {
            // console.info("removeEvent");
            // this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openDoor, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickDoor, this);
        };
        /** 窗口大小改变时调用 */
        ComCloset.prototype.resizeView = function (event) {
            // console.info("resizeView", event, GameMgr.gameview.width, GameMgr.gameview.height);
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
        ComCloset.prototype.rotateView = function (event) {
            // console.info("rotateView", event, GameMgr.screenType, GameMgr.mobileType);
            if (GameMgr.screenType == 1 /* VERTICAL */) {
            }
            else {
            }
        };
        /* =========== 框架结构代码-end =========== */
        /* =========== 业务代码-start =========== */
        /** 打开门 */
        ComCloset.prototype.openDoor = function (event) {
            var _this = this;
            var con = this.con;
            var door = this.door;
            var shake = new util.ShakeTool();
            var shakeComplete = function () {
                door.visible = true;
                egret.setTimeout(function () {
                    door.source = "pLv2Ye2_png";
                    _this.dispatchEventWith(gConst.eventType.RIGHT_ANSWER);
                }, _this, 500);
            };
            con.once(egret.Event.COMPLETE, shakeComplete, this);
            shake.shakeObj(con, 500, 10, 0, 10, 0, 0);
        };
        ComCloset.prototype.shakeCloset = function () {
            var con = this.con;
            var shake = this.shake;
            if (!shake) {
                shake = this.shake = new util.ShakeTool();
            }
            shake.shakeObj(con, 500, 10, 0, 10, 0, 0);
        };
        ComCloset.prototype.clickDoor = function (event) {
            var con = this.con;
            var shake = this.shake;
            if (shake) {
                shake.stop();
                con.once(egret.Event.COMPLETE, this.clickInstall, this);
                shake.shakeObj(con, 500, 10, 0, 10, 0, 0);
            }
            // GameMgr.gameview.hideHand();
            egret.clearInterval(this.shakeClosetDelay);
        };
        return ComCloset;
    }(com.ComFile));
    com.ComCloset = ComCloset;
    __reflect(ComCloset.prototype, "com.ComCloset");
})(com || (com = {}));
//# sourceMappingURL=ComCloset.js.map