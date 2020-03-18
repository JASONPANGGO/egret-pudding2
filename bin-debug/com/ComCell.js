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
     * 单元格组件
     */
    var ComCell = (function (_super) {
        __extends(ComCell, _super);
        function ComCell() {
            var _this = _super.call(this) || this;
            _this.skinName = skins.ComCell;
            return _this;
        }
        /* =========== 框架结构代码-start =========== */
        /**
         * 初始化
         * @param {any[]} args 构建传参会通过init()传过去
         */
        ComCell.prototype.init = function (id) {
            // console.info("init", ...args);
            this.id = id;
        };
        /** 首次创建组件时调用 */
        ComCell.prototype.load = function () {
            // console.info("load");
            this.touchChildren = false;
            // this.touchEnabled = true;
        };
        /** 每次创建组件都会调用 */
        ComCell.prototype.start = function () {
            // console.info("start");
            this.clearState();
            var item = this.item;
            if (this.id > 0) {
                item.source = "pBall" + gConst.cellSkin[this.id] + "_png";
            }
            else {
                item.source = "";
            }
            gComMgr.setItemAnchor(item);
            var len = this.width = this.height = 80;
            var half = len / 2;
            this.con.x = half;
            this.con.y = half;
        };
        /** 每次结束组件都会调用 */
        ComCell.prototype.stop = function () {
            // console.info("stop");
        };
        /** 监听组件，每帧都会调用 */
        ComCell.prototype.update = function () {
            // console.info("update");
        };
        /** 注册事件 */
        ComCell.prototype.addEvent = function () {
            // console.info("addEvent");
        };
        /** 移除事件 */
        ComCell.prototype.removeEvent = function () {
            // console.info("removeEvent");
        };
        /** 窗口大小改变时调用 */
        ComCell.prototype.resizeView = function (event) {
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
        ComCell.prototype.rotateView = function (event) {
            // console.info("rotateView", event, GameMgr.screenType, GameMgr.mobileType);
            if (GameMgr.screenType == 1 /* VERTICAL */) {
            }
            else {
            }
        };
        /* =========== 框架结构代码-end =========== */
        /* =========== 业务代码-start =========== */
        ComCell.prototype.clearState = function () {
            this.bojing = null;
            this.hited = null;
            this.fitHeadAndTail = null;
            this.headAndTail = null;
        };
        ComCell.prototype.bodong = function () {
            egret.Tween.get(this.item).to({ scaleX: 1.3, scaleY: 1.3 }, 240).
                to({ scaleX: 1, scaleY: 1 }, 240);
        };
        ComCell.prototype.changeSkin = function (type) {
            var _this = this;
            if (type === void 0) { type = 1; }
            var item = this.item;
            egret.Tween.get(item).to({ scaleX: 1.1, scaleY: 1.1 }, 100).to({ scaleX: 0, scaleY: 0 }, 100).call(function () {
                if (type == 1) {
                    gSoundMgr.playEff("smgrow");
                }
                item.source = "ptool" + type + "_png";
                gComMgr.setObjAnchor(item);
                _this.id = 100 + type;
                gTween.toScale(item, 1, 300, 0, egret.Ease.bounceOut);
            }, this);
        };
        ComCell.prototype.shake = function (wait) {
            if (wait === void 0) { wait = 1000; }
            // egret.setTimeout(() => {
            // SoundMgr.playEff("resource/assets/sound/jump.mp3");
            // }, this, wait);
            egret.Tween.get(this.item).wait(wait).to({ y: this.initY - 4 }, 100).call(this.shakeBm, this);
        };
        ComCell.prototype.stopShake = function () {
            var item = this.item;
            item.x = this.initX;
            item.y = this.initY;
            item.rotation = 0;
            egret.Tween.removeTweens(item);
        };
        ComCell.prototype.dispose = function (effType, isDestory) {
            // var _mc: MovieClip = new MovieClip();
            // _mc.interval = 50;
            // _mc.setData([new McData("1", 4, "eff0_{1}_png")], 35, 35)
            // this.addChild(_mc);
            // _mc.gotoAndPlay("1", 1);
            // _mc.once(egret.Event.COMPLETE, this.playcom, this);=
            var _this = this;
            if (isDestory === void 0) { isDestory = true; }
            /** 销毁 */
            var destory = function () {
                if (!isDestory) {
                    return;
                }
                gComMgr.destory(_this.item);
                gComMgr.destory(_this.con);
                gComMgr.destory(_this);
            };
            /** 放大消失 */
            var toBigHide = function () {
                gTween.toBigHide(_this.con, 1.3, 200, 1, 1, void 0, void 0, {
                    callback: function () {
                        destory.call(_this);
                    }
                });
            };
            /** 缩小消失 */
            var toSmallHide = function () {
                gTween.toSmallHide(_this.con, 200, 1, 1, void 0, void 0, {
                    callback: function () {
                        destory.call(_this);
                    }
                });
            };
            /** 放大后缩小消失 */
            var toBigToSmallHide = function () {
                gTween.toScale(_this.con, 1.2, 100, 1, void 0, void 0, {
                    callback: function () {
                        gTween.toScale(_this.con, 0, 200, 1, void 0, void 0, {
                            callback: function () {
                                destory.call(_this);
                            }
                        });
                    }
                });
            };
            /** 普通特效 */
            var normalEff = function () {
                toBigHide.call(_this);
            };
            /** 爆炸特效 */
            var boomEff = function (id) {
                _this.con.visible = !isDestory;
                var boom = new com.ComBones();
                var pos = gComMgr.toGlobal(_this.con);
                var gp = GameMgr.gameview; //.gp;
                pos = gComMgr.toLocal(gp, pos.x, pos.y, pos);
                boom.setData(gp.parent, "ppeople", true);
                var scale = 1;
                if (id == 1 /* BOOM_EFF1 */) {
                    scale = 1.5;
                }
                else {
                }
                boom.setPos({ x: pos.x, y: pos.y });
                boom.setScale(scale);
                boom.create();
                boom.armatureDisplay.once(egret.Event.COMPLETE, destory, _this);
                boom.play("effect" + id, 1, true);
            };
            /** 高光特效 */
            var highlightEff = function () {
                var light = new eui.Image("plight_png");
                _this.con.addChild(light);
                gComMgr.setObjAnchor(light);
                var item = _this.item;
                light.x = item.x;
                light.y = item.y;
                light.alpha = 0;
                // light.scaleX = light.scaleY = 0;
                gTween.fadeIn(light, 300, 1);
                normalEff.call(_this);
            };
            /** 震动后，普通特效 */
            var shakeBigEff = function () {
                var shake = new util.ShakeTool();
                _this.item.once(egret.Event.COMPLETE, function () {
                    toBigHide.call(_this);
                }, _this);
                shake.shakeObj(_this.item, 200, 20, 5, 5, void 0, void 0);
            };
            if (effType != void 0) {
                switch (effType) {
                    //普通特效
                    case 0 /* NORMAL */:
                        normalEff.call(this);
                        break;
                    //炸弹爆炸特效1
                    case 1 /* BOOM_EFF1 */:
                        boomEff.call(this, 1 /* BOOM_EFF1 */);
                        break;
                    //炸弹爆炸特效2
                    case 2 /* BOOM_EFF2 */:
                        boomEff.call(this, 2 /* BOOM_EFF2 */);
                        break;
                    //高光特效
                    case 3 /* HIGHLIGHT */:
                        highlightEff.call(this);
                        break;
                    //震动后，普通特效
                    case 4 /* SHAKE_NORMAL */:
                        shakeBigEff.call(this);
                        break;
                }
            }
            else {
                destory.call(this);
            }
        };
        ComCell.prototype.playcom = function (e) {
            var _this = this;
            var _mc = e.target;
            egret.Tween.get(_mc).to({ scaleX: 1.2, scaleY: 1.2, alpha: 0 }, 140).call(function () {
                if (_this.parent) {
                    _this.parent.removeChild(_this);
                }
            }, this);
        };
        ComCell.prototype.shakeBm = function () {
            // this.sk.shakeObj(this.bm,0.6,10,2);
            egret.Tween.get(this.item).to({ rotation: -10 }, 70).to({ rotation: 10 }, 140)
                .to({ rotation: -10 }, 140).to({ rotation: 10 }, 140)
                .to({ rotation: -10 }, 140).to({ rotation: 10 }, 140)
                .to({ rotation: 0 }, 70).call(this.downBm, this);
            // this.bm.once(egret.Event.COMPLETE,this.downBm,this);
        };
        ComCell.prototype.downBm = function () {
            egret.Tween.get(this.item).to({ y: this.initY }, 100).wait(500).call(this.shake, this, [0]);
        };
        ComCell.prototype.playTouch = function () {
            var item = this.item;
            var shadow = new eui.Image(item.source);
            shadow.anchorOffsetX = item.anchorOffsetX;
            shadow.anchorOffsetY = item.anchorOffsetY;
            shadow.x = item.x;
            shadow.y = item.y;
            gTween.toBigHide(shadow, 1.8, 300, 1, 1, egret.Ease.sineInOut, void 0, {
                callback: gComMgr.rmObj,
                thisObj: gComMgr,
                params: [shadow]
            });
            item.parent.addChild(shadow);
        };
        return ComCell;
    }(com.ComFile));
    com.ComCell = ComCell;
    __reflect(ComCell.prototype, "com.ComCell");
})(com || (com = {}));
//# sourceMappingURL=ComCell.js.map