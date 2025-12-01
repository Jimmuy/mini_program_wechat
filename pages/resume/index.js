// pages/resume/index.js
import { RESUME_DATA, ACCESS_KEY_NAME } from '../../model/resume';

Page({
  data: {
    isUnlocked: false,
    inputValue: '',
    error: false,
    resumeData: RESUME_DATA,
    accessKeyName: ACCESS_KEY_NAME
  },

  onLoad() {
    const isUnlocked = wx.getStorageSync('isUnlocked');
    if (isUnlocked) {
      this.setData({ isUnlocked: true });
    }
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().init();
    }
  },

  onInputChange(e) {
    this.setData({
      inputValue: e.detail.value,
      error: false
    });
  },

  handleUnlock() {
    const { inputValue } = this.data;
    if (inputValue.trim() === ACCESS_KEY_NAME) {
      this.setData({ isUnlocked: true, error: false });
      wx.setStorageSync('isUnlocked', true);
      wx.showToast({
        title: '解锁成功',
        icon: 'success'
      });
    } else {
      this.setData({ error: true, inputValue: '' });
      wx.vibrateShort();
    }
  },

  goBack() {
    wx.navigateBack({
      fail: () => {
        wx.switchTab({
          url: '/pages/index/index',
        });
      }
    });
  },

  onShareAppMessage() {
    return {
      title: '我的简历',
      path: '/pages/resume/index'
    };
  }
});