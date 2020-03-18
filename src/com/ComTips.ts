namespace com {
	/**
	 * 提示组件
	 */
	export class ComTips extends com.ComFile {
		public con: eui.Group;
		public head: eui.Image;
		public gWord: eui.Group;
		public conWord: eui.Group;
		public conBubble: eui.Group;
		public word: eui.Image;

		public constructor() {
			super();
			this.skinName = skins.ComTips;
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
			this.conWord.visible = false;
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
			this.head.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHead, this);
		}

		/** 移除事件 */
		protected removeEvent() {
			// console.info("removeEvent");
			this.head.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHead, this);
		}

		/** 窗口大小改变时调用 */
		protected resizeView(event?: egret.Event) {
			// console.info("resizeView", event, GameMgr.gameview.width, GameMgr.gameview.height);

			const con = this.con;

			const baseScale: number = gConst.mobileByScale[GameMgr.screenType][GameMgr.mobileType];

			con.scaleX = con.scaleY = baseScale;

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
			const con = this.con;
			const gWord = this.gWord;
			const conBubble = this.conBubble;
			const word = this.word;

			if (GameMgr.screenType == gConst.screenType.VERTICAL) {
				//竖屏
				con.width = 350;
				con.height = 299;
				gWord.x = 133;
				gWord.y = 142;
				conBubble.rotation = 0;
				word.horizontalCenter = -10;
				word.verticalCenter = -35;
			} else {
				//横屏
				con.width = 246;
				con.height = 402;
				gWord.x = 36;
				gWord.y = 194;
				conBubble.rotation = 15;
				word.horizontalCenter = -32;
				word.verticalCenter = -14;
			}
		}
		/* =========== 框架结构代码-end =========== */


		/* =========== 业务代码-start =========== */
		public showWord() {
			gTween.showBubble(this.conWord, 500, { orgS: 1, orgA: 1, ease: egret.Ease.backOut });
		}
		public hideWord() {
			gTween.hideBubble(this.conWord, 200, { orgS: 1, orgA: 1 });
		}

		private clickHead(event: egret.TouchEvent) {
			// Mapi.sendAction(5);
			this.clickInstall(event);
		}
		/* =========== 业务代码-end =========== */
	}
}