import { init, destroy, play, pause } from "./scroll.ts";
import { IData, EState, Config, onFun } from "./types/types.ts";

class pSeamlessScroll {
  #data: IData = {
    //节点
    el: null,
    //原始节点
    raw_el: null,
    //配置信息
    config: {
      //滚动方向
      direction: "up",
      directionList: ["up", "down", "left", "right"],
      //是否鼠标移入停止
      hoverStop: false,
      //滚动速度
      speed: 100,
      //是否自动滚动
      auto: true,
      //是否循环滚动
      loop: true,
      // 滚动休息
      rest: null,
    },
    state: {
      //是否鼠标移入
      isHover: false,
      //是否暂停
      isPause: false,
    },
    // 定时器
    timer: null,
    // 休息定时器
    restTimer: null,
    //是否屏蔽鼠标移入事件
    isHoverShield: false,
    // 挂载元素的滚动长度
    contentDistance: 0,
    // 滚动视口长度
    viewDistance: 0,
    // 滚动步长
    step: 10,
    // 滚动位置
    distance: 0,
    // 休息距离
    restDistance: 0,
    // 是否完成初始化
    isInit: false,
    // 监听的属性
    watchs: [],
  };
  state: EState;
  constructor(e: Config) {
    //状态信息
    this.state = {
      //是否鼠标移入
      isHover: false,
      //是否暂停
      isPause: false,
    };
    this.init(e);
  }
  //初始化
  init(e: Config) {
    //内部数据
    this.#data.el = e.el;
    this.#data.config.direction = e.direction || "up";
    this.#data.config.hoverStop = e.hoverStop === true ? true : false;
    this.#data.config.speed = e.speed || 100;
    this.#data.config.auto = e.auto === false ? false : true;
    this.#data.config.loop = e.loop === false ? false : true;
    this.#data.config.rest = e.rest || null;
    //初始化
    init(this.#data, this);
  }
  //开始滚动
  play() {
    play(this.#data);
  }
  //暂停滚动
  pause() {
    pause(this.#data);
  }
  //重载配置
  reload(e: Config) {
    destroy(this.#data);
    this.#data.config.direction = e.direction || "up";
    this.#data.config.hoverStop = e.hoverStop === true ? true : false;
    this.#data.config.speed = e.speed || 100;
    this.#data.config.auto = e.auto === false ? false : true;
    this.#data.config.loop = e.loop === false ? false : true;
    this.#data.config.rest = e.rest || null;
    init(this.#data, this);
  }
  //销毁
  destroy() {
    destroy(this.#data);
  }
  //获取当前状态
  getState() {
    return this.#data.state;
  }
  //监听事件
  on(e: string, f: onFun) {
    if (e == "hover") this.#data.watchs.push({ es: e, ks: "isHover", f });
    else if (e == "pause") this.#data.watchs.push({ es: e, ks: "isPause", f });
  }
  // 移除监听事件
  off(e: string) {
    let watchs = this.#data.watchs.filter((item) => item.es !== e);
    this.#data.watchs = watchs;
  }
}
export default pSeamlessScroll;
