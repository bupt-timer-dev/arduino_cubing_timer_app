// index.js
// 获取应用实例
const app = getApp()

function msToStr(ms) {
  let minute = Math.floor(ms / 60000)
  ms = ms % 60000
  let str = (ms / 1000).toFixed(3)
  if (ms < 10000) str = "0" + str
  if (minute > 0) str = minute + ":" + str
  return str
}
Page({
  millisecond: 0,
  lastTime: null,
  data: {
    timeStr: "00.000",
    buttonText: "开始",
  },
  toggle() {
    if (this.intervalHandle) {
      this.tick()
      this.setData({
        buttonText: "开始"
      })
      clearInterval(this.intervalHandle)
      this.intervalHandle = null
    } else {
      this.setData({
        buttonText: "暂停"
      })
      this.lastTime = Date.now();
      this.intervalHandle = setInterval(this.tick, 11);
    }
  },
  reset() {
    this.millisecond = 0;
    this.setData({
      timeStr: "00.000",
    })
  },
  tick() {
    this.millisecond += Date.now() - this.lastTime;
    this.lastTime = Date.now();
    this.setData({
      timeStr: msToStr(this.millisecond)
    })
  }
})