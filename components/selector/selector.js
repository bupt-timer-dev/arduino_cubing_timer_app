// components/selector/selector.js
const defs = require("../../models/defs");
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    disabled: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    typeRange: defs.typeName,
    typeIndex: 1,
    showTypeSelector: false,
    methodIndex: 0,
    methodRange: defs.methodName,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    selectType(e) {
      this.setData({
        showTypeSelector: false,
        typeIndex: e.target.id
      })
      this.saveChange();
      this.triggerChange();
    },
    saveChange() {
      wx.setStorageSync("preference", {
        typeIndex: this.data.typeIndex,
        methodIndex: this.data.methodIndex,
      })
    },
    triggerChange() {
      this.triggerEvent("change", {
        typeIndex: this.data.typeIndex,
        methodIndex: this.data.methodIndex,
      })
    },
    tapType() {
      this.setData({
        showTypeSelector: true
      })
    }
  },
  lifetimes: {
    attached() {
      const data = wx.getStorageSync("preference");
      this.setData({
        typeIndex: data.typeIndex,
        methodIndex: data.methodIndex,
      })
      this.triggerChange();
    }
  }
})