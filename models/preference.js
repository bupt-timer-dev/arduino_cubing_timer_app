let preference = {
  load() {
    const info = wx.getStorageInfoSync();
    if (info.keys.includes("preference")) {
      const data = wx.getStorageSync("preference");
      return {
        type: data.type,
        method: data.method,
      }
    } else {
      let def = {
        type: 1,
        method: 0
      }
      this.setData(def);
      return def
    }
  },
  save(data) {
    wx.setStorageSync("preference", data);
  }
}
module.exports = preference;