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
        //滚动速度
        speed: e.speed || 100,
        //是否自动滚动
        auto: e.auto || true,
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
      isPause: false,
    }
    //api
    this.api = {
      //开始滚动
      play: () => {
        this.state.isPause = false
        data.isHoverShield = false
        if (!data.isStart) {
          toStart()
        }
      },
      //暂停滚动
      pause: () => {
        this.state.isPause = true
        data.isHoverShield = true
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