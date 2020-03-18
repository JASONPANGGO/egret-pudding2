namespace com {
	/**
	 * 选项组件
	 */
	export class ComItem extends com.ComFile {
		public con: eui.Group;
		public item: eui.Image;

		// private _id: gConst.cellId; //选项ID
		// private _num: number;

		private initS: number;
		private _finish: boolean;

		public constructor() {
			super();
			this.skinName = skins.ComItem;
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
			this.initS = this.con.scaleX;
		}

		/** 每次创建组件都会调用 */
		protected start() {
			// console.info("start");
			this.initHead();
			// this.updateRender();
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
		public initHead() {
			this.item.visible = false;
		}

		public bright() {
			const diffR: number = 4;
			const diffT: number = 200;
			const con = this.con;
			const initR: number = con.rotation;

			gTween.tween(con, void 0,
				{
					props: { rotation: initR + diffR, },
					duration: diffT,
					call: {
						callback: () => {
							gTween.tween(con, void 0,
								{
									props: { rotation: initR - diffR * 2, },
									duration: diffT * 2,
									call: {
										callback: () => {
											gTween.tween(con, void 0,
												{
													props: { rotation: initR, },
													duration: diffT
												}
											);
										}
									}
								}
							);
						}
					}
				}
			);
			gTween.fadeIn(this.item, 100);
		}

		/** 设置or获取当前项是否完成 */
		public finish(finish?: boolean): boolean {
			if (finish != void 0) {
				this._finish = finish;
			} else {
				return this._finish;
			}
		}

		/**
		 * 设置or获取选项ID
		 */
		// public id(id?: gConst.cellId): gConst.cellId {
		// 	if (id != void 0) {
		// 		const isUpdate: boolean = this._id != id;
		// 		if (isUpdate) {
		// 			this._id = id;
		// 			this.updateRender();
		// 		}
		// 	} else {
		// 		return this._id;
		// 	}
		// }

		// private updateRender() {
		// 	this.item.source = `pBall${gConst.cellSkin[this.id()]}_png`;
		// 	gComMgr.setItemAnchor(this.item);
		// 	gComMgr.setItemAnchor(this.con);
		// }

		// /** 获取目标数量 */
		// public get num(): number {
		// 	return this._num;
		// }
		// /** 设置目标数量 */
		// public set num(_num: number) {
		// 	if (_num < 0) { //最多不超过3颗闪烁物
		// 		if (this._num == 0) {
		// 			return;
		// 		}
		// 		_num = 0;
		// 	}
		// 	this._num = _num;
		// 	this.updateNum();
		// }

		/** 更新目标 */
		// private updateNum() {
		// 	const num: number = this.num;
		// 	if (num < 0) {
		// 		return;
		// 	}
		// 	const numWord = this.numWord;
		// 	const initS = this.initS;
		// 	const con = this.con;
		// 	const txt: string = num == 0 ? "y" : num + "";
		// 	numWord.text = txt;
		// 	//改变目标时候，放大动画
		// 	gTween.toScale(con, initS * 1.3, 100, initS, egret.Ease.quintOut, void 0, {
		// 		callback: () => {
		// 			gTween.toScale(con, initS, 100, initS * 1.3, egret.Ease.quintIn);
		// 		}
		// 	});
		// }
		/* =========== 业务代码-end =========== */
	}
}