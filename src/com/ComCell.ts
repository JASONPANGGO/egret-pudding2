namespace com {
	/**
	 * 单元格组件
	 */
	export class ComCell extends com.ComFile {
		public con: eui.Group;
		public item: eui.Image;

		public row: number; //行
		public col: number; //列
		public id: gConst.cellId; //单元格ID
		private initX: number;
		private initY: number;

		private bojing: boolean;
		public hited: boolean; //已触碰到
		public fitHeadAndTail: boolean; //符合收尾相连的条件
		public headAndTail: boolean; //首尾相连

		public constructor() {
			super();
			this.skinName = skins.ComCell;
		}

		/* =========== 框架结构代码-start =========== */
		/**
		 * 初始化
		 * @param {any[]} args 构建传参会通过init()传过去
		 */
		protected init(id: gConst.cellId) {
			// console.info("init", ...args);
			this.id = id;
		}

		/** 首次创建组件时调用 */
		protected load() {
			// console.info("load");
			this.touchChildren = false;
			// this.touchEnabled = true;
		}

		/** 每次创建组件都会调用 */
		protected start() {
			// console.info("start");
			this.clearState();
			const item = this.item;
			if (this.id > 0) {
				item.source = `pBall${gConst.cellSkin[this.id]}_png`;
			} else {
				item.source = "";
			}
			gComMgr.setItemAnchor(item);
			const len = this.width = this.height = 80;
			const half = len / 2;
			this.con.x = half;
			this.con.y = half;
		}

		/** 每次结束组件都会调用 */
		protected stop() {
			// console.info("stop");
		}

		/** 监听组件，每帧都会调用 */
		protected update() {
			// console.info("update");
		}

		/** 注册事件 */
		protected addEvent() {
			// console.info("addEvent");
		}

		/** 移除事件 */
		protected removeEvent() {
			// console.info("removeEvent");
		}

		/** 窗口大小改变时调用 */
		protected resizeView(event?: egret.Event) {
			// console.info("resizeView", event, GameMgr.gameview.width, GameMgr.gameview.height);
			if (GameMgr.screenType == gConst.screenType.VERTICAL) {
				//竖屏
				switch (GameMgr.mobileType) {
					//iPhoneX或以上
					case gConst.mobileType.IPHONE_X:
						break;
					//iPhone8或以下
					case gConst.mobileType.IPHONE_8:
						break;
					//iPad或其它
					case gConst.mobileType.IPAD:
						break;
				}
			} else {
				//横屏
				switch (GameMgr.mobileType) {
					//iPhoneX或以上
					case gConst.mobileType.IPHONE_X:
						break;
					//iPhone8或以下
					case gConst.mobileType.IPHONE_8:
						break;
					//iPad或其它
					case gConst.mobileType.IPAD:
						break;
				}
			}
		}

		/** 屏幕横竖屏转换时调用 */
		protected rotateView(event: egret.Event) {
			// console.info("rotateView", event, GameMgr.screenType, GameMgr.mobileType);
			if (GameMgr.screenType == gConst.screenType.VERTICAL) {
				//竖屏
			} else {
				//横屏
			}
		}
		/* =========== 框架结构代码-end =========== */


		/* =========== 业务代码-start =========== */
		public clearState() {
			this.bojing = null;
			this.hited = null;
			this.fitHeadAndTail = null;
			this.headAndTail = null;
		}

		public bodong(): void {
			egret.Tween.get(this.item).to({ scaleX: 1.3, scaleY: 1.3 }, 240).
				to({ scaleX: 1, scaleY: 1 }, 240);
		}

		public changeSkin(type: number = 1): void {
			const item = this.item;
			egret.Tween.get(item).to({ scaleX: 1.1, scaleY: 1.1 }, 100).to({ scaleX: 0, scaleY: 0 }, 100).call(() => {
				if (type == 1) {
					gSoundMgr.playEff("smgrow");
				}
				item.source = "ptool" + type + "_png";
				gComMgr.setObjAnchor(item);
				this.id = 100 + type;
				gTween.toScale(item, 1, 300, 0, egret.Ease.bounceOut);
			}, this);

		}

		public shake(wait: number = 1000): void {
			// egret.setTimeout(() => {
			// SoundMgr.playEff("resource/assets/sound/jump.mp3");
			// }, this, wait);
			egret.Tween.get(this.item).wait(wait).to({ y: this.initY - 4 }, 100).call(this.shakeBm, this);
		}

		public stopShake(): void {
			const item = this.item;
			item.x = this.initX;
			item.y = this.initY;
			item.rotation = 0;
			egret.Tween.removeTweens(item);
		}

		public dispose(effType?: gConst.effType, isDestory: boolean = true): void {

			// var _mc: MovieClip = new MovieClip();
			// _mc.interval = 50;
			// _mc.setData([new McData("1", 4, "eff0_{1}_png")], 35, 35)
			// this.addChild(_mc);
			// _mc.gotoAndPlay("1", 1);
			// _mc.once(egret.Event.COMPLETE, this.playcom, this);=

			/** 销毁 */
			const destory: Function = () => {
				if (!isDestory) {
					return;
				}
				gComMgr.destory(this.item);
				gComMgr.destory(this.con);
				gComMgr.destory(this);
			};

			/** 放大消失 */
			const toBigHide: Function = () => {
				gTween.toBigHide(this.con, 1.3, 200, 1, 1, void 0, void 0, {
					callback: () => {
						destory.call(this);
					}
				});
			};

			/** 缩小消失 */
			const toSmallHide: Function = () => {
				gTween.toSmallHide(this.con, 200, 1, 1, void 0, void 0, {
					callback: () => {
						destory.call(this);
					}
				});
			};

			/** 放大后缩小消失 */
			const toBigToSmallHide: Function = () => {
				gTween.toScale(this.con, 1.2, 100, 1, void 0, void 0, {
					callback: () => {
						gTween.toScale(this.con, 0, 200, 1, void 0, void 0, {
							callback: () => {
								destory.call(this);
							}
						});
					}
				});
			};

			/** 普通特效 */
			const normalEff: Function = () => {
				toBigHide.call(this);
			};

			/** 爆炸特效 */
			const boomEff: Function = (id: gConst.effType.BOOM_EFF1 | gConst.effType.BOOM_EFF2) => {
				this.con.visible = !isDestory;

				const boom: com.ComBones = new com.ComBones();

				let pos = gComMgr.toGlobal(this.con);
				const gp = GameMgr.gameview //.gp;
				pos = gComMgr.toLocal(gp, pos.x, pos.y, pos);
				boom.setData(gp.parent, "ppeople", true);

				let scale: number = 1;
				if (id == gConst.effType.BOOM_EFF1) {
					scale = 1.5;
				} else {
					// pos.x -= this.bmcon.width / 2 - 2;
				}

				boom.setPos({ x: pos.x, y: pos.y });
				boom.setScale(scale);
				boom.create();
				boom.armatureDisplay.once(egret.Event.COMPLETE, destory, this);
				boom.play("effect" + id, 1, true);
			};

			/** 高光特效 */
			const highlightEff: Function = () => {
				const light: eui.Image = new eui.Image("plight_png");
				this.con.addChild(light);
				gComMgr.setObjAnchor(light);
				const item = this.item;
				light.x = item.x;
				light.y = item.y;
				light.alpha = 0;
				// light.scaleX = light.scaleY = 0;
				gTween.fadeIn(light, 300, 1);

				normalEff.call(this);
			};

			/** 震动后，普通特效 */
			const shakeBigEff: Function = () => {
				const shake = new util.ShakeTool();
				this.item.once(egret.Event.COMPLETE, () => {
					toBigHide.call(this);
				}, this);
				shake.shakeObj(this.item, 200, 20, 5, 5, void 0, void 0);
			};

			if (effType != void 0) {
				switch (effType) {
					//普通特效
					case gConst.effType.NORMAL:
						normalEff.call(this);
						break;
					//炸弹爆炸特效1
					case gConst.effType.BOOM_EFF1:
						boomEff.call(this, gConst.effType.BOOM_EFF1);
						break;
					//炸弹爆炸特效2
					case gConst.effType.BOOM_EFF2:
						boomEff.call(this, gConst.effType.BOOM_EFF2);
						break;
					//高光特效
					case gConst.effType.HIGHLIGHT:
						highlightEff.call(this);
						break;
					//震动后，普通特效
					case gConst.effType.SHAKE_NORMAL:
						shakeBigEff.call(this);
						break;
				}
			} else {
				destory.call(this);
			}
		}


		private playcom(e: egret.Event): void {
			var _mc: com.ComMovieClip = e.target;
			egret.Tween.get(_mc).to({ scaleX: 1.2, scaleY: 1.2, alpha: 0 }, 140).call(() => {
				if (this.parent) {
					this.parent.removeChild(this);
				}
			}, this);
		}

		private shakeBm(): void {
			// this.sk.shakeObj(this.bm,0.6,10,2);
			egret.Tween.get(this.item).to({ rotation: -10 }, 70).to({ rotation: 10 }, 140)
				.to({ rotation: -10 }, 140).to({ rotation: 10 }, 140)
				.to({ rotation: -10 }, 140).to({ rotation: 10 }, 140)
				.to({ rotation: 0 }, 70).call(this.downBm, this);
			// this.bm.once(egret.Event.COMPLETE,this.downBm,this);
		}

		private downBm(): void {
			egret.Tween.get(this.item).to({ y: this.initY }, 100).wait(500).call(this.shake, this, [0]);
		}

		public playTouch() {
			const item = this.item;
			const shadow = new eui.Image(item.source);
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
		}
		/* =========== 业务代码-end =========== */
	}
}