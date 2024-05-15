import { instant, animate, rest } from '../units/index.js';
export default function toStart(e_data, i_data) {
  if (i_data.timer) clearInterval(i_data.timer)
  i_data.timer = setInterval(() => {
    toDistance()
  }, i_data.config.speed);

  //移动
  function toDistance() {
    if (e_data.state.isPause) return
    if (i_data.config.rest) {
      rest(e_data, i_data, () => { })
    }
    if (i_data.config.direction == 'up' || i_data.config.direction == 'left') {
      if (Math.abs(i_data.distance) >= i_data.contentDistance) {
        i_data.distance = 0
        instant(i_data)
        if (i_data.config.loop) {
          toDistance()
        } else {
          clearInterval(i_data.timer)
          i_data.timer = null
          i_data.isStarted = false
          e_data.state.isPause = true
          if (i_data.onPause) i_data.onPause(e_data.state.isPause)
        }
      } else {
        i_data.distance -= i_data.step
        animate(i_data, i_data.config.speed)
      }
    } else if (i_data.config.direction == 'down' || i_data.config.direction == 'right') {
      if (i_data.distance >= 0 && i_data.config.loop) {
        i_data.distance = -i_data.contentDistance
        instant(i_data)
        if (i_data.config.loop) {
          toDistance()
        } else {
          clearInterval(i_data.timer)
          i_data.timer = null
          i_data.isStarted = false
          e_data.state.isPause = true
          if (i_data.onPause) i_data.onPause(e_data.state.isPause)
        }
      } else {
        i_data.distance += i_data.step
        animate(i_data, i_data.config.speed)
      }
    }
  }
}