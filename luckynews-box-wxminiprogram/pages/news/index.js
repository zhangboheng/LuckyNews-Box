Page({
  data: {
    rectangles: [
      { index: 1, title: "新闻" },
      { index: 2, title: "财经" },
      { index: 3, title: "社交" },
      { index: 4, title: "博客" },
      { index: 5, title: "编程" },
      { index: 6, title: "设计" },
      { index: 7, title: "直播" },
      { index: 8, title: "多媒体" }
    ] // 八个矩形的数据
  },
  onLoad: function () {
    this.pageLifetimes = {
      show() {
        if (typeof this.getTabBar === 'function' &&
          this.getTabBar()) {
          this.getTabBar().setData({
            selected: 0
          })
        }
      }
    }
  },
  navigateToNextPage: function(event) {
    const index = event.currentTarget.dataset.index;
    console.info('----------->', index);
    // 点击事件处理程序，跳转到下一层页面
    wx.navigateTo({
      url: '/pages/next-page/next-page'
    });
  },
  // 处理输入框事件
  onSearchInput: function (e) {
    const keyword = e.detail.value;
  },
  // 处理搜索按钮点击事件
  onSearch: function () {
    console.info('123213123213213');
  }
})
