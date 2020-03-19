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
     * 恭喜页面
     */
    var UiCongrats = (function (_super) {
        __extends(UiCongrats, _super);
        function UiCongrats() {
            var _this = _super.call(this) || this;
            _this.moneyId = 0;
            _this.skinName = skins.UiCongrats;
            return _this;
        }
        /* =========== 框架结构代码-start =========== */
        /**
         * 初始化
         * @param {any[]} args open()传参会通过init()传过去
         */
        UiCongrats.prototype.init = function (notClose, moneyId) {
            if (moneyId === void 0) { moneyId = 0; }
            // console.info("init", ...args);
            this.notClose = notClose;
            this.moneyId = moneyId;
        };
        /** 首次打开界面时调用 */
        UiCongrats.prototype.load = function () {
            // console.info("load");
            // this.word.visible = false;
            // this.comBoxEnd.open("congrats");
        };
        /** 每次打开界面都会调用 */
        UiCongrats.prototype.start = function () {
            // console.info("start");
            this.bg.mask = this.bg_mask;
            var boyBone = new com.ComBones();
            boyBone.setData(this.conBoy, 'ppeople');
            boyBone.play('people', 0);
            boyBone.setPos({ x: void 0, y: 272 });
        };
        /** 每次结束界面都会调用 */
        UiCongrats.prototype.stop = function () {
            // console.info("stop");
        };
        /** 监听界面，每帧都会调用 */
        UiCongrats.prototype.update = function () {
            // console.info("update");
        };
        /** 注册事件 */
        UiCongrats.prototype.addEvent = function () {
            // console.info("addEvent");
            // this.btn.once(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        };
        /** 移除事件 */
        UiCongrats.prototype.removeEvent = function () {
        };
        /** 窗口大小改变时调用 */
        UiCongrats.prototype.resizeView = function () {
            // console.info("resizeView", this.width, this.height);
            // var s1: number = this.width / this.con.width;
            // var s2: number = this.height / this.con.height;
            var con = this.con;
            var baseScale = gConst.mobileByScale[GameMgr.screenType][GameMgr.mobileType];
            var conDiffS = 1;
            // con.scaleX = con.scaleY = Math.max(s1, s2);
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
                        conDiffS = .85;
                        break;
                }
                con.scaleX = con.scaleY = baseScale * conDiffS;
                con.x = gMath.keepDecimal((-(con.width / 2 - con.anchorOffsetX) * con.scaleX) + this.width * .5, 0);
                con.y = gMath.keepDecimal((-(con.height / 2 - con.anchorOffsetY) * con.scaleY) + this.height * .5, 0);
            }
            else {
                //横屏
                switch (this.mobileType) {
                    //iPhoneX或以上
                    case 1 /* IPHONE_X */:
                        conDiffS = .85;
                        break;
                    //iPhone8或以下
                    case 2 /* IPHONE_8 */:
                        conDiffS = .85;
                        break;
                    //iPad或其它
                    case 3 /* IPAD */:
                        conDiffS = .85;
                        break;
                }
                con.scaleX = con.scaleY = baseScale * conDiffS;
                con.x = gMath.keepDecimal((-(con.width / 2 - con.anchorOffsetX) * con.scaleX) + this.width * .75, 0);
                con.y = gMath.keepDecimal((-(con.height / 2 - con.anchorOffsetY) * con.scaleY) + this.height * .5, 0);
            }
        };
        /** 屏幕横竖屏转换时调用 */
        UiCongrats.prototype.rotateView = function () {
            // console.info("rotateView", this.screenType);
            // const con = this.con;
            if (this.screenType == 1 /* VERTICAL */) {
            }
            else {
            }
        };
        return UiCongrats;
    }(ui.UiFile));
    ui.UiCongrats = UiCongrats;
    __reflect(UiCongrats.prototype, "ui.UiCongrats");
})(ui || (ui = {}));
//# sourceMappingURL=UiCongrats.js.map