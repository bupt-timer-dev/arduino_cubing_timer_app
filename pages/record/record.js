const records = require("../../models/records")
const defs = require("../../models/defs")
const util = require("../../utils/util");
const preference = require("../../models/preference");

// pages/record/record.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    records: [],
    typeRange: defs.typeName,
    typeIndex: 1,
    showTypeSelector: false
  },

  onShow: function () {
    let data = preference.load();
    this.setData({
      typeIndex: data.type,
      methodIndex: data.method
    })
    this.loadRecords();
  },
  loadRecords() {
    this.setData({
      records: records.cache.filter((i) => i.type == this.data.typeIndex).
      map((i) => ({
        type: defs.typeName[i.type],
        method: defs.methodName[i.method],
        time: util.msToStr(i.time),
        startTime: util.formatTime(new Date(i.startTime)),
        tag: defs.tagName[i.tag]
      })).reverse()
    })
  },
  selectType(e) {
    this.setData({
      typeIndex: Number(e.detail.index)
    })
    this.loadRecords();
    this.savePreference();
  },
  savePreference() {
    preference.save({
      type: this.data.typeIndex,
      method: preference.load().method
    })
  },
  tapTypeButton() {
    this.setData({
      showTypeSelector: true
    })
  }
})