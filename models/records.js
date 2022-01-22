/*
记录字段：
type 魔方类型
method 计时方式
startTime 开始时间（时间戳）
time 用时（毫秒）
dnf 是否弃权
*/
let records = {
  cache: null,
  loadSync() {
    const info = wx.getStorageInfoSync();
    if (info.keys.includes("records")) {
      records.cache = wx.getStorageSync("records");
    } else {
      wx.setStorageSync("records", []);
      records.cache = [];
    }
  },
  save() {
    wx.setStorage({
      key: "records",
      data: records.cache
    })
  },
  push(record) {
    records.cache.push(record);
    records.save();
  },
  pop() {
    records.cache.pop();
    records.save();
  }
}
records.loadSync();
module.exports = records;