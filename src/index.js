import { init, destroy } from './scroll'
class pSeamlessScroll {
  constructor(e) {
    //内部数据
    let data = {
      //节点
      el: e.el,
      //配置信息
      config: {
        //滚动方向
        direction: e.direction || 'up',
        //是否鼠标移入停止
        hoverStop: e.hoverStop === false ? false : true,
        //滚动速度
        speed: e.speed || 100,
        //是否自动滚动
        auto: e.auto === false ? false : true,
        //是否循环滚动
        loop: e.loop === false ? false : true
      },
      //定时器
      timer: null,
      //是否屏蔽鼠标移入事件
      isHoverShield: false,
      //是否开始
      isStarted: false,
      //开始滚动函数
      toStartFunction: null
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
      this.state.isPause = false
      data.isHoverShield = false
      if (!data.isStarted) {
        data.toStartFunction()
      }
    }
    //暂停滚动
    this.pause = () => {
      this.state.isPause = true
      data.isHoverShield = true
    }
    //重载配置
    this.reload = (e) => {
      if (e) {
        for (let i in e) {
          this.config[i] = e[i]
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
    //初始化
    init(this, data)
  }
}
export default pSeamlessScroll