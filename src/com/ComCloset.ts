namespace com {
	/**
	 * 衣柜组件
	 */
	export class ComCloset extends com.ComFile {
		public con: eui.Group;
		public door: eui.Image;

		public constructor() {
			super();
			this.skinName = skins.ComCloset;
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
		}

		/** 每次创建组件都会调用 */
		protected start() {
			// console.info("start");
			this.door.visible = false;
			this.door.source = "pLv2Ye1_png";
			this.shakeCloset();
			this.shakeClosetDelay = egret.setInterval(this.shakeCloset, this, 1000);
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
			// this.once(egret.TouchEvent.TOUCH_TAP, this.openDoor, this);
			this.once(egret.TouchEvent.TOUCH_TAP, this.clickDoor, this);
		}

		/** 移除事件 */
		protected removeEvent() {
			// console.info("removeEvent");
			// this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openDoor, this);
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickDoor, this);
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
		/** 打开门 */
		public openDoor(event: egret.TouchEvent) {
			const con = this.con;
			const door = this.door;
			const shake = new util.ShakeTool();

			const shakeComplete: Function = () => {
				door.visible = true;
				egret.setTimeout(() => {
					door.source = "pLv2Ye2_png";
					this.dispatchEventWith(gConst.eventType.RIGHT_ANSWER);
				}, this, 500);
			};

			con.once(egret.Event.COMPLETE, shakeComplete, this);
			shake.shakeObj(con, 500, 10, 0, 10, 0, 0);
		}

		private shake: util.ShakeTool;
		private shakeClosetDelay: number;

		private shakeCloset() {
			const con = this.con;
			let shake = this.shake;

			if (!shake) {
				shake = this.shake = new util.ShakeTool();
			}
			shake.shakeObj(con, 500, 10, 0, 10, 0, 0);
		}

		private clickDoor(event: egret.TouchEvent) {
			const con = this.con;
			const shake = this.shake;

			if (shake) {
				shake.stop();
				con.once(egret.Event.COMPLETE, this.clickInstall, this);
				shake.shakeObj(con, 500, 10, 0, 10, 0, 0);
			}
			// GameMgr.gameview.hideHand();
			egret.clearInterval(this.shakeClosetDelay);
		}
		/* =========== 业务代码-end =========== */
	}
}