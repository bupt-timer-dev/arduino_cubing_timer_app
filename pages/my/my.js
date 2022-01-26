// pages/my/my.js
const records = require("../../models/records")
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  clearStorage() {
    wx.showModal({
      title: '清除存储数据',
      content: '真的要清除全部存储数据吗？',
      confirmColor: "#FF0000",
      success(res) {
        if (res.confirm) {
          wx.clearStorageSync();
          records.cache = []
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})