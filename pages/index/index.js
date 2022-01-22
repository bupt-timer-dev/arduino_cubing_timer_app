// index.js
// 获取应用实例
const app = getApp()
const records = require("../../models/records.js")

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
    state: "init", // init/run/stop
    timeStr: "00.000"
  },
  toggle() {
    if (this.data.state == "run") {
      this.stop();
    } else {
      this.start();
    }
  },
  start() {
    this.currentRecord = {
      type: 0,
      method: 0,
      startTime: Date.now()
    }
    this.setData({
      state: "run"
    });
    this.millisecond = 0;
    this.startTicking();
  },
  stop() {
    this.setData({
      state: "stop"
    });
    this.stopTicking();
    this.currentRecord.time = this.millisecond;
    this.currentRecord.dnf = false;
    records.push(this.currentRecord);
  },
  resume() {
    records.pop();
    this.setData({
      state: "run"
    });
    this.startTicking();
  },
  deleteRecord() {
    records.pop();
    this.reset();
  },
  startTicking() {
    this.lastTime = Date.now();
    this.intervalHandle = setInterval(this.tick, 11);
  },
  stopTicking() {
    this.tick()
    clearInterval(this.intervalHandle);
    this.intervalHandle = null;
  },
  reset() {
    this.millisecond = 0;
    this.setData({
      timeStr: "00.000",
      state: "init"
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