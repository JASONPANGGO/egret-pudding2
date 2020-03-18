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
     * 目标组件
     */
    var ComTarget = (function (_super) {
        __extends(ComTarget, _super);
        function ComTarget() {
            var _this = _super.call(this) || this;
            _this.skinName = skins.ComTarget;
            return _this;
        }
        /* =========== 框架结构代码-start =========== */
        /**
         * 初始化
         * @param {any[]} args 构建传参会通过init()传过去
         */
        ComTarget.prototype.init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // console.info("init", ...args);
        };
        /** 首次创建组件时调用 */
        ComTarget.prototype.load = function () {
            // console.info("load");
            this.touchChildren = false;
            // this.touchEnabled = true;
            var con = this.con;
            var bg = this.bg;
            var time = this.time;
            gComMgr.setObjSize(bg, true);
            con.height += 43;
            var countdown = GameMgr.getConfig("countdown");
            this.remainTime = Math.max(countdown, 0);
            this.renderTime();
        };
        /** 每次创建组件都会调用 */
        ComTarget.prototype.start = function () {
            // console.info("start");
        };
        /** 每次结束组件都会调用 */
        ComTarget.prototype.stop = function () {
            // console.info("stop");
        };
        /** 监听组件，每帧都会调用 */
        ComTarget.prototype.update = function () {
            // console.info("update");
        };
        /** 注册事件 */
        ComTarget.prototype.addEvent = function () {
            // console.info("addEvent");
        };
        /** 移除事件 */
        ComTarget.prototype.removeEvent = function () {
            // console.info("removeEvent");
        };
        /** 窗口大小改变时调用 */
        ComTarget.prototype.resizeView = function (event) {
            // console.info("resizeView", event, GameMgr.gameview.width, GameMgr.gameview.height);
            var baseScale = gConst.mobileByScale[GameMgr.screenType][GameMgr.mobileType];
            if (GameMgr.screenType == 1 /* VERTICAL */) {
                //竖屏
                this.scaleX = this.scaleY = baseScale;
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
                this.scaleX = this.scaleY = baseScale * .92;
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
        ComTarget.prototype.rotateView = function (event) {
            // console.info("rotateView", event, GameMgr.screenType, GameMgr.mobileType);
            if (GameMgr.screenType == 1 /* VERTICAL */) {
            }
            else {
            }
        };
        /** 开始倒计时 */
        ComTarget.prototype.startTime = function () {
            if (this.startTimeed) {
                return;
            }
            this.startTimeed = true;
            egret.clearInterval(this.timeDelay);
            this.timeDelay = egret.setInterval(this.updateTime, this, 1000);
        };
        /** 停止倒计时 */
        ComTarget.prototype.stopTime = function () {
            egret.clearInterval(this.timeDelay);
        };
        /** 更新倒计时 */
        ComTarget.prototype.updateTime = function () {
            if (this.remainTime <= 0) {
                this.stopTime();
                this.dispatchEventWith(gConst.eventType.ONCE_COMPLETE);
                return;
            }
            this.remainTime--;
            this.renderTime();
        };
        Object.defineProperty(ComTarget.prototype, "remainTime", {
            get: function () {
                return this._remainTime;
            },
            set: function (time) {
                if (time < 0) {
                    return;
                }
                time = Math.max(time, 0);
                this._remainTime = time;
                var countdown = GameMgr.getConfig("countdown");
                countdown = Math.max(countdown, 0);
                var diffTime = countdown - this.remainTime; //已过几秒
                switch (diffTime) {
                    case 3:
                        // Mapi.sendAction(2);
                        break;
                    case 6:
                        // Mapi.sendAction(3);
                        break;
                    case 9:
                        // Mapi.sendAction(4);
                        break;
                    case 12:
                        // Mapi.sendAction(5);
                        break;
                }
            },
            enumerable: true,
            configurable: true
        });
        /** 渲染倒计时 */
        ComTarget.prototype.renderTime = function () {
            var time = this.time;
            time.text = gMath.switchMinute(this.remainTime * 1000);
        };
        return ComTarget;
    }(com.ComFile));
    com.ComTarget = ComTarget;
    __reflect(ComTarget.prototype, "com.ComTarget");
})(com || (com = {}));
//# sourceMappingURL=ComTarget.js.map