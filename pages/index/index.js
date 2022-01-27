// index.js
// 获取应用实例
const app = getApp()
const defs = require("../../models/defs");
const records = require("../../models/records")
const util = require("../../utils/util")
Page({
  millisecond: 0,
  lastTime: null,
  typeIndex: null,
  methodIndex: null,
  data: {
    state: "init", // init/run/stop/tagged
    timeStr: "00.000",
    tag: ""
  },
  selectorChange(e) {
    this.typeIndex = e.detail.typeIndex;
    this.methodIndex = e.detail.methodIndex;
    this.reset();
  },
  addDnf() {
    records.pop();
    this.currentRecord.tag = 1;
    records.push(this.currentRecord);
    this.setData({
      state: "tagged",
      tag: defs.tagName[1]
    })
  },
  addPlus2() {
    records.pop();
    this.currentRecord.tag = 2;
    this.currentRecord.time += 2000;
    records.push(this.currentRecord);
    this.millisecond += 2000;
    this.setData({
      timeStr: util.msToStr(this.millisecond),
      state: "tagged",
      tag: defs.tagName[2]
    })
  },
  cancel_edit() {
    records.pop();
    if (this.currentRecord.tag == 2) {
      this.currentRecord.time -= 2000;
      this.millisecond -= 2000;
      this.setData({
        timeStr: util.msToStr(this.millisecond),
      })
    }
    this.currentRecord.tag = 0;
    records.push(this.currentRecord);
    this.setData({
      state: "stop",
      tag: defs.tagName[0]
    })
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
      type: this.typeIndex,
      method: 0,
      startTime: Date.now(),
      tag: 0
    }
    this.setData({
      state: "run",
      tag: defs.tagName[0]
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
    let self = this;
    wx.showModal({
      title: '删除记录',
      content: '确认删除这条记录？',
      confirmColor: "#FF0000",
      success(res) {
        if (res.confirm) {
          records.pop();
          self.reset();
        }
      }
    })

  },
  startTicking() {
    wx.setKeepScreenOn({
      keepScreenOn: true
    })
    this.lastTime = Date.now();
    this.intervalHandle = setInterval(this.tick, 11);
  },
  stopTicking() {
    this.tick()
    clearInterval(this.intervalHandle);
    this.intervalHandle = null;
    wx.setKeepScreenOn({
      keepScreenOn: false
    })
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
      timeStr: util.msToStr(this.millisecond)
    })
  }
})