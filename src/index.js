class pSeamlessScroll {
  constructor(e) {
    let sc = e.el;
    let that = this;
    this.isPaused = false;
    if (!sc || typeof sc !== "object" || sc == null) return

    let contentHeight = sc.offsetHeight;
    if (contentHeight < sc.parentElement.offsetHeight) return
    let distance = 0

    if (e.direction == 'down') distance = -contentHeight
    sc.append(sc.cloneNode(sc))

    if (e.hoverStop) {
      toHover()
    }

    let timer = null
    if (timer) clearInterval(timer)
    timer = setInterval(() => {
      toDistance()
    }, e.step || 3);

    //鼠标移入移出
    function toHover() {
      sc.onmouseover = () => {
        that.isPaused = true
      }
      sc.onmouseout = () => {
        that.isPaused = false
      }
    }
    //开始移动
    function toDistance() {
      if (that.isPaused) return
      if (e.direction == 'up') {
        if (distance * -1 < contentHeight) distance--
        else distance = 0
        sc.style.transform = 'translate(0px, ' + distance + 'px)';;
      } else if (e.direction == 'down') {
        if (distance < 0) distance++
        else distance = -contentHeight
        sc.style.transform = 'translate(0px, ' + distance + 'px)';
      }
    }
  }

  toPause(bool) {
    this.isPaused = bool
  }
}
if (typeof window !== 'undefined') window.pSeamlessScroll = pSeamlessScroll
export default pSeamlessScroll