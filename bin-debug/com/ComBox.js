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
     * 盒子组件
     */
    var ComBox = (function (_super) {
        __extends(ComBox, _super);
        function ComBox() {
            var _this = _super.call(this) || this;
            // private _posId: number;
            _this.type = 2 /* BOX */;
            _this.skinName = skins.ComBox;
            return _this;
        }
        /* =========== 框架结构代码-start =========== */
        /**
         * 初始化
         * @param {any[]} args 构建传参会通过init()传过去
         */
        ComBox.prototype.init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // console.info("init", ...args);
        };
        /** 首次创建组件时调用 */
        ComBox.prototype.load = function () {
            // console.info("load");
            var con = this.con;
            var bottomLayer = this.bottomLayer;
            var topLayer = this.topLayer;
            this.touchChildren = false;
            gComMgr.setItemAnchor(bottomLayer);
            gComMgr.setItemAnchor(con);
            this.initY = con.y;
            gComMgr.setObjSize(topLayer);
        };
        /** 每次创建组件都会调用 */
        ComBox.prototype.start = function () {
            // console.info("start");
            this.playIdle();
        };
        /** 每次结束组件都会调用 */
        ComBox.prototype.stop = function () {
            // console.info("stop");
        };
        /** 监听组件，每帧都会调用 */
        ComBox.prototype.update = function () {
            // console.info("update");
        };
        /** 注册事件 */
        ComBox.prototype.addEvent = function () {
            // console.info("addEvent");
        };
        /** 移除事件 */
        ComBox.prototype.removeEvent = function () {
            // console.info("removeEvent");
        };
        /** 窗口大小改变时调用 */
        ComBox.prototype.resizeView = function (event) {
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
        ComBox.prototype.rotateView = function (event) {
            // console.info("rotateView", event, GameMgr.screenType, GameMgr.mobileType);
            if (GameMgr.screenType == 1 /* VERTICAL */) {
            }
            else {
            }
        };
        /* =========== 框架结构代码-end =========== */
        /* =========== 业务代码-start =========== */
        ComBox.prototype.initBox = function () {
            var con = this.con;
            var topLayer = this.topLayer;
            gTween.rmTweens(con);
            gTween.rmTweens(topLayer);
            con.y = this.initY;
            topLayer.y = 0;
        };
        /** 待机 */
        ComBox.prototype.playIdle = function () {
            var con = this.con;
            var topLayer = this.topLayer;
            var id = this.id = 0 /* IDLE */;
            this.initBox();
            con.visible = true;
            gTween.loopFloat(con, 10, 1000, this.initY);
            gTween.loopFloat(topLayer, 5, 1000, 0);
        };
        /** 掉落 */
        ComBox.prototype.playDropDown = function (duration) {
            if (duration === void 0) { duration = 1000; }
            var con = this.con;
            var topLayer = this.topLayer;
            var id = this.id = 1 /* DROP_DOWN */;
            var goalY = con.height - topLayer.height;
            this.initBox();
            gTween.toMoveY(topLayer, goalY, duration, 0);
        };
        /** 站立 */
        ComBox.prototype.playStand = function () {
            var con = this.con;
            var topLayer = this.topLayer;
            var id = this.id = 3 /* STAND */;
            var goalY = con.height - topLayer.height;
            this.initBox();
            topLayer.y = goalY;
        };
        /** 死亡 */
        ComBox.prototype.playDie = function () {
            this.playStand();
            var con = this.con;
            var id = this.id = 4 /* DIE */;
            gTween.fadeOut(con);
        };
        /** 设置or获取位置ID */
        // posId(posId?: number): number {
        // 	if (posId != void 0) {
        // 		this._posId = posId;
        // 	} else {
        // 		return this._posId;
        // 	}
        // }
        /** 设置or获取死亡状态 */
        ComBox.prototype.die = function (die) {
            if (die !== void 0) {
                this._die = die;
            }
            else {
                return this._die;
            }
        };
        return ComBox;
    }(com.ComFile));
    com.ComBox = ComBox;
    __reflect(ComBox.prototype, "com.ComBox");
})(com || (com = {}));
//# sourceMappingURL=ComBox.js.map