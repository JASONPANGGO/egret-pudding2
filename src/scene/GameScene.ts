namespace scene {
	/**
	 * 游戏场景
	 */
	export class GameScene extends eui.Component {

		// 背景
		public conBg: eui.Group;

		// 交互组件
		public con: eui.Group;

		// 灯
		public light_con: eui.Group;
		// 灯罩
		public light_up: eui.Image;
		// 灯柱
		public light_down: eui.Image;

		// 老人
		public oldman_con: eui.Group;
		public oldman_bed: eui.Image;
		public oldman: eui.Image;
		public oldman_cover: eui.Image;
		public cover_flip: eui.Image;
		public cover_flipping: eui.Image;


		// 男孩
		public pboy_con: eui.Group;
		public pboy_mc: com.ComMovieClip;

		// 女孩
		public pgirl_con: eui.Group;
		public pgirl_mc: com.ComMovieClip;

		// 进度条
		public progress_con: eui.Group;
		public progress_red: eui.Image;
		public progress_mask: eui.Rect;
		public progress_mask_con: eui.Group;
		public progress_girl_mc: com.ComMovieClip;
		public progress_tips: eui.Image;

		// 底部提示
		public tips: eui.Group;

		// 指引点
		public guide_1: eui.Group;
		public guide_2: eui.Group;
		public guide_3: eui.Group;

		// 角色移动定点 
		public POS_peopleInit: eui.Image;
		public POS_boyStart: eui.Image;
		public POS_girlWalk1: eui.Image;
		public POS_girlWalk2: eui.Image;
		public POS_boyLamp1: eui.Image;
		public POS_boyLamp2: eui.Image;
		public POS_peopleInit1: eui.Image;
		public POS_boyAction2: eui.Image;
		public POS_boyAction1: eui.Image;


		// 窗户
		public window1: eui.Image;
		public window2: eui.Image;


		private UiFirst: ui.UiFirst;
		private UiStart: ui.UiStart;
		private UiTran: ui.UiTran;
		private UiTranEnd: ui.UiTranEnd;
		private UiEnd: ui.UiEnd;
		private UiEndFail: ui.UiEndFail;
		// private UiChat: ui.UiChat;
		private UiCongrats: ui.UiCongrats;
		// private UiPeople: ui.UiPeople;

		// public comScene0: com.ComScene0;
		// public comScene1: com.ComScene1;
		// public comScene2: com.ComScene2;

		private chairOffsetX: number;
		// public header: com.ComHeader;

		public isLoadRes: boolean = null; //是否已loadRes()资源
		public isFirstOpen: boolean = true; //是否第一次打开场景

		private firstTouch: boolean = true;

		private paper_drop: com.ComMovieClip;

		private endDelay: number;
		private endToNoOperationDelay: number;

		private gridDic: Object = {};

		private skillProgress: number = 0;

		public constructor() {
			super();
			this.skinName = skins.GameScene;
			this.initBg();
		}

		/**
		 * 打开场景
		 * @param {any[]} args open()传参会通过init()传过去
		 */
		public open(...args: any[]) {
			const mainView = GameMgr.mainView;

			this.init(...args);
			if (this.isFirstOpen) {
				mainView.initResizeView(this.isFirstOpen);
			}
			this.createChildren2();

			if (!this.isLoadRes) {
				this.isLoadRes = true;
				this.load();
			}
			mainView.resizeView(void 0, this.isFirstOpen);
			// mainView.resizeView();
			GameMgr.stage.removeEventListener(egret.Event.RESIZE, mainView.resizeView, mainView);
			GameMgr.stage.addEventListener(egret.Event.RESIZE, mainView.resizeView, mainView);
			this.start();
			this.update();
			this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
			this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
			this.removeEvent();
			this.addEvent();
			if (this.isFirstOpen) {
				this.isFirstOpen = false;
			}
		}

		/** 结束界面 */
		public end() {
			const mainView = GameMgr.mainView;

			this.isLoadRes = false;
			GameMgr.stage.removeEventListener(egret.Event.RESIZE, mainView.resizeView, mainView);
			this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
			this.removeEvent();
			gComMgr.rmEvent(this);
			this.stop();
		}

		/* =========== 框架结构代码-start =========== */
		/**
		 * 初始化
		 * @param {any[]} args open()传参会通过init()传过去
		 */
		public init(...args: any[]) {
			// console.info("init", ...args);
		}

		/** 首次打开场景时调用 */
		protected load() {
			// console.info("load");
		}

		/** 每次打开场景都会调用 */
		protected start() {
			// console.info("start");

			this.openFirst();
			this.firstTouch = true;
			this.autoEnd();
			this.endToNoOperation();

			this.initProgress()
			this.tipsEnter()
			this.loadMovieClip()
			this.boyEnter()


		}

		/** 每次结束场景都会调用 */
		protected stop() {
			// console.info("stop");
		}

		/** 每帧都会调用 */
		protected update() {
			// console.info("update");
			// this.moveBg(this.bg_0);
			// this.moveBg(this.bg_1);
			// this.shadowBg();
		}

		/** 注册事件 */
		protected addEvent() {
			// console.info("addEvent");
			this.guide_1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.boyAction1, this)
			this.guide_2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.boyAction2, this)
			this.guide_3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.boyAction3, this)
			// GameMgr.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchStage, this);
			// GameMgr.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchStageStart, this);
			// GameMgr.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchStageMove, this);
			// GameMgr.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.touchStageEnd, this);
			// this.addEventListener(gConst.eventType.ONE_STEP_COMPLETE, this.openTran, this);
			// this.addEventListener(gConst.eventType.ONE_STEP_FAIL, this.playTranEnd, this);
			// this.addEventListener(gConst.eventType.UPDATE_GOLD, this.updateGold, this);
		}

		/** 移除事件 */
		protected removeEvent() {
			// console.info("removeEvent");
			this.guide_1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.boyAction1, this)
			this.guide_2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.boyAction2, this)
			this.guide_3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.boyAction3, this)
			// GameMgr.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchStage, this);
			// GameMgr.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchStageStart, this);
			// GameMgr.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchStageMove, this);
			// GameMgr.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchStageEnd, this);
			// this.removeEventListener(gConst.eventType.ONE_STEP_COMPLETE, this.openTran, this);
			// this.removeEventListener(gConst.eventType.ONE_STEP_FAIL, this.playTranEnd, this);
			// this.removeEventListener(gConst.eventType.UPDATE_GOLD, this.updateGold, this);
		}

		/** 游戏结束 */
		private gameEnd(): void {
			Mapi.gameEnd();
			// GameMgr.isEnd = true;

			this.UiFirst.updateDir(
				{
					horDir: gConst.direction.RIGHT_TOP,
					verDir: gConst.direction.CENTER_TOP
				}, {
					horDir: gConst.direction.RIGHT_TOP,
					verDir: gConst.direction.CENTER_BOTTOM
				}
			);

			this.UiFirst.gameEnd();
		}

		/**
		 * 创建组件接口
		 * @description 每次创建、重玩时调用
		 */
		public createChildren2(): void {
		}

		/** 窗口大小改变时调用 */
		public resizeView(): void {
			// console.info("resizeView", this.width, this.height, GameMgr.screenType, GameMgr.mobileType);
			this.dispatchEventWith(gConst.eventType.RESIZE_VIEW);

			const baseScale: number = gConst.mobileByScale[GameMgr.screenType][GameMgr.mobileType];
			this.conBg.scaleX = this.conBg.scaleY = this.width / this.con.width

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
		public rotateView() {
			// console.info("GameScene.rotateView", GameMgr.screenType);
			this.dispatchEventWith(gConst.eventType.ROTATE_VIEW);

			if (GameMgr.screenType == gConst.screenType.VERTICAL) {
				//竖屏
			} else {
				//横屏
			}
			// this.updateHandScreen();
		}

		/** 重玩游戏 */
		public replay(): void {
			this.destroy();
			GameMgr.init();
			GameMgr.gameview = new scene.GameScene();
			GameMgr.gameview.open();

			if (this.parent) {
				this.parent.addChild(GameMgr.gameview);
				this.parent.removeChild(this);
			}
			Mapi.gameRetry();
		}

		/** 销毁 */
		private destroy() {
			if (this.UiFirst) {
				this.UiFirst.destroy();
			}
			if (this.UiStart) {
				this.UiStart.destroy();
			}
			if (this.UiTran) {
				this.UiTran.destroy();
			}
			if (this.UiTranEnd) {
				this.UiTranEnd.destroy();
			}
			if (this.UiEnd) {
				this.UiEnd.destroy();
			}
			if (this.UiEndFail) {
				this.UiEndFail.destroy();
			}
			// if (this.UiChat) {
			// 	this.UiChat.destroy();
			// }
			if (this.UiCongrats) {
				this.UiCongrats.destroy();
			}
			// if (this.UiPeople) {
			// 	this.UiPeople.destroy();
			// }

			this.removeEvent();
		}

		/** 点击下载(用户点击下载，调用SDK函数) */
		public clickInstall(event?: egret.TouchEvent): void {
			if (event) {
				event.stopPropagation();
			}
			Mapi.install();
		}

		/** 自动结束 */
		private autoEnd() {
			const autoEndTime: number = GameMgr.getConfig("autoEndTime");
			if (autoEndTime != void 0 && autoEndTime > 0) {
				egret.clearTimeout(this.endDelay);
				this.endDelay = egret.setTimeout(this.openEnd, this, autoEndTime * 1000);
			}
		}

		/** 玩家多久未操作，结束游戏 */
		private endToNoOperation() {
			if (GameMgr.isEnd) {
				return;
			}
			if (!gGuideMgr.lastGuideFinish()) {
				return;
			}
			const endToNoOperationTimer: number = gConst.endToNoOperationTimer;
			if (endToNoOperationTimer != void 0 && endToNoOperationTimer > 0) {
				egret.clearTimeout(this.endToNoOperationDelay);
				this.endToNoOperationDelay = egret.setTimeout(this.openEndFail, this, endToNoOperationTimer);
			}
		}
		/* =========== 框架结构代码-end =========== */

		/* =========== 业务代码-start =========== */
		private extraBgS: number;
		private camera: util.CameraMgr;
		private initBg() {
			const con = this.con;
			const conBg = this.conBg;
			// const conScene = this.conScene;

			this.camera = new util.CameraMgr(conBg);
			// gComMgr.setObjSize(conScene, true);
			// this.camera = new util.CameraMgr(conScene);
		}

		private tipsEnter() {
			gTween.toTopShow(this.tips, 800, 300, void 0, 1, egret.Ease.quadOut)

		}

		private loadMovieClip() {

			this.pboy_mc.open()
			this.pboy_mc.bm.horizontalCenter = 0
			this.pboy_mc.bm.bottom = 0
			this.pboy_mc.setData([new data.McData('boy_walk', 4, 'pboy{1}_png', { minBit: 2 }),
			new data.McData('boy_shake', 2, 'pboy{1}_png', { firstIndex: 5, minBit: 2 }),
			new data.McData('boy_go', 1, 'pboy0{1}_png', { firstIndex: 7 }),
			new data.McData('boy_lamp', 1, 'pboy0{1}_png', { firstIndex: 8 }),
			new data.McData('boy_fail_lamp', 1, 'pboy{1}_png', { firstIndex: 11 }),
			new data.McData('boy_fail_bed', 1, 'pboy0{1}_png', { firstIndex: 9 }),
			new data.McData('boy_success', 1, 'pboy{1}_png', { firstIndex: 10 }),
			new data.McData('boy_crawl_right', 1, 'pboy{1}_png', { firstIndex: 12 }),
			new data.McData('boy_crawl_left', 1, 'pboy{1}_png', { firstIndex: 13 })])


			this.progress_girl_mc.open()
			this.progress_girl_mc.setData([new data.McData('progress', 2, 'psmallgirl{1}_png'), new data.McData('progess_start', 1, 'psmallgirl{1}_png')])
			this.progress_girl_mc.width = 95
			this.progress_girl_mc.anchorOffsetY = 20
			this.progress_girl_mc.gotoAndPlay('progess_start', 1)

			this.pgirl_mc.open()
			this.pgirl_mc.bm.horizontalCenter = 0
			this.pgirl_mc.bm.bottom = 0
			this.pgirl_mc.setData([new data.McData('girl_walk', 4, 'pgirl0{1}_png'),
			new data.McData('girl_shake', 2, 'pgirl0{1}_png', { firstIndex: 4 }),
			new data.McData('girl_find', 1, 'pgirl0{1}_png', { firstIndex: 6 })])
		}

		private boyEnter() {
			const enterPoint = this.POS_boyStart
			const initPoint = this.POS_peopleInit
			this.pboy_mc.interval = 180
			this.pboy_mc.gotoAndPlay('boy_walk', 1)
			gTween.toMove(this.pboy_con, enterPoint.x, enterPoint.y, { x: 1000, y: 500 }, initPoint.x, initPoint.y, { x: egret.Ease.quadOut, y: egret.Ease.quadOut }, void 0, {
				callback: () => {
					this.showGuide()
					this.progressStart()
					this.boyShakeHead()
				}
			})
		}

		private playerAction: boolean = false
		private boyShakeHead() {
			this.pboy_mc.interval = 500
			this.pboy_mc.gotoAndPlay('boy_shake')
			let shakeSpeedUp = egret.setInterval(() => {
				if (this.pboy_mc.interval <= 200 || this.playerAction) {
					egret.clearInterval(shakeSpeedUp)
				} else {
					this.pboy_mc.interval -= 50
				}
			}, this, 1000)
		}

		private initProgress() {
			this.progress_red.mask = this.progress_mask
			this.progress_mask_con.width = 0

			egret.setTimeout(() => {
				gTween.toBigShow(this.progress_tips, 300, void 0, void 0, egret.Ease.bounceOut, void 0, {
					callback: () => {
						gTween.loopFloat(this.progress_tips)
					}
				})
			}, this, 500)
		}

		private progressStart() {
			gTween.toWidthChange(this.progress_mask_con, 15 * 1000, this.progress_red.width, void 0, void 0, void 0, {
				callback: () => {
					if (this.playerAction) return
					gSoundMgr.playEff('smtimeup')
					this.pgirl_con.x = this.POS_peopleInit1.x
					this.pgirl_con.y = this.POS_peopleInit1.y
					this.girlWalkTo({ x: this.POS_girlWalk2.x, y: this.POS_girlWalk2.y }, () => {
						this.girlFind()
						this.boyFound('boy_fail_lamp')
					})
				}
			})
			this.progress_girl_mc.interval = 200
			this.progress_girl_mc.gotoAndPlay('progress')
			egret.setTimeout(() => {
				let st1 = new util.ShakeTool()
				let st2 = new util.ShakeTool()
				st1.shakeObj(this.progress_girl_mc, 7 * 1000, 15, 5, 5)
				st2.shakeObj(this.progress_tips, 7 * 1000, 15, 5, 5)
			}, this, 8 * 1000)

		}



		private progressStop() {
			gTween.rmTweens(this.progress_mask_con)
			this.progress_girl_mc.gotoAndStop('progress', 1)
			this.removeEvent()
			this.hideGuide()
			this.playerAction = true
		}

		private

		// 床尾
		private boyAction1(event: egret.TouchEvent) {
			gSoundMgr.playEff('smclick')
			this.progressStop()
			const boyAction1 = this.POS_boyAction1
			const guidePoint = this.guide_1

			this.pboy_con.scaleX = -1
			this.pboy_mc.gotoAndPlay('boy_walk')
			gTween.toMoveX(this.pboy_con, boyAction1.x, 300, void 0, void 0, void 0, {
				callback: () => {
					this.pboy_mc.gotoAndPlay('boy_go')
					gTween.toMove(this.pboy_con, guidePoint.x - 100, guidePoint.y + 40, { x: 300, y: 300 }, void 0, void 0, void 0, { duration: 400 }, {
						callback: () => {
							this.pboy_con.scaleX = 1
							let boy_gp = gComMgr.toGlobal(this.pboy_con)
							let boy_lp = gComMgr.toLocal(this.oldman_con, boy_gp.x, boy_gp.y, boy_gp)
							this.oldman_con.addChild(this.pboy_con)
							this.oldman_con.setChildIndex(this.pboy_con, 3)
							this.pboy_con.x = boy_lp.x
							this.pboy_con.y = boy_lp.y

							this.pboy_mc.gotoAndPlay('boy_crawl_right')
							gTween.toMoveX(this.pboy_con, this.pboy_con.x + 80, 300, void 0, void 0, void 0, {
								callback: () => {
									this.girlWalkTo({ x: this.POS_girlWalk2.x, y: this.POS_girlWalk2.y }, () => {
										this.girlShake(() => {
											this.pgirl_mc.interval = 180
											this.pgirl_mc.gotoAndPlay('girl_walk')
											this.pgirl_con.scaleX = 1
											gSoundMgr.playEff('smrun')
											gTween.toMoveX(this.pgirl_con, this.POS_peopleInit1.x, 4 * 180, void 0, void 0, void 0, {
												callback: () => {
													this.pboy_con.x += 140
													this.pboy_mc.gotoAndPlay('boy_success')
													this.oldman_cover.visible = false
													this.cover_flipping.visible = true
													gTween.toMove(this.cover_flipping, this.cover_flipping.x - 50, this.cover_flipping.y - 50, { x: 300, y: 300 }, void 0, void 0, void 0, { duration: 300 }, {
														callback: () => {
															this.cover_flipping.visible = false
															this.cover_flip.visible = true
															this.boySuccess()
														}
													})
												}
											})
										})
									})
								}
							})
						}
					})
				}
			})


		}

		// 床头
		private boyAction2(event: egret.TouchEvent) {
			gSoundMgr.playEff('smclick')
			this.progressStop()
			const boyAction2 = this.POS_boyAction2
			const guidePoint = this.guide_2

			this.pboy_mc.gotoAndPlay('boy_walk')
			gTween.toMoveX(this.pboy_con, boyAction2.x, 300, void 0, void 0, void 0, {
				callback: () => {
					this.pboy_mc.gotoAndPlay('boy_go')
					gTween.toMove(this.pboy_con, guidePoint.x, guidePoint.y + 50, { x: 300, y: 300 }, void 0, void 0, void 0, { duration: 400 }, {
						callback: () => {

							let boy_gp = gComMgr.toGlobal(this.pboy_con)
							let boy_lp = gComMgr.toLocal(this.oldman_con, boy_gp.x, boy_gp.y, boy_gp)
							this.oldman_con.addChild(this.pboy_con)
							this.oldman_con.setChildIndex(this.pboy_con, 3)
							this.pboy_con.x = boy_lp.x
							this.pboy_con.y = boy_lp.y


							this.pboy_mc.gotoAndPlay('boy_crawl_left')
							gTween.toMoveX(this.pboy_con, this.pboy_con.x - 80, 300, void 0, void 0, void 0, {
								callback: () => {
									this.girlWalkTo({ x: this.POS_girlWalk2.x, y: this.POS_girlWalk2.y }, () => {
										this.girlShake(() => {
											this.girlFind()
											this.coverFlip()
											this.pboy_con.rotation = -90
											this.boyFound('boy_fail_bed')
										})
									})
								}
							})
						}
					})
				}
			})

		}

		// 台灯
		private boyAction3(event: egret.TouchEvent) {
			gSoundMgr.playEff('smclick')
			this.progressStop()
			const boyLampPoint1 = this.POS_boyLamp1
			const boyLampPoint2 = this.POS_boyLamp2

			this.pboy_mc.gotoAndPlay('boy_go')
			gTween.toMove(this.pboy_con, boyLampPoint1.x, boyLampPoint1.y, { x: 500, y: 500 }, void 0, void 0, { x: egret.Ease.quadOut, y: egret.Ease.quadOut }, void 0, {
				callback: () => {
					this.con.setChildIndex(this.pboy_con, 0)
					this.pboy_con.y = boyLampPoint2.y
					this.pboy_mc.gotoAndPlay('boy_lamp')
					this.light_up.y = -100
					egret.setTimeout(() => {
						this.girlWalkTo(this.POS_girlWalk1, () => {
							this.girlShake(() => {
								this.girlFind()
								this.boyFound('boy_fail_lamp')
								this.lampMove()
							})
						})
					}, this, 1000)
				}
			})
		}

		private boySuccess() {
			egret.setTimeout(() => {
				this.openCongrats()
			}, this, 800)
			gTween.toBottomHide(this.tips, 300)
		}

		private coverFlip() {
			this.oldman_cover.visible = false
			this.cover_flip.visible = true
			this.oldman.y -= 30
			this.oldman.source = 'poldman2_png'
			this.pboy_con.y -= 70
			this.pboy_con.x += 50

		}

		// 获取男孩相对女孩的方位，true为右，false为左
		private getBoyPOSbyGirl(): boolean {
			return (this.pboy_con.x - this.pgirl_con.x) > 0
		}

		private girlWalkTo(POS: { x: number, y: number }, callback: Function) {
			gSoundMgr.playEff('smrun')
			if (!this.getBoyPOSbyGirl()) {
				this.pgirl_con.scaleX = -1
			} else {
				this.pgirl_con.scaleX = 1
			}
			this.pgirl_mc.interval = 180
			this.pgirl_mc.gotoAndPlay('girl_walk')
			gTween.toMoveX(this.pgirl_con, POS.x, 4 * 180, void 0, void 0, void 0, {
				callback: callback
			})
		}

		private girlShake(callback: Function) {
			if (!this.getBoyPOSbyGirl()) {
				this.pgirl_con.scaleX = -1
			} else {
				this.pgirl_con.scaleX = 1
			}
			this.pgirl_mc.interval = 150
			this.pgirl_mc.gotoAndPlay('girl_shake', 3)
			egret.setTimeout(() => {
				callback()
			}, this, 2 * 3 * 150)
		}

		private girlFind() {
			// egret.setTimeout(() => {

			if (this.getBoyPOSbyGirl()) {
				this.pgirl_con.scaleX = -1
			} else {
				this.pgirl_con.scaleX = 1
			}
			this.pgirl_mc.interval = 500
			this.pgirl_mc.gotoAndPlay('girl_find', 1)

			egret.setTimeout(() => {
				this.openEnd()
			}, this, 800)
			gTween.toBottomHide(this.tips, 300)
			// }, this, 1300)
		}

		private boyFound(mcName: string) {
			if (this.getBoyPOSbyGirl()) {
				this.pboy_con.scaleX = -1
			} else {
				this.pboy_con.scaleX = 1
			}
			let st = new util.ShakeTool()
			st.shakeObj(this.pboy_con, 300, 10, 10, 10)
			this.pboy_mc.scaleX = this.pboy_mc.scaleY = 1.1
			this.pboy_mc.gotoAndPlay(mcName)
		}

		private lampMove() {
			this.light_up.x = -40
			this.light_up.y = -130
			this.light_up.rotation = -30
		}

		// private lookYRatio: number;
		// private lookXRatio: number;

		// private initCamera(isAni: boolean = true) {
		// 	if (!this.camera) {
		// 		return;
		// 	}

		// 	const bg = this.bg;

		// 	// const passId = GameMgr.passId;
		// 	// const base: eui.Image = this[`base${passId}`];
		// 	// if (!base) {
		// 	// 	this.openEnd();
		// 	// 	return;
		// 	// }
		// 	// const parent = base.parent;
		// 	// if (!parent) {
		// 	// 	this.openEnd();
		// 	// 	return;
		// 	// }

		// 	const baseScale: number = gConst.mobileByScale[GameMgr.screenType][GameMgr.mobileType];

		// 	this.lookXRatio = .5;
		// 	const lookX = bg.x - bg.anchorOffsetX + gMath.keepDecimal(bg.width * bg.scaleX * this.lookXRatio, 0);
		// 	this.lookYRatio = GameMgr.screenType == gConst.screenType.VERTICAL ? .5 : .55;
		// 	if (GameMgr.mobileType == gConst.mobileType.IPAD) {
		// 		this.lookYRatio = .58;
		// 	}
		// 	const lookY = bg.y - bg.anchorOffsetY + gMath.keepDecimal(bg.height * bg.scaleY * this.lookYRatio, 0);

		// 	// if (GameMgr.screenType == gConst.screenType.VERTICAL) {
		// 	// 	//竖屏
		// 	// 	if (!GameMgr.isEnd) {
		// 	// 		if (GameMgr.passId == 6) {
		// 	// 			this.camera.upCamera(isAni, { x: (1536 / 2 + 300) * this.extraBgS, y: 864 * 2 / 3 * this.extraBgS });
		// 	// 		} else {
		// 	// 			this.camera.upCamera(isAni, { x: (1536 / 2 + 50) * this.extraBgS, y: 864 * 2 / 3 * this.extraBgS });
		// 	// 		}
		// 	// 	} else {
		// 	// 		this.camera.upCamera(isAni, { x: (1536 / 8) * this.extraBgS, y: 864 / 4 * this.extraBgS });
		// 	// 	}
		// 	// } else {
		// 	// 	//横屏
		// 	// 	if (!GameMgr.isEnd) {
		// 	// 		this.camera.upCamera(isAni, { x: (1536 / 2 + 240) * this.extraBgS, y: (864 / 2 + 200) * this.extraBgS }, 1.2);
		// 	// 	} else {
		// 	// 		this.camera.upCamera(isAni, { x: 1536 / 4 * this.extraBgS, y: 864 / 4 * this.extraBgS }, 1.2);
		// 	// 	}
		// 	// }
		// 	this.camera.upCamera(isAni, { x: lookX * this.extraBgS, y: lookY * this.extraBgS });
		// }

		// private createHouse(parent: egret.DisplayObjectContainer, id: number, exitAim?: { aimType?: number, wait?: number, time?: number } | boolean): com.ComBones {
		// 	const resName = gConst.itemIdByName[id];
		// 	if (!resName) {
		// 		return;
		// 	}
		// 	const house = new com.ComBones();
		// 	house.setData(parent, resName, exitAim, "Armature");
		// 	house.create();
		// 	return house;
		// }

		// private moveBg(bg: eui.Image) {
		// 	bg.y--;
		// 	if (bg.y <= -1334) {
		// 		bg.y = 1334;
		// 	}
		// }

		// private shadowBg() {
		// 	let diffA: number = gMath.getRandomAnswer(0.01, -0.01);
		// 	let realA: number = this.con_bg.alpha + diffA;
		// 	if (realA < 0.1 || realA > 0.7) {
		// 		diffA *= -1;
		// 		realA = this.con_bg.alpha + diffA;
		// 	}
		// 	this.con_bg.alpha = realA;
		// }

		private isGameStar: boolean;
		private gameStared: boolean;

		private gameStart() {
			// console.info("gameStart");
			// if (this.gameStared) {
			// 	return;
			// }
			this.gameStared = true;
			this.openStarted = false;

			// this.UiFirst.conBtn.visible = true;
			// this.black.visible = false;
			// gSoundMgr.playEff("smbar");
			this.showGuide();
			// this.showHand();
			if (GameMgr.firstToMaxLv) {
				GameMgr.auto = true;
			}

			// const time: number = this.firstTouch ? gConst.firstGuideTimer : gConst.afterGuideTimer;
			// this.showHandsDelay = egret.setTimeout(this.showHands, this, time);
			// this.showHands();
		}

		private hasUiFirstLogo() {
			return this.UiFirst && this.UiFirst.parent && this.UiFirst.conLogo && this.UiFirst.conLogo.parent
		}

		private readonly goldSpace = 10;

		private resizeUiFirst(event: egret.Event) {
			// const conLogo = this.UiFirst.conLogo;
			// const conGold = this.conGold;

			// if (!conGold || !conGold.parent) {
			// 	return;
			// }

			// let pos = gComMgr.toGlobal(conLogo);
			// pos = gComMgr.toLocal(conGold.parent, pos.x, pos.y);
			// conGold.x = pos.x;
			// conGold.y = pos.y + (conLogo.height - conLogo.anchorOffsetY) * conLogo.scaleY
			// 	+ conGold.anchorOffsetY * conGold.scaleY + this.goldSpace;
		}


		/** 打开顶层页面 */
		private openFirst() {
			this.UiFirst = gUiMgr.create(ui.UiFirst) as ui.UiFirst;
			this.UiFirst.addEventListener(gConst.eventType.RESIZE_VIEW, this.resizeUiFirst, this);
			this.UiFirst.open(
				// logo
				{
					horDir: gConst.direction.RIGHT_TOP,
					verDir: gConst.direction.CENTER_TOP
				}, {
					// 下载
					horDir: gConst.direction.RIGHT_BOTTOM,
					verDir: gConst.direction.CENTER_BOTTOM
				}
			);
		}

		/** 关闭顶层页面 */
		private closeFirst() {
			if (!this.UiFirst) {
				return;
			}
			this.UiFirst.removeEventListener(gConst.eventType.RESIZE_VIEW, this.resizeUiFirst, this);
			this.UiFirst.close();
		}

		private openStarted: boolean;

		/** 打开启动页面 */
		private openStart(chatId: number = 1) {
			if (this.openStarted) {
				return;
			}
			this.openStarted = true;
			this.hideGuide();
			this.UiStart = gUiMgr.create(ui.UiStart) as ui.UiStart;
			// this.UiStart.once(gConst.eventType.IN_COMPLETE, () => {
			// 	this.isGameStar = true;
			// }, this);
			// this.UiStart.addEventListener(gConst.eventType.TOUCH_TAP, this.clickItem, this);
			this.UiStart.once(gConst.eventType.CLOSE, this.gameStart, this);
			this.UiStart.open(chatId);

			if (chatId == 3) {
				return;
			}
			if (GameMgr.screenType == gConst.screenType.HORIZONTAL) {
				// this.conGold.visible = false;

				const UiFirst = this.UiFirst;
				let conLogo: eui.Group;
				if (UiFirst) {
					conLogo = UiFirst.conLogo;
				}

				if (conLogo) {
					conLogo.visible = false;
				}
			}
		}

		/** 关闭启动页面 */
		private closeStart() {
			// if (!this.openStarted) {
			// 	return;
			// }
			// this.openStarted = false;
			if (!this.UiStart) {
				return;
			}
			this.UiStart.hide(void 0, true);
		}

		/** 关闭过场页面 */
		private closeTran() {
			if (!this.UiTran) {
				return;
			}
			this.UiTran.close();
		}

		private openChatDelay: number;
		private isOpenChat: boolean = true;

		/** 打开恭喜页面 */
		private openCongrats() {
			gSoundMgr.playEff('smsuccess')
			this.sceneFadeOut()
			// console.info("openCongrats");
			// gTween.fadeIn(this.black, 300, 0.5);
			this.UiCongrats = gUiMgr.create(ui.UiCongrats) as ui.UiCongrats;
			// this.UiCongrats.once(gConst.eventType.CLOSE, this.nextPass, this);
			// this.UiCongrats.once(gConst.eventType.GAME_END, this.gameEnd, this);
			this.UiCongrats.open();
		}

		/** 关闭恭喜页面 */
		private closeCongrats() {
			if (!this.UiCongrats) {
				return;
			}
			this.UiCongrats.close();
		}


		/** 打开结束过场页面 */
		private openTranEnd(/*data: { isReplay: boolean }*/) {
			if (GameMgr.isEnd) {
				return;
			}
			this.openEnd();

			// this.UiTranEnd = gUiMgr.create(ui.UiTranEnd) as ui.UiTranEnd;
			// this.UiTranEnd.once(gConst.eventType.IN_COMPLETE, this.nextScene, this);
			// this.UiTranEnd.once(gConst.eventType.SHOW_CURTAIN_FULL, this.showEnd, this);
			// this.UiTranEnd.once(gConst.eventType.CLOSE, this.openEnd, this);
			// const data: { isReplay: boolean } = event ? event.data : void 0;
			// this.UiTranEnd.open(/*data*/);

			this.UiStart.once(gConst.eventType.SHOW_CURTAIN_FULL, this.showEnd, this);
			this.UiStart.showParticles();
		}

		/** 关闭结束过场页面 */
		private closeTranEnd() {
			if (!this.UiTranEnd) {
				return;
			}
			this.UiTranEnd.close();
		}

		private sceneFadeOut() {
			gTween.fadeOut(this.con, 300)
			gTween.fadeOut(this.progress_con, 300)
			gTween.fadeOut(this.window1, 300)
			gTween.fadeOut(this.window2, 300)
			this.progress_tips.visible = false

		}

		/** 打开结束界面 */
		private openEnd(isShowEnd: boolean = true) {
			// console.info("openEnd");
			gSoundMgr.playEff('smfail')
			this.sceneFadeOut()
			this.closeFirst()
			egret.clearTimeout(this.endDelay);
			egret.clearTimeout(this.endToNoOperationDelay);
			if (GameMgr.isEnd) {
				return;
			}
			GameMgr.isEnd = true;
			this.hideGuide();
			// this.hideHands();

			this.removeEvent();
			// GameMgr.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, Mapi.install, Mapi);

			// this.closePeople();
			// this.closeStart();

			this.UiEnd = gUiMgr.create(ui.UiEnd) as ui.UiEnd;
			this.UiEnd.hide();
			this.UiEnd.open();
			egret.setTimeout(this.showEnd, this, 500);

			// GameMgr.endType = gConst.endType.VICTORY;
			// this.showHead();
			// this.comPanel.stopBar();
			// this.allStopPlay();

			Mapi.gameEnd();

			if (isShowEnd) {
				this.showEnd();
			}
		}

		/** 显示结束界面 */
		public showEnd() {
			// console.info("showEnd");

			// this.UiFirst.gameEnd();
			// this.closeFirst();
			// this.closeStart();

			// const comGold = this.comGold;
			// gComMgr.fadeOutDestory(comGold, 300, () => {
			// 	gComMgr.destory(this.conGold);
			// });

			// this.header.destroy();
			// this.nav.destroy();
			// gComMgr.destory(this.con);
			// gComMgr.destory(this.conBg);
			// gComMgr.fadeOutDestory(this.con, 300, () => {
			// 	gComMgr.destory(this.conBg);
			// });
			// gComMgr.destory(this.hand);
			// gComMgr.fadeOutDestory(this.conWin);
			// gComMgr.fadeOutDestory(this.conBody, 300, () => {
			// 	this.lamp.destroy();
			// 	this.oldMan.destroy();
			// });
			// this.progress.destroy(true);
			// this.closeChat();
			// this.closePeople();
			// this.UiEnd.hide();
			// this.UiEnd.open();
			// this.UiEnd.show();
			// egret.setTimeout(this.UiEnd.show, this.UiEnd, 500);

			// if (GameMgr.endType == gConst.endType.VICTORY) {
			// 	gSoundMgr.playEff("sm_win");
			// } else {
			// 	gSoundMgr.playEff("sm_fail");
			// }
			// this.openStart(3);
			this.gameEnd();

			this.showEndOther();
		}

		/** 结束界面其它元素展示 */
		public showEndOther() {
			// console.info("showEndOther");
			if (!this.UiEnd) {
				return;
			}
			this.UiEnd.showOther();
		}

		/** 关闭结束界面 */
		private closeEnd() {
			if (!this.UiEnd) {
				return;
			}
			this.UiEnd.close();
		}

		/** 打开结束界面（失败） */
		public openEndFail() {
			// console.info("openEndFail");
			// egret.clearTimeout(this.endDelay);
			// egret.clearTimeout(this.endToNoOperationDelay);
			// // if (GameMgr.isEnd) {
			// // 	return;
			// // }
			// GameMgr.isEnd = true;
			// this.hideGuide();

			// this.removeEvent();

			// this.UiEndFail = gUiMgr.create(ui.UiEndFail) as ui.UiEndFail;
			// this.UiEndFail.hide();
			// this.UiEndFail.open();

			// this.showEndFail();

			this.openEnd();
		}

		/** 显示结束界面（失败） */
		public showEndFail() {
			// console.info("showEndFail");
			// this.UiFirst.gameEnd();
			// this.closeFirst();
			// this.header.destroy();
			// gComMgr.rmObj(this.bg_0);
			// gComMgr.rmObj(this.bg_1);
			// gComMgr.rmObj(this.con_tree);
			// gComMgr.rmObj(this.bg_2);
			// this.boy.destroy();
			// this.girl.destroy();
			// gComMgr.rmObj(this.con);
			// gComMgr.rmObj(this.g_paper);
			// this.closeChat();

			// if (this.UiChat) {
			// 	this.UiChat.hideChat();
			// }
			this.UiEndFail.show();

			this.UiFirst.updateDir(
				{
					horDir: gConst.direction.RIGHT_TOP,
					verDir: gConst.direction.CENTER_TOP
				}, {
					horDir: gConst.direction.RIGHT_TOP,
					verDir: gConst.direction.CENTER_TOP
				}
			);

			this.showEndFailOther();
		}

		/** 结束界面（失败）其它元素展示 */
		public showEndFailOther() {
			// console.info("showEndFailOther");
			if (!this.UiEndFail) {
				return;
			}
			this.UiEndFail.showOther();
		}

		/** 关闭结束界面（失败） */
		private closeEndFail() {
			if (!this.UiEndFail) {
				return;
			}
			this.UiEndFail.close();
		}

		// private showSceneed0: boolean;


		private hand: com.ComBones;


		private guide_pos: eui.Image; //引导的点
		private guide: com.ComGuide; //引导组件
		private showGuided: boolean; //引导显示状态
		private showMsked: boolean; //引导遮罩显示状态
		private showHeaded: boolean; //引导头像显示状态
		private showBubbled: boolean; //引导冒泡显示状态

		// private light: com.ComLight;
		// private showLightDelay: number;
		// private showMskDelay: number;
		// private showHeadDelay: number;
		// private showBubbleDelay: number; 

		private currGuidePropsType: gConst.propsType;

		private guideBone1: com.ComBones
		private guideBone2: com.ComBones
		private guideBone3: com.ComBones
		private createGuide() {
			for (let i = 1; i < 4; i++) {
				let guideBone: com.ComBones = this['guideBone' + i]
				let guidePoint: eui.Group = this['guide_' + i]
				guideBone = new com.ComBones()
				guideBone.setData(guidePoint, 'ppeople')
				guideBone.show()
				guideBone.play('guide', 0)
			}
		}

		/** 显示引导 */
		public showGuide() {
			egret.setTimeout(() => {
				this.createGuide()
			}, this, 2000)

		}

		/** 隐藏引导 */
		public hideGuide() {
			// this.firstTouch = false;
			// // this.closeChat();
			// // egret.clearTimeout(this.showLightDelay);
			// // if (this.light) {
			// // 	this.light.hide();
			// // }

			// if (!this.guide) {
			// 	return;
			// }
			// if (!this.showGuided) {
			// 	return;
			// }
			// this.showGuided = false;
			// this.guide.over();
			for (let i = 1; i < 4; i++) {
				gTween.fadeOut(this['guide_' + i], 200)
			}
			// const target1: com.ComHouse = this.getCurrHouse();
			// let propsType = target1 && target1.propsType ? target1 && target1.propsType : this.currGuidePropsType;
			// gGuideMgr.updateFirstGuideByProps(propsType)
		}


		/* =========== 业务代码-end =========== */
	}
}