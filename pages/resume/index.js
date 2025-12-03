// pages/resume/index.js
import { RESUME_DATA, ACCESS_KEY_NAME } from '../../model/resume';

Page({
  data: {
    isUnlocked: false,
    inputValue: '',
    error: false,
    resumeData: RESUME_DATA,
    accessKeyName: ACCESS_KEY_NAME,
    showExperiencePopup: false,
    selectedExperience: null,
    scrollTop: 0
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

  viewExperienceDetail(e) {
    const { index } = e.currentTarget.dataset;
    const experience = this.data.resumeData.workExperience[index];

    this.setData({
      selectedExperience: experience,
      showExperiencePopup: true,
      scrollTop: 0
    });
  },

  closeExperiencePopup() {
    this.setData({
      showExperiencePopup: false
    });
  },

  onCopyWebsite(e) {
    const url = e.currentTarget.dataset.url;
    wx.setClipboardData({
      data: url,
      success: () => {
        wx.showToast({
          title: '链接已复制',
          icon: 'success'
        });
      }
    });
  },

  preventMove() {
    return;
  },

  onShowMiniProgram(e) {
    wx.showModal({
      title: '访问小程序',
      content: '请在微信搜索框中输入 "嘎嘣脆糖" 即可找到我的小程序作品集',
      confirmText: '知道了',
      showCancel: false
    });
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