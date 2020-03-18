namespace com {
	/**
	 * 盒子组件
	 */
	export class ComBox extends com.ComFile {
		public con: eui.Group;
		public bottomLayer: eui.Image;
		public topLayer: eui.Image;

		public orgParent: egret.DisplayObjectContainer;
		public orgIndex: number;

		public id: gConst.stateId;
		private initY: number;
		private _die: boolean;

		// private _posId: number;

		public readonly type: gConst.itemType = gConst.itemType.BOX;

		public constructor() {
			super();
			this.skinName = skins.ComBox;
		}

		/* =========== 框架结构代码-start =========== */
		/**
		 * 初始化
		 * @param {any[]} args 构建传参会通过init()传过去
		 */
		protected init(...args: any[]) {
			// console.info("init", ...args);
		}

		/** 首次创建组件时调用 */
		protected load() {
			// console.info("load");
			const con = this.con;
			const bottomLayer = this.bottomLayer;
			const topLayer = this.topLayer;

			this.touchChildren = false;
			gComMgr.setItemAnchor(bottomLayer);
			gComMgr.setItemAnchor(con);
			this.initY = con.y;
			gComMgr.setObjSize(topLayer);
		}

		/** 每次创建组件都会调用 */
		protected start() {
			// console.info("start");
			this.playIdle();
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
		private initBox() {
			const con = this.con;
			const topLayer = this.topLayer;

			gTween.rmTweens(con);
			gTween.rmTweens(topLayer);
			con.y = this.initY;
			topLayer.y = 0;
		}

		/** 待机 */
		public playIdle() {
			const con = this.con;
			const topLayer = this.topLayer;
			const id = this.id = gConst.stateId.IDLE;

			this.initBox();
			con.visible = true;
			gTween.loopFloat(con, 10, 1000, this.initY);
			gTween.loopFloat(topLayer, 5, 1000, 0);
		}

		/** 掉落 */
		public playDropDown(duration: number = 1000) {
			const con = this.con;
			const topLayer = this.topLayer;
			const id = this.id = gConst.stateId.DROP_DOWN;
			const goalY = con.height - topLayer.height;

			this.initBox();
			gTween.toMoveY(topLayer, goalY, duration, 0);
		}

		/** 站立 */
		public playStand() {
			const con = this.con;
			const topLayer = this.topLayer;
			const id = this.id = gConst.stateId.STAND;
			const goalY = con.height - topLayer.height;

			this.initBox();
			topLayer.y = goalY;
		}

		/** 死亡 */
		public playDie() {
			this.playStand();
			const con = this.con;
			const id = this.id = gConst.stateId.DIE;

			gTween.fadeOut(con);
		}

		/** 设置or获取位置ID */
		// posId(posId?: number): number {
		// 	if (posId != void 0) {
		// 		this._posId = posId;
		// 	} else {
		// 		return this._posId;
		// 	}
		// }

		/** 设置or获取死亡状态 */
		public die(die?: boolean): boolean {
			if (die !== void 0) {
				this._die = die;
			} else {
				return this._die;
			}
		}
		/* =========== 业务代码-end =========== */
	}
}