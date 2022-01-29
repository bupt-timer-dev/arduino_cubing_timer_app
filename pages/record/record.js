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
    showTypeSelector: false,
    showDetail: false,
    detail: null
  },

  onShow: function () {
    let data = preference.load();
    this.setData({
      typeIndex: data.type,
      methodIndex: data.method
    })
    this.loadRecords();
  },
  tapRecord(e) {
    let i = records.cache[Number(e.target.id)];
    let o = {

    }
    this.setData({
      showDetail: true,
      detail: o
    })
  },
  loadRecords() {
    let o = [];
    let number = 0;
    for (let idx in records.cache) {
      let i = records.cache[idx];
      number++;
      if (i.type == this.data.typeIndex) {
        o.push({
          id: idx,
          number: number,
          type: defs.typeName[i.type],
          method: defs.methodName[i.method],
          timeStrInt: util.msToStrInt(i.time),
          timeStrDot: util.msToStrDot(i.time),
          startTime: util.formatShortTime(new Date(i.startTime)),
          tag: defs.tagName[i.tag]
        })
      }
    }
    o.reverse();
    this.setData({
      records: o
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