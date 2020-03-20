namespace ui {
	/**
	 * 结束页面
	 */
	export abstract class UiEnd extends ui.UiFile {
		// public black: eui.Rect;
		// public conBg: eui.Group;
		// public mcBg: com.ComMovieClip;
		// public bg: eui.Image;

		// public conLogo: eui.Group;
		// public logo: eui.Image;

		// public conBtn: eui.Group;
		// public replay: eui.Image;
		// public btn: eui.Image;

		// public conBody: eui.Group;
		public outCon: eui.Group;
		public conBg: eui.Group;
		public conBoy: eui.Group;
		public bg: eui.Image;
		public btnRe: eui.Image;
		public logo: eui.Image;
		public erase_mask: eui.Rect;
		public con_frame: eui.Group;
		public mask_bg: eui.Rect;
		public btnDownload: eui.Image;



		public bg_mask: eui.Group;
		public con: eui.Group;
		public boygirl: eui.Image;




		// public conParticles_0: eui.Group;
		// public conParticles_1: eui.Group;

		// private readonly bannerBefore: string = "epic_";
		// private readonly bannerMax: number = 3;


		public constructor() {
			super();
			this.skinName = skins.UiEnd;
		}

		/* =========== 框架结构代码-start =========== */
		/**
		 * 初始化
		 * @param {any[]} args open()传参会通过init()传过去
		 */
		protected init(...args: any[]) {
			// console.info("init", ...args);
		}

		/** 首次打开界面时调用 */
		protected load() {
			// console.info("load");

			// gComMgr.setItemAnchor(this.logo);
			// gComMgr.setItemAnchor(this.btn);
			// if (GameMgr.isShowReplay()) {
			// 	gComMgr.setItemAnchor(this.replay);
			// }

			// gComMgr.setItemAnchor(this.bg);
			// this.mcBg.open();
			// this.mcBg.setData([new data.McData("bg", 2, "ending_{1}_png", { backplay: true })]);
			// this.mcBg.interval = 400;

		}

		/** 每次打开界面都会调用 */
		protected start() {
			// console.info("start");

			this.bg.mask = this.bg_mask
			this.btnRe.visible = false
			this.btnDownload.visible = false
			this.logo.visible = false
			gTween.toScale(this.outCon, 1, 800, 1.8, egret.Ease.quadIn, void 0, {
				callback: () => {
					if (GameMgr.endType === gConst.endType.VICTORY) {
						let boyBone = new com.ComBones()
						boyBone.setData(this.conBoy, 'ppeople')
						boyBone.play('people', 0)
						boyBone.setPos({ x: void 0, y: 272 })

					} else {
						gTween.toTopShow(this.btnRe, 1200, 500, void 0, 1, egret.Ease.elasticOut)
						gTween.fadeIn(this.boygirl, 300)
					}

					gTween.toTopShow(this.btnDownload, 1200, 500, void 0, 1, egret.Ease.elasticOut, void 0, {
						callback: () => {
							gTween.yoyoBtn(this.btnDownload)
						}
					})
					gTween.toBottomShow(this.logo, 1200, 500, void 0, 1, egret.Ease.elasticOut)
				}
			})
			// gTween.toBottomShow(this)
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
			if (gConst.globalClick) {
				this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickInstall, this);
				// } else {
				// 	this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickInstall, this);
			}
			this.btnRe.addEventListener(egret.TouchEvent.TOUCH_TAP, this.restart, this)
			this.btnDownload.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickInstall, this)


			// this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
			// if (GameMgr.replayInstall()) {
			// 	this.replay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickInstall, this);
			// } else {
			// 	this.replay.once(egret.TouchEvent.TOUCH_TAP, this.clickReplay, this);
			// }

		}

		/** 移除事件 */
		protected removeEvent() {
			// console.info("removeEvent");
			if (gConst.globalClick) {
				this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickInstall, this);
				// } else {
				// 	this.btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickInstall, this);
			}
			this.btnRe.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.restart, this)
			this.btnDownload.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickInstall, this)
			// this.btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
			// this.replay.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickReplay, this);
			// this.replay.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickInstall, this);

		}

		/** 窗口大小改变时调用 */
		protected resizeView(): void {
			// console.info("resizeView", this.width, this.height);

			const baseScale: number = gConst.mobileByScale[GameMgr.screenType][GameMgr.mobileType];

			const conBg = this.conBg;
			const con = this.con
			const outCon = this.outCon
			const bg_mask = this.bg_mask
			const erase_mask = this.erase_mask
			const con_frame = this.con_frame
			const mask_bg = this.mask_bg

			conBg.scaleX = conBg.scaleY = Math.max(this.height / conBg.height, this.width / conBg.width);

			mask_bg.scaleX = this.width / mask_bg.width
			mask_bg.scaleY = this.height / mask_bg.height




			if (this.screenType == gConst.screenType.VERTICAL) {
				//竖屏

				con_frame.x = erase_mask.x = NaN
				con_frame.horizontalCenter = erase_mask.horizontalCenter = 0
				con_frame.scaleX = con_frame.scaleY = erase_mask.scaleX = erase_mask.scaleY = 0.7 * this.bg_mask.width / erase_mask.width
				con_frame.width = erase_mask.width + 30
				con_frame.height = erase_mask.height + 40

				con_frame.y = erase_mask.y = 0.45 * this.height;

				this.logo.x = this.btnRe.x = NaN
				this.btnRe.horizontalCenter = this.logo.horizontalCenter = this.btnDownload.horizontalCenter = 0

				this.btnRe.y = 0.8 * this.height
				this.btnDownload.y = this.btnRe.y + this.btnRe.height + 20


				switch (this.mobileType) {
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
				con_frame.x = erase_mask.x = 0.35 * this.width

				con_frame.scaleX = con_frame.scaleY = erase_mask.scaleX = erase_mask.scaleY = 0.6 * this.bg_mask.width / erase_mask.width
				con_frame.width = erase_mask.width + 30
				con_frame.height = erase_mask.height + 40
				con_frame.y = erase_mask.y = 0.5 * this.height

				this.logo.y = 0.2 * this.height

				this.btnDownload.horizontalCenter = this.btnRe.horizontalCenter = this.logo.horizontalCenter = NaN
				this.btnDownload.x = this.btnRe.x = this.logo.x = 0.8 * this.width
				this.btnRe.y = 0.6 * this.height
				this.btnDownload.y = this.btnRe.y + this.btnRe.height + 30


				switch (this.mobileType) {
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

			this.erase_mask.scaleX = this.erase_mask.scaleY = this.con_frame.scaleX = this.con_frame.scaleY = this.btnRe.scaleX = this.btnRe.scaleY = this.btnDownload.scaleX = this.btnDownload.scaleY = baseScale
			// this.con_logo.scaleX = this.con_logo.scaleY =
			// this.con.scaleX = this.con.scaleY = baseScale;
		}

		/** 屏幕横竖屏转换时调用 */
		protected rotateView(): void {
			// console.info("rotateView", this.screenType);

			if (this.screenType == gConst.screenType.VERTICAL) {
				//竖屏

			} else {
				//横屏
			}
		}
		/* =========== 框架结构代码-end =========== */


		/* =========== 业务代码-start =========== */
		private restart() {
			this.close()
			GameMgr.replay()

		}


		private toTopShow(item: egret.DisplayObject | egret.DisplayObjectContainer, callback?: Function, thisObj?: any, ...arg: any[]) {
			gTween.toTopShow(item, 800, void 0, void 0, 1, egret.Ease.elasticOut, void 0, {
				callback: () => {
					if (callback) {
						callback.call(thisObj, ...arg);
					};
				}
			});
		}

		private toBottomShow(item: egret.DisplayObject | egret.DisplayObjectContainer, callback?: Function, thisObj?: any, ...arg: any[]) {
			gTween.toBottomShow(item, 800, void 0, void 0, 1, egret.Ease.elasticOut, void 0, {
				callback: () => {
					if (callback) {
						callback.call(thisObj, ...arg);
					};
				}
			});
		}

		// private showLogo() {
		// 	this.conLogo.visible = true;
		// 	this.toBottomShow(this.logo/*, () => {
		// 		//发光
		// 		this.showLine();
		// 	}*/);
		// }

		// private showBody() {
		// 	this.toTopShow(this.conBody, this.showBtn, this);
		// }

		// private showBtn() {
		// 	this.conBtn.visible = true;
		// 	this.toTopShow(this.btn, gTween.yoyoBtn, gTween, this.btn);
		// 	if (GameMgr.isShowReplay()) {
		// 		this.toTopShow(this.replay);
		// 	}
		// }

		// private palyBg() {
		// 	this.cool.play(0);
		// }

		// private replayBg() {
		// 	this.cool.play(0);
		// }

		// private swingWord(item: egret.DisplayObject | egret.DisplayObjectContainer) {
		// 	gTween.swing(item, 3, 500, 0, void 0, { duration: 1000 });
		// }

		// private swingPaw(paw: egret.DisplayObject) {
		// 	gTween.swing(paw, 5, 1000, 0);
		// }

		// public showLogoBtn() {
		// 	this.showLogo();
		// 	this.showBtn();
		// 	// this.toBottomShow(this.replay);
		// }

		// private createPeople() {
		// 	if (GameMgr.endType == gConst.endType.VICTORY) {
		// 		const people: com.ComBones = new com.ComBones();
		// 		people.setData(this.conPeople, "ppeople");
		// 		this.conPeople.width = 255;
		// 		this.conPeople.height = 382;
		// 		people.setPos({ x: this.conPeople.width * .5, y: this.conPeople.height });
		// 		people.play("people", 0);
		// 	} else {
		// 		const people: eui.Image = new eui.Image("epic2_png");
		// 		this.conPeople.addChild(people);
		// 		gComMgr.setItemAnchor(people);
		// 	}
		// 	if (GameMgr.endType == gConst.endType.VICTORY) {
		// 		gSoundMgr.playEff("smsuccess");
		// 	} else {
		// 		gSoundMgr.playEff("smfail");
		// 	}
		// }

		/** 显示界面 */
		public show() {
			// this.bg.visible = true;
			// gTween.toSmallShow(this.conBg, 3, 500, 1, 1, void 0, void 0, {
			// 	callback: () => {
			// 		this.showLogoBtn();
			// 		this.createPeople();
			// 	}
			// });

			// gTween.fadeIn(this.bg, 500);
			// this.conBg.visible = true;
			// gTween.toScale(this.conBg, 1, 500, 3, void 0, void 0, {
			// 	callback: () => {
			// 		this.showLogoBtn();
			// 		// this.createPeople();
			// 	}
			// });
		}

		/** 其它元素展示 */
		public showOther() {
			// gSoundMgr.changeBg("bm_ending");

			this.gameEnd();
			// this.con.visible = true;

			//Banner
			// for (let i: number = 0; i < 3; i++) {
			// 	var banner: eui.Image = this["banner" + i] as eui.Image;
			// 	banner.alpha = 0;
			// 	banner.visible = true;
			// }

			// this.playBannering = false;
			// this.playBannerLeft();

			// var _y: number = this.g_banner.y;
			// egret.Tween.get(this.g_banner, { loop: true }).to({ y: _y + 20 }, 800).to({ y: _y }, 800);

			// this.replay.visible = GameMgr.isShowReplay();

			// this.cool.addEventListener(egret.Event.COMPLETE, this.replayBg, this);
			// this.palyBg();

			// this.showBlack();
			// this.showGold();
			// this.showTitle();
			// this.showBanner();

			// this.showLogoBtn();
			// this.showLogo();
			// this.showBody();
			// gTween.yoyoBtn(this.btn);

			// this.bg.visible = true;
			// gTween.fadeIn(this.conBg, 500, 1, void 0, void 0, { callback: this.showLogoBtn, thisObj: this });


		}

		/** 隐藏界面 */
		public hide() {


			// this.bg.visible = false;
			// // this.black.visible = false;
			// this.conBg.visible = false;
			// // this.con.visible = false;
			// this.conLogo.visible = false;
			// this.conBtn.visible = false;
			// this.btn.visible = false;
			// this.replay.visible = false;

		}

		// private clickBtn(event: egret.TouchEvent) {
		// 	Mapi.sendAction(5);
		// }

		/** 展示粒子 */
		// private showParticles() {
		// 	const particleId_0 = this.createParticles(this.conParticles_0, ["p_streamer1", "p_streamer2", "p_streamer3", "p_streamer4", "p_streamer5", "p_streamer6", "p_streamer7", "p_streamer8"], "p_streamer", void 0, false);
		// 	this.startParticle(particleId_0, 1000);
		// 	const particleId_1 = this.createParticles(this.conParticles_1, ["p_streamer1", "p_streamer2", "p_streamer3", "p_streamer4", "p_streamer5", "p_streamer6", "p_streamer7", "p_streamer8"], "p_streamer", void 0, false);
		// 	this.startParticle(particleId_1, 1000);
		// }
		/* =========== 业务代码-end =========== */
	}
}