// pages/resume/details/index.js
import { RESUME_DATA } from '../../../model/resume';

Page({
  data: {
    experience: null
  },

  onLoad(options) {
    const { index } = options;
    if (index !== undefined) {
      const experience = RESUME_DATA.workExperience[parseInt(index)];
      this.setData({ experience });
    }
  },

  goBack() {
    wx.navigateBack();
  }
});
