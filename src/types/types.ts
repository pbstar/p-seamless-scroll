export type IData = {
  [key: string]: any,
  el: HTMLElement,
  raw_el: any,
  config: {
    direction: string,
    directionList: string[],
    hoverStop: boolean,
    speed: number,
    auto: boolean,
    loop: boolean,
    rest: any
  },
  state: EState,
  timer: any,
  restTimer: any,
  isHoverShield: boolean,
  contentDistance: number,
  viewDistance: number,
  step: number,
  distance: number,
  restDistance: number,
  isInit: boolean,
  watchs: any[]
}
export type EState = {
  [key: string]: any,
  isHover: boolean,
  isPause: boolean,
}
export type Config = {
  [key: string]: any,
  el: HTMLElement,
  direction: string,
  hoverStop: boolean,
  speed: number,
  auto: boolean,
  loop: boolean,
  rest: {
    time: number,
    distance: number,
  }
}
export type onFun = () => void;  