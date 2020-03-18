namespace com {
	/**
	 * 目标组件
	 */
	export class ComTarget extends com.ComFile {
		public con: eui.Group;
		public bg: eui.Image;
		public conTime: eui.Group;
		public bgTime: eui.Image;
		public time: eui.Label;

		private timeDelay: number;

		private _remainTime: number; //剩余时间（秒）

		public constructor() {
			super();
			this.skinName = skins.ComTarget;
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
			this.touchChildren = false;
			// this.touchEnabled = true;

			const con = this.con;
			const bg = this.bg;
			const time = this.time;

			gComMgr.setObjSize(bg, true);
			con.height += 43;

			const countdown = GameMgr.getConfig("countdown");
			this.remainTime = Math.max(countdown, 0);
			this.renderTime();
		}

		/** 每次创建组件都会调用 */
		protected start() {
			// console.info("start");
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

			const baseScale: number = gConst.mobileByScale[GameMgr.screenType][GameMgr.mobileType];

			if (GameMgr.screenType == gConst.screenType.VERTICAL) {
				//竖屏
				this.scaleX = this.scaleY = baseScale;

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
				this.scaleX = this.scaleY = baseScale * .92;

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
		private startTimeed: boolean;

		/** 开始倒计时 */
		startTime() {
			if (this.startTimeed) {
				return;
			}
			this.startTimeed = true;
			egret.clearInterval(this.timeDelay);
			this.timeDelay = egret.setInterval(this.updateTime, this, 1000);
		}

		/** 停止倒计时 */
		stopTime() {
			egret.clearInterval(this.timeDelay);
		}

		/** 更新倒计时 */
		private updateTime() {
			if (this.remainTime <= 0) {
				this.stopTime();
				this.dispatchEventWith(gConst.eventType.ONCE_COMPLETE);
				return;
			}
			this.remainTime--;
			this.renderTime();
		}

		get remainTime(): number {
			return this._remainTime;
		}
		set remainTime(time: number) {
			if (time < 0) {
				return;
			}
			time = Math.max(time, 0);
			this._remainTime = time;

			let countdown = GameMgr.getConfig("countdown");
			countdown = Math.max(countdown, 0);
			const diffTime = countdown - this.remainTime; //已过几秒
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
		}

		/** 渲染倒计时 */
		private renderTime() {
			const time = this.time;

			time.text = gMath.switchMinute(this.remainTime * 1000);
		}
		/* =========== 业务代码-end =========== */
	}
}