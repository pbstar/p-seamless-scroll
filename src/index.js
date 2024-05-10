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
        direction: e.direction || 'down',
        //是否鼠标移入停止
        hoverStop: e.hoverStop || true,
        //每次移动距离(px)
        step: e.step || 1,
        //是否自动滚动
        auto: e.auto || true,
        //滚动间隔(ms)
        interval: e.interval || 3,
        //是否循环滚动
        loop: e.loop || true
      },
      //定时器
      timer: null,
      //是否屏蔽鼠标移入事件
      isHoverShield: false,
      //是否开始
      isStart: false,
    }
    //状态信息
    this.state = {
      //是否鼠标移入
      isHover: false,
      //是否暂停
      isPaused: false,
    }
    //api
    this.api = {
      //开始滚动
      play: () => {
        this.state.isPaused = false
        if (!data.isStart) {
          toStart()
        }
      },
      //暂停滚动
      pause: () => {
        this.state.isPaused = true
      },
      //重载配置
      reload: (e) => {
        if (e) {
          for (let i in e) {
            this.config[i] = e[i]
          }
        }
        init(this, data)
      },
      //销毁
      destroy: () => {
        destroy(this, data)
      },
      //获取当前状态
      getState: () => {
        return this.state
      }
    }
    //初始化
    init(this, data)
  }
}
export default pSeamlessScroll