// 获取所有本地储存数据开始
let getLocalStorageTotalLimits = wx.getStorageSync('totalLimits');
let getLocalStorageOrderSettings = wx.getStorageSync('orderSettings');
// 获取所有本地储存数据结束
App({
  onLaunch: function () {
    if (String(getLocalStorageTotalLimits).length === 0) {
      wx.setStorageSync('totalLimits', '300');
    }
    if (String(getLocalStorageOrderSettings).length === 0) {
      wx.setStorageSync('orderSettings', '0');
    }
  }
})
