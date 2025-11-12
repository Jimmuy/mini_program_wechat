// /pages/experience-detail/index.js
Page({
  data: {
    experience: null,
  },
  
  /**
   * 页面加载时
   */
  onLoad: function (options) {
    // 从缓存中读取数据
    const exp = wx.getStorageSync('currentExperienceDetail');
    
    if (exp) {
      this.setData({
        experience: exp,
      });
      // 动态设置导航栏标题
      wx.setNavigationBarTitle({
        title: exp.role || '工作经验详情'
      });
    } else {
      // 如果没有数据，显示错误或返回上一页
      wx.showToast({
        title: '加载失败',
        icon: 'error',
        duration: 2000,
        complete: () => {
          wx.navigateBack();
        }
      });
    }
  },

  /**
   * 页面卸载时
   */
  onUnload: function () {
    // 清理缓存，防止数据污染
    wx.removeStorageSync('currentExperienceDetail');
  }
});