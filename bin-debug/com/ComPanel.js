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
     * 面板组件
     */
    var ComPanel = (function (_super) {
        __extends(ComPanel, _super);
        function ComPanel() {
            var _this = _super.call(this) || this;
            _this.itemIdArr = [];
            _this.skinName = skins.ComPanel;
            return _this;
        }
        /* =========== 框架结构代码-start =========== */
        /**
         * 初始化
         * @param {any[]} args 构建传参会通过init()传过去
         */
        ComPanel.prototype.init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // console.info("init", ...args);
        };
        /** 首次创建组件时调用 */
        ComPanel.prototype.load = function () {
            // console.info("load");
            this.touchChildren = false;
            // this.touchEnabled = true;
            this.bar.maximum = GameMgr.getConfig("countdown") * 1000;
            gComMgr.setObjAnchor(this.bg);
        };
        /** 每次创建组件都会调用 */
        ComPanel.prototype.start = function () {
            // console.info("start");
            this.barVal = 0;
            this.headCnt = 0;
            this.initItems();
        };
        /** 每次结束组件都会调用 */
        ComPanel.prototype.stop = function () {
            // console.info("stop");
        };
        /** 监听组件，每帧都会调用 */
        ComPanel.prototype.update = function () {
            // console.info("update");
        };
        /** 注册事件 */
        ComPanel.prototype.addEvent = function () {
            // console.info("addEvent");
        };
        /** 移除事件 */
        ComPanel.prototype.removeEvent = function () {
            // console.info("removeEvent");
        };
        /** 窗口大小改变时调用 */
        ComPanel.prototype.resizeView = function (event) {
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
        ComPanel.prototype.rotateView = function (event) {
            // console.info("rotateView", event, GameMgr.screenType, GameMgr.mobileType);
            var con = this.con;
            var bg = this.bg;
            var conItems = this.conItems;
            var conBar = this.conBar;
            var bar = this.bar;
            if (GameMgr.screenType == 1 /* VERTICAL */) {
                //竖屏
                con.width = bg.width;
                con.height = bg.height;
                bg.rotation = 0;
                bg.scaleX = 1;
                bg.x = bg.anchorOffsetX;
                bg.y = bg.anchorOffsetY;
                var hLayout = this.hLayout;
                if (!hLayout) {
                    hLayout = this.hLayout = new eui.HorizontalLayout();
                    hLayout.gap = -4;
                    hLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
                    hLayout.verticalAlign = egret.VerticalAlign.MIDDLE;
                }
                conItems.layout = hLayout; //水平布局
                conItems.right = NaN;
                conItems.verticalCenter = NaN;
                conItems.top = 28;
                conItems.horizontalCenter = 12;
                conBar.width = 545;
                conBar.height = 80;
                conBar.left = NaN;
                conBar.verticalCenter = NaN;
                conBar.bottom = 24;
                conBar.horizontalCenter = -2;
                bar.rotation = 0;
                bar.scaleX = 1;
                bar.x = 275;
                bar.y = 50;
            }
            else {
                //横屏
                con.width = bg.height;
                con.height = bg.width;
                bg.rotation = -90;
                bg.scaleX = -1;
                bg.x = bg.anchorOffsetY;
                bg.y = bg.anchorOffsetX;
                var vLayout = this.vLayout;
                if (!vLayout) {
                    vLayout = this.vLayout = new eui.VerticalLayout();
                    vLayout.gap = 22;
                    vLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
                    vLayout.verticalAlign = egret.VerticalAlign.MIDDLE;
                }
                conItems.layout = vLayout; //垂直布局
                conItems.top = NaN;
                conItems.horizontalCenter = NaN;
                conItems.right = 20;
                conItems.verticalCenter = 0;
                conBar.width = 58;
                conBar.height = 550;
                conBar.bottom = NaN;
                conBar.horizontalCenter = NaN;
                conBar.left = 32;
                conBar.verticalCenter = -8;
                bar.rotation = -90;
                bar.scaleX = -1;
                bar.x = 25;
                bar.y = 280;
            }
        };
        /* =========== 框架结构代码-end =========== */
        /* =========== 业务代码-start =========== */
        ComPanel.prototype.initItems = function () {
            var i = 0;
            var item = this["item" + i];
            while (item) {
                item.open();
                i++;
                item = this["item" + i];
            }
        };
        ComPanel.prototype.startBar = function () {
            var barMaxVal = this.bar.maximum;
            gTween.tween(this.bar, void 0, {
                props: { value: barMaxVal },
                duration: barMaxVal,
                call: {
                    callback: function () {
                        GameMgr.endType = 0 /* FAIL */;
                        GameMgr.gameview.openEndFail();
                    }
                }
            });
        };
        ComPanel.prototype.stopBar = function () {
            gTween.rmTweens(this.bar);
        };
        Object.defineProperty(ComPanel.prototype, "barVal", {
            /** 获取进度条当前值 */
            get: function () {
                return this._barVal;
            },
            /** 设置进度条当前值 */
            set: function (_barVal) {
                if (_barVal > gConst.barMaxVal) {
                    return;
                }
                this._barVal = _barVal;
                this.updateBar();
            },
            enumerable: true,
            configurable: true
        });
        /** 更新进度条 */
        ComPanel.prototype.updateBar = function () {
            var barVal = this.barVal;
            this.bar.value = barVal;
            var barMaxVal = gConst.barMaxVal;
            var headCnt = this.headCnt;
            var oneStarVal = Math.floor(barMaxVal / 3); //总共3个正确头像，点亮一个正确头像需要多少值
            if (headCnt >= 2) {
                if (barVal >= barMaxVal) {
                    this.headCnt++;
                }
            }
            else {
                if (barVal >= oneStarVal * (headCnt + 1)) {
                    this.headCnt++;
                }
            }
        };
        Object.defineProperty(ComPanel.prototype, "headCnt", {
            /** 获取正确头像数 */
            get: function () {
                return this._headCnt;
            },
            /** 设置正确头像数 */
            set: function (_headCnt) {
                if (_headCnt > 3) {
                    return;
                }
                this._headCnt = _headCnt;
                this.updateHead();
            },
            enumerable: true,
            configurable: true
        });
        /** 更新正确头像数 */
        ComPanel.prototype.updateHead = function () {
            var _this = this;
            var headCnt = this.headCnt;
            var getHead = function (i) {
                return _this["item" + i];
            };
            if (headCnt <= 0) {
                var i = 0;
                var head = getHead.call(this, i);
                while (head) {
                    head.finish(false);
                    head.initHead();
                    i++;
                    head = getHead.call(this, i);
                }
            }
            else {
                for (var i = 0; i < headCnt; i++) {
                    var head = getHead.call(this, i);
                    if (!head) {
                        continue;
                    }
                    if (head.finish()) {
                        continue;
                    }
                    head.finish(true);
                    head.bright();
                }
            }
        };
        return ComPanel;
    }(com.ComFile));
    com.ComPanel = ComPanel;
    __reflect(ComPanel.prototype, "com.ComPanel");
})(com || (com = {}));
//# sourceMappingURL=ComPanel.js.map