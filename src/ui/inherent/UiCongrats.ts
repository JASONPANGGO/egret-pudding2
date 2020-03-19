namespace ui {
	/**
	 * 恭喜页面
	 */
	export abstract class UiCongrats extends ui.UiFile {

		public conBg: eui.Group;
		public bg: eui.Image;
		public bg_mask: eui.Group;
		public erase_mask: eui.Rect;
		public con: eui.Group;
		public conBoy: eui.Group;
		public btnRe: eui.Image;
		public logo: eui.Image;

		// public word: eui.Image;
		// public btn: eui.Image;
		private notClose: boolean;

		private moneyId: number = 0;

		public constructor() {
			super();
			this.skinName = skins.UiCongrats;
		}

		/* =========== 框架结构代码-start =========== */
		/**
		 * 初始化
		 * @param {any[]} args open()传参会通过init()传过去
		 */
		protected init(notClose?: boolean, moneyId: number = 0) {
			// console.info("init", ...args);
			this.notClose = notClose;
			this.moneyId = moneyId;
		}

		/** 首次打开界面时调用 */
		protected load() {
			// console.info("load");
			// this.word.visible = false;
			// this.comBoxEnd.open("congrats");
		}

		/** 每次打开界面都会调用 */
		protected start() {
			// console.info("start");
			this.bg.mask = this.bg_mask
			let boyBone = new com.ComBones()
			boyBone.setData(this.conBoy, 'ppeople')
			boyBone.play('people', 0)
			boyBone.setPos({ x: void 0, y: 272 })

		}

		/** 每次结束界面都会调用 */
		protected stop() {
			// console.info("stop");
		}

		/** 监听界面，每帧都会调用 */
		protected update() {
			// console.info("update");
		}

		/** 注册事件 */
		protected addEvent() {
			// console.info("addEvent");
			// this.btn.once(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);

		}

		/** 移除事件 */
		protected removeEvent() {


		}

		/** 窗口大小改变时调用 */
		protected resizeView(): void {
			// console.info("resizeView", this.width, this.height);
			// var s1: number = this.width / this.con.width;
			// var s2: number = this.height / this.con.height;

			const con = this.con;

			let baseScale: number = gConst.mobileByScale[GameMgr.screenType][GameMgr.mobileType];
			let conDiffS: number = 1;

			// con.scaleX = con.scaleY = Math.max(s1, s2);

			if (this.screenType == gConst.screenType.VERTICAL) {
				//竖屏
				switch (this.mobileType) {
					//iPhoneX或以上
					case gConst.mobileType.IPHONE_X:
						break;
					//iPhone8或以下
					case gConst.mobileType.IPHONE_8:
						break;
					//iPad或其它
					case gConst.mobileType.IPAD:
						conDiffS = .85;
						break;
				}
				con.scaleX = con.scaleY = baseScale * conDiffS;
				con.x = gMath.keepDecimal((-(con.width / 2 - con.anchorOffsetX) * con.scaleX) + this.width * .5, 0);
				con.y = gMath.keepDecimal((-(con.height / 2 - con.anchorOffsetY) * con.scaleY) + this.height * .5, 0);
			} else {
				//横屏
				switch (this.mobileType) {
					//iPhoneX或以上
					case gConst.mobileType.IPHONE_X:
						conDiffS = .85;
						break;
					//iPhone8或以下
					case gConst.mobileType.IPHONE_8:
						conDiffS = .85;
						break;
					//iPad或其它
					case gConst.mobileType.IPAD:
						conDiffS = .85;
						break;
				}
				con.scaleX = con.scaleY = baseScale * conDiffS;
				con.x = gMath.keepDecimal((-(con.width / 2 - con.anchorOffsetX) * con.scaleX) + this.width * .75, 0);
				con.y = gMath.keepDecimal((-(con.height / 2 - con.anchorOffsetY) * con.scaleY) + this.height * .5, 0);
			}
		}

		/** 屏幕横竖屏转换时调用 */
		protected rotateView(): void {
			// console.info("rotateView", this.screenType);
			// const con = this.con;

			if (this.screenType == gConst.screenType.VERTICAL) {
				//竖屏
				// con.horizontalCenter = 0;
			} else {
				//横屏
				// con.horizontalCenter = NaN;
			}
		}
		/* =========== 框架结构代码-end =========== */


		/* =========== 业务代码-start =========== */


		// private clickBtn(event: egret.TouchEvent) {
		// 	Mapi.sendAction(4);
		// 	GameMgr.auto(true);
		// 	this.hidePeople();
		// 	this.hideWord(this.close, this);
		// 	this.hideBtn();
		// }

		// private showBtn() {
		// 	gTween.toBigShow(this.btn, 300, 1, 1, egret.Ease.bounceOut, void 0, {
		// 		callback: gTween.yoyoBtn,
		// 		thisObj: gTween,
		// 		params: [this.btn, false]
		// 	});
		// }

		// private hideBtn() {
		// 	gTween.toSmallHide(this.btn, 200, 1, 1);
		// }

		/* =========== 业务代码-end =========== */
	}
}