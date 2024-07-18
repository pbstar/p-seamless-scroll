import { init, destroy, play, pause } from './scroll.ts';
import { IData, EState, Config, onFun } from './types/types.ts';

class pSeamlessScroll {
  state: EState
  play: () => void
  pause: () => void
  reload: (e: any) => void
  destroy: () => void
  getState: () => any
  on: (e: any, f: any) => void
  off: (e: any) => void
  constructor(e: Config) {
    //内部数据
    let data: IData = {
      //节点
      el: e.el,
      //原始节点
      raw_el: null,
      //配置信息
      config: {
        //滚动方向
        direction: e.direction || 'up',
        directionList: ['up', 'down', 'left', 'right'],
        //是否鼠标移入停止
        hoverStop: e.hoverStop === false ? false : true,
        //滚动速度
        speed: e.speed || 100,
        //是否自动滚动
        auto: e.auto === false ? false : true,
        //是否循环滚动
        loop: e.loop === false ? false : true,
        // 滚动休息
        rest: e.rest || null,
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
      watchs: []
    }
    //状态信息
    this.state = {
      //是否鼠标移入
      isHover: false,
      //是否暂停
      isPause: false,
    }
    //开始滚动
    this.play = () => {
      play(data)
    }
    //暂停滚动
    this.pause = () => {
      pause(data)
    }
    //重载配置
    this.reload = (e: Config) => {
      destroy(data)
      data.config.direction = e.direction || 'up'
      data.config.hoverStop = e.hoverStop === false ? false : true
      data.config.speed = e.speed || 100
      data.config.auto = e.auto === false ? false : true
      data.config.loop = e.loop === false ? false : true
      data.config.rest = e.rest || null
      init(data)
    }
    //销毁
    this.destroy = () => {
      destroy(data)
    }
    //获取当前状态
    this.getState = () => {
      return data.state
    }
    //监听事件
    this.on = (e: string, f: onFun) => {
      if (e == 'hover') data.watchs.push({ es: e, ks: 'isHover', f })
      else if (e == 'pause') data.watchs.push({ es: e, ks: 'isPause', f })
    }
    // 移除监听事件
    this.off = (e: string) => {
      let watchs = data.watchs.filter(item => item.es !== e);
      data.watchs = watchs
    }
    //初始化
    init(data)
    //监听state
    let that = this
    data.state = new Proxy(data.state, {
      set(target, key: string, value, receiver) {
        that.state[key] = value
        if (key == 'isPause') {
          if (data.restTimer) clearTimeout(data.restTimer)
        }
        //事件监听
        for (let i = 0; i < data.watchs.length; i++) {
          let { ks, f } = data.watchs[i]
          if (ks == key) f(value)
        }
        return Reflect.set(target, key, value, receiver)
      }
    })
  }
}
export default pSeamlessScroll