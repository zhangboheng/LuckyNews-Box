Page({
  data: {
    array: ['默认排序', '从短到长', '从长到短', '随机排序'],
    selectedOption: ''
  },
  // 初次加载载入从 localStorage 获取的数据
  onLoad: function() {
    let getLocalStorageTotalLimits = wx.getStorageSync('totalLimits');
    let getLocalStorageOrderSettings = wx.getStorageSync('orderSettings');
    // 初始化新闻条目数量和排序赋值
    this.setData({
      inputValue: getLocalStorageTotalLimits,
      selectedOption: getLocalStorageOrderSettings
    });
  },
  // 新闻条目限制总数输入内容
  handleInput: function(event) {
    const value = event.detail.value;
    const numericValue = value.replace(/\D/g, ''); // 使用正则表达式过滤非数字字符
    wx.setStorageSync('totalLimits', numericValue); // 使用 wx.setStorageSync 方法将 totalLimits 存储到本地
    this.setData({
      inputValue: numericValue
    });
  },
  // 新闻条目排序选择框
  bindPickerChange: function(e) {
    wx.setStorageSync('orderSettings', e.detail.value); // 使用 wx.setStorageSync 方法将 orderSettings 存储到本地
    this.setData({
      selectedOption: e.detail.value
    })
  },
})