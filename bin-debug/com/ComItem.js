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
     * 选项组件
     */
    var ComItem = (function (_super) {
        __extends(ComItem, _super);
        function ComItem() {
            var _this = _super.call(this) || this;
            _this.skinName = skins.ComItem;
            return _this;
        }
        /* =========== 框架结构代码-start =========== */
        /**
         * 初始化
         * @param {any[]} args 构建传参会通过init()传过去
         */
        ComItem.prototype.init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // console.info("init", ...args);
        };
        /** 首次创建组件时调用 */
        ComItem.prototype.load = function () {
            // console.info("load");
            this.touchChildren = false;
            this.initS = this.con.scaleX;
        };
        /** 每次创建组件都会调用 */
        ComItem.prototype.start = function () {
            // console.info("start");
            this.initHead();
            // this.updateRender();
        };
        /** 每次结束组件都会调用 */
        ComItem.prototype.stop = function () {
            // console.info("stop");
        };
        /** 监听组件，每帧都会调用 */
        ComItem.prototype.update = function () {
            // console.info("update");
        };
        /** 注册事件 */
        ComItem.prototype.addEvent = function () {
            // console.info("addEvent");
        };
        /** 移除事件 */
        ComItem.prototype.removeEvent = function () {
            // console.info("removeEvent");
        };
        /** 窗口大小改变时调用 */
        ComItem.prototype.resizeView = function (event) {
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
        ComItem.prototype.rotateView = function (event) {
            // console.info("rotateView", event, GameMgr.screenType, GameMgr.mobileType);
            if (GameMgr.screenType == 1 /* VERTICAL */) {
            }
            else {
            }
        };
        /* =========== 框架结构代码-end =========== */
        /* =========== 业务代码-start =========== */
        ComItem.prototype.initHead = function () {
            this.item.visible = false;
        };
        ComItem.prototype.bright = function () {
            var diffR = 4;
            var diffT = 200;
            var con = this.con;
            var initR = con.rotation;
            gTween.tween(con, void 0, {
                props: { rotation: initR + diffR, },
                duration: diffT,
                call: {
                    callback: function () {
                        gTween.tween(con, void 0, {
                            props: { rotation: initR - diffR * 2, },
                            duration: diffT * 2,
                            call: {
                                callback: function () {
                                    gTween.tween(con, void 0, {
                                        props: { rotation: initR, },
                                        duration: diffT
                                    });
                                }
                            }
                        });
                    }
                }
            });
            gTween.fadeIn(this.item, 100);
        };
        /** 设置or获取当前项是否完成 */
        ComItem.prototype.finish = function (finish) {
            if (finish != void 0) {
                this._finish = finish;
            }
            else {
                return this._finish;
            }
        };
        return ComItem;
    }(com.ComFile));
    com.ComItem = ComItem;
    __reflect(ComItem.prototype, "com.ComItem");
})(com || (com = {}));
//# sourceMappingURL=ComItem.js.map