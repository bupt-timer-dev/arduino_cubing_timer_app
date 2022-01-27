// components/selector/selector.js
const defs = require("../../models/defs");
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    range: defs.typeName
  },

  /**
   * 组件的方法列表
   */
  methods: {
    selectType(e) {
      this.setData({
        show: false,
      })
      this.triggerEvent("select", {
        index: e.target.id,
      })
    },
    tapType() {
      this.setData({
        showTypeSelector: true
      })
      wx.hideTabBar();
    },
    leaveDrawer() {
      wx.showTabBar();
    }
  }
})