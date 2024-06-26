import { instant, animate, rest } from '../units/index.js';
export default function toStart(e_data, i_data) {
  toDistance()

  function toDistance() {
    if (e_data.state.isPause) return
    if (i_data.config.direction == 'up' || i_data.config.direction == 'left') {
      if (Math.abs(i_data.distance) >= i_data.contentDistance) {
        i_data.distance = 0
        instant(i_data)
        if (i_data.config.loop) {
          toDistance()
        } else {
          e_data.state.isPause = true
          return
        }
      } else if (i_data.contentDistance - Math.abs(i_data.distance) < i_data.step) {
        let time = (i_data.contentDistance - Math.abs(i_data.distance)) / i_data.step * i_data.config.speed
        i_data.distance = -i_data.contentDistance
        toGo(time)
      } else {
        i_data.distance -= i_data.step
        toGo(i_data.config.speed)
      }
    } else if (i_data.config.direction == 'down' || i_data.config.direction == 'right') {
      if (i_data.distance >= 0) {
        i_data.distance = -i_data.contentDistance
        instant(i_data)
        if (i_data.config.loop) {
          toDistance()
        } else {
          e_data.state.isPause = true
          return
        }
      } else if (Math.abs(i_data.distance) < i_data.step) {
        let time = Math.abs(i_data.distance) / i_data.step * i_data.config.speed
        i_data.distance = 0
        toGo(time)
      } else {
        i_data.distance += i_data.step
        toGo(i_data.config.speed)
      }
    }

    function toGo(time) {
      if (i_data.config.rest) {
        i_data.restDistance += i_data.step * time / i_data.config.speed
        rest(e_data, i_data, toDistance)
      }
      animate(i_data, time)
      if (i_data.timer) clearTimeout(i_data.timer)
      i_data.timer = setTimeout(() => {
        toDistance()
      }, time)
    }
  }
}