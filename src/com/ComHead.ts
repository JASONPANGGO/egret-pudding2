namespace com {
	/**
	 * 头像组件
	 */
	export class ComHead extends com.ComFile {
		// public bg: eui.Image;
		public con: eui.Group;
		public head: eui.Image;
		public emoji: eui.Image;
		public chat: eui.Image;

		public constructor() {
			super();
			this.skinName = skins.ComHead;
		}

		/* =========== 框架结构代码-start =========== */
		/**
		 * 初始化
		 * @param {any[]} args 构建传参会通过init()传过去
		 */
		protected init(showBg: boolean) {
			// console.info("init", ...args);
			// this.showBg = showBg;
		}

		/** 首次创建组件时调用 */
		protected load() {
			// console.info("load");
			this.touchEnabled = this.touchChildren = false;
		}

		/** 每次创建组件都会调用 */
		protected start() {
			// console.info("start");
			// this.bg.visible = !!this.showBg;
			const emoji = this.emoji;
			const chat = this.chat;

			this.isShowChat = false;

			emoji.visible = false;
			chat.visible = false;

			this.playSmile();
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

			this.scaleX = this.scaleY = baseScale;

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

		/** 显示组件 */
		public show(aim?: boolean, callback?: Function, thisObj?: any, params?: any[]) {
			if (!aim) {
				super.show();
				if (callback) {
					callback.call(thisObj, ...params);
				}
				return;
			}
			gTween.fadeIn(this, 300, 1, void 0, { duration: 500 }, { callback: callback, thisObj: thisObj, params });
		}

		/** 隐藏组件 */
		public hide(aim?: boolean, callback?: Function, thisObj?: any, params?: any[]) {
			if (!aim) {
				super.hide();
				if (callback) {
					callback.call(thisObj, ...params);
				}
				return;
			}
			gTween.fadeOut(this, 300, 1, void 0, { duration: 500 }, { callback: callback, thisObj: thisObj, params });
		}
		/* =========== 框架结构代码-end =========== */


		/* =========== 业务代码-start =========== */
		/** 播放微笑状态 */
		playSmile() {
			this.chgEmoji(gConst.peopleFaceId.SMILE);
		}

		/** 播放开心表情 */
		playHappy() {
			this.chgEmoji(gConst.peopleFaceId.HAPPY);
		}

		/** 播放犯困表情 */
		playSleepy() {
			this.chgEmoji(gConst.peopleFaceId.SLEEPY);
		}

		/** 播放气愤表情 */
		playAngry() {
			this.chgEmoji(gConst.peopleFaceId.ANGRY);
		}

		private isShowChat: boolean;
		private showChated: boolean;

		/** 弹出对话 */
		showChat() {
			if (this.showChated) {
				return;
			}
			this.showChated = true;
			if (this.isShowChat) {
				return;
			}
			this.isShowChat = true;

			const chat = this.chat;

			gTween.showBubble(chat, 200, { orgS: 1, orgA: 1, ease: egret.Ease.cubicOut, wait: { duration: 2000 } },
				this.hideChat, this, void 0, { isFloat: true, orgY: 146 });
		}

		/** 隐藏对话 */
		hideChat() {
			if (!this.isShowChat) {
				return;
			}
			this.isShowChat = false;

			const chat = this.chat;

			gTween.hideBubble(chat, 200, { orgS: 1, orgA: 1 });
		}

		private emojiId: gConst.peopleFaceId;

		private chgEmoji(id: gConst.peopleFaceId) {
			if (this.emojiId == id) {
				return;
			}
			this.emojiId = id;

			const source = `ui${id}_emoji_png`;
			const emoji = this.emoji;

			gTween.toSmallHide(emoji, 200, 1, 1, egret.Ease.cubicIn, void 0, {
				callback: () => {
					emoji.source = source;
					gComMgr.setObjAnchor(emoji);
					gTween.toBigShow(emoji, 200, 1, 1, egret.Ease.cubicOut);
				}
			});
		}
		/* =========== 业务代码-end =========== */
	}
}