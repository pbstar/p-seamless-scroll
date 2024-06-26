import { init, destroy, play, pause } from './scroll.js'
class pSeamlessScroll {
  constructor(e) {
    //内部数据
    let data = {
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
      play(this, data)
    }
    //暂停滚动
    this.pause = () => {
      pause(this, data)
    }
    //重载配置
    this.reload = (e) => {
      destroy(data)
      if (e) {
        for (let i in e) {
          if (i == 'el') continue;
          data.config[i] = e[i]
        }
      }
      init(this, data)
    }
    //销毁
    this.destroy = () => {
      destroy(data)
    }
    //获取当前状态
    this.getState = () => {
      return this.state
    }
    //监听事件
    this.on = (e, f) => {
      if (e == 'hover') data.watchs.push({ es: e, ks: 'isHover', f })
      else if (e == 'pause') data.watchs.push({ es: e, ks: 'isPause', f })
    }
    // 移除监听事件
    this.off = (e) => {
      let watchs = data.watchs.filter(item => item.es !== e);
      data.watchs = watchs
    }
    //初始化
    init(this, data)
  }
}
export default pSeamlessScroll