// pages/recordDetail/recordDetail.js
const app = getApp()
const records = require("../../models/records")
const defs = require("../../models/defs")
const util = require("../../utils/util");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let i = records.cache[Number(options.id)];
    this.setData({
      detail: {
        id: options.id,
        number: options.number,
        type: defs.typeName[i.type],
        method: defs.methodName[i.method],
        timeStr: util.msToStr(i.time),
        startTime: util.formatTime(new Date(i.startTime)),
        tag: defs.tagName[i.tag]
      }
    })
  },
  del() {
    records.cache.splice(this.data.detail.id, 1);
    app.globalData.resetIndex = true;
    wx.navigateBack();
  }
})