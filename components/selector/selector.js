// components/selector/selector.js
const defs = require("../../models/defs");
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    typeIndex: {
      type: Number,
      value: 1
    },
    methodIndex: {
      type: Number,
      value: 0
    },
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
    showTypeSelector: false,
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
      this.triggerChange();
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
      this.triggerChange();
    }
  }
})