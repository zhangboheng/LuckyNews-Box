Page({
  onLoad: function () {
    this.pageLifetimes = {
      show() {
        if (typeof this.getTabBar === 'function' &&
          this.getTabBar()) {
          this.getTabBar().setData({
            selected: 2
          })
        }
      }
    }
  },
  // 跳转前往玩法说明
  goToInstructions: function () {
    wx.navigateTo({
      url: './instructions/index',
    });
  },
  // 跳转前往基础设置
  goToBasic: function () {
    wx.navigateTo({
      url: './basic/index',
    });
  },
  // 跳转前往高级设置
  // 跳转前往新闻源库
  // 跳转前往样式风格
  // 跳转前往捐赠打赏
  goToDonate: function () {
    wx.navigateTo({
      url: './donate/index',
    });    
  },
  // 跳转前往更新历史
  goToUpdateHistory: function () {
    wx.navigateTo({
      url: './history/index',
    });    
  },
  // 跳转前往关于我们
  goToAboutUs: function () {
    wx.navigateTo({
      url: './about/index',
    });
  }
})
