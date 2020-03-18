namespace com {
	/**
	 * 面板组件
	 */
	export class ComPanel extends com.ComFile {
		public conBg: eui.Group;
		public floor: eui.Rect;

		public con: eui.Group;
		public bg: eui.Image;
		public conItems: eui.Group;
		public item0: com.ComItem;
		public item1: com.ComItem;
		public item2: com.ComItem;
		public conBar: eui.Group;
		public bar: eui.ProgressBar;
		public lock: eui.Image;

		private _barVal: number;
		private _headCnt: number;

		private vLayout: eui.VerticalLayout;
		private hLayout: eui.HorizontalLayout;

		private itemIdArr: number[] = [];

		public constructor() {
			super();
			this.skinName = skins.ComPanel;
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
			this.bar.maximum = GameMgr.getConfig("countdown") * 1000;
			gComMgr.setObjAnchor(this.bg);
		}

		/** 每次创建组件都会调用 */
		protected start() {
			// console.info("start");
			this.barVal = 0;
			this.headCnt = 0;
			this.initItems();
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
			const con = this.con;
			const bg = this.bg;
			const conItems = this.conItems;
			const conBar = this.conBar;
			const bar = this.bar;
			if (GameMgr.screenType == gConst.screenType.VERTICAL) {
				//竖屏
				con.width = bg.width;
				con.height = bg.height;

				bg.rotation = 0;
				bg.scaleX = 1;
				bg.x = bg.anchorOffsetX;
				bg.y = bg.anchorOffsetY;

				let hLayout: eui.HorizontalLayout = this.hLayout;
				if (!hLayout) {
					hLayout = this.hLayout = new eui.HorizontalLayout();
					hLayout.gap = -4;
					hLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
					hLayout.verticalAlign = egret.VerticalAlign.MIDDLE;
				}
				conItems.layout = hLayout; //水平布局

				conItems.right = NaN;
				conItems.verticalCenter = NaN;
				conItems.top = 28;
				conItems.horizontalCenter = 12;

				conBar.width = 545;
				conBar.height = 80;
				conBar.left = NaN;
				conBar.verticalCenter = NaN;
				conBar.bottom = 24;
				conBar.horizontalCenter = -2;
				bar.rotation = 0;
				bar.scaleX = 1;
				bar.x = 275;
				bar.y = 50;
			} else {
				//横屏
				con.width = bg.height;
				con.height = bg.width;

				bg.rotation = -90;
				bg.scaleX = -1;
				bg.x = bg.anchorOffsetY;
				bg.y = bg.anchorOffsetX;

				let vLayout: eui.VerticalLayout = this.vLayout;
				if (!vLayout) {
					vLayout = this.vLayout = new eui.VerticalLayout();
					vLayout.gap = 22;
					vLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
					vLayout.verticalAlign = egret.VerticalAlign.MIDDLE;
				}
				conItems.layout = vLayout; //垂直布局

				conItems.top = NaN;
				conItems.horizontalCenter = NaN;
				conItems.right = 20;
				conItems.verticalCenter = 0;

				conBar.width = 58;
				conBar.height = 550;
				conBar.bottom = NaN;
				conBar.horizontalCenter = NaN;
				conBar.left = 32;
				conBar.verticalCenter = -8;
				bar.rotation = -90;
				bar.scaleX = -1;
				bar.x = 25;
				bar.y = 280;
			}
		}
		/* =========== 框架结构代码-end =========== */


		/* =========== 业务代码-start =========== */
		private initItems() {
			let i: number = 0;
			let item: com.ComItem = this[`item${i}`];
			while (item) {
				item.open();
				i++;
				item = this[`item${i}`];
			}
		}

		public startBar() {
			const barMaxVal = this.bar.maximum;

			gTween.tween(this.bar, void 0, {
				props: { value: barMaxVal },
				duration: barMaxVal,
				call: {
					callback: () => {
						GameMgr.endType = gConst.endType.FAIL;
						GameMgr.gameview.openEndFail();
					}
				}
			});
		}

		public stopBar() {
			gTween.rmTweens(this.bar);
		}

		/** 获取进度条当前值 */
		public get barVal(): number {
			return this._barVal;
		}
		/** 设置进度条当前值 */
		public set barVal(_barVal: number) {
			if (_barVal > gConst.barMaxVal) {
				return;
			}
			this._barVal = _barVal;
			this.updateBar();
		}

		/** 更新进度条 */
		private updateBar() {
			const barVal: number = this.barVal;
			this.bar.value = barVal;

			const barMaxVal = gConst.barMaxVal;
			const headCnt = this.headCnt;
			const oneStarVal = Math.floor(barMaxVal / 3); //总共3个正确头像，点亮一个正确头像需要多少值
			if (headCnt >= 2) {
				if (barVal >= barMaxVal) {
					this.headCnt++;
				}
			} else {
				if (barVal >= oneStarVal * (headCnt + 1)) {
					this.headCnt++;
				}
			}
		}

		/** 获取正确头像数 */
		public get headCnt(): number {
			return this._headCnt;
		}
		/** 设置正确头像数 */
		public set headCnt(_headCnt: number) {
			if (_headCnt > 3) { //最多不超过3个正确头像
				return;
			}
			this._headCnt = _headCnt;
			this.updateHead();
		}

		/** 更新正确头像数 */
		private updateHead() {
			const headCnt: number = this.headCnt;

			let getHead: Function = (i: number): com.ComItem => {
				return this[`item${i}`];
			};

			if (headCnt <= 0) {
				let i: number = 0;
				let head: com.ComItem = getHead.call(this, i);
				while (head) {
					head.finish(false);
					head.initHead();
					i++;
					head = getHead.call(this, i);
				}
			} else {
				for (let i: number = 0; i < headCnt; i++) {
					const head: com.ComItem = getHead.call(this, i);
					if (!head) {
						continue;
					}
					if (head.finish()) {
						continue;
					}
					head.finish(true);
					head.bright();
				}
			}
		}
		/* =========== 业务代码-end =========== */
	}
}