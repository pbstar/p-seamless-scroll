import { init, destroy, play, pause } from './scroll.js'
class pSeamlessScroll {
  constructor(e) {
    //内部数据
    let data = {
      //节点
      el: e.el,
      //原始节点
      raw_el: e.el.innerHTML,
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
      //定时器
      timer: null,
      //是否屏蔽鼠标移入事件
      isHoverShield: false,
      // 挂载元素的滚动长度
      contentDistance: 0,
      // 滚动视口长度
      viewDistance: 0,
      // 滚动步长
      step: 0,
      // 滚动位置
      distance: 0,
      // 鼠标移入移出回调方法
      onHover: null,
      // 暂停回调方法
      onPause: null,
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
      destroy(this, data)
    }
    //获取当前状态
    this.getState = () => {
      return this.state
    }
    //监听事件
    this.on = (e, f) => {
      if (e === 'hover') {
        data.onHover = f
      }
      if (e === 'pause') {
        data.onPause = f
      }
    }
    // 移除监听事件
    this.off = (e) => {
      if (e === 'hover') {
        data.onHover = null
      }
      if (e === 'pause') {
        data.onPause = null
      }
    }
    //初始化
    init(this, data)
  }
}
export default pSeamlessScroll