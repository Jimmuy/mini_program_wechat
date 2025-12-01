// pages/index/index.js
import { HOMEPAGE_DATA, GEAR_DATA } from '../../model/resume';

Page({
  data: {
    name: HOMEPAGE_DATA.name.toUpperCase(),
    role: HOMEPAGE_DATA.role,
    gearData: GEAR_DATA,
    mapData: [
      { name: "瑞士", type: "international" },
      { name: "德国", type: "international" },
      { name: "意大利", type: "international" },
      { name: "匈牙利", type: "international" },
      { name: "法国", type: "international" },
      { name: "泰国", type: "international" },
      { name: "北京", type: "china" },
      { name: "上海", type: "china" },
      { name: "天津", type: "china" },
      { name: "重庆", type: "china" },
      { name: "香港", type: "china" },
      { name: "澳门", type: "china" },
      { name: "内蒙古", type: "china" },
      { name: "新疆", type: "china" },
      { name: "西藏", type: "china" },
      { name: "福建", type: "china" },
      { name: "四川", type: "china" },
      { name: "广东", type: "china" },
      { name: "浙江", type: "china" },
      { name: "江苏", type: "china" },
      { name: "山东", type: "china" },
      { name: "陕西", type: "china" },
      { name: "甘肃", type: "china" },
      { name: "青海", type: "china" },
      { name: "宁夏", type: "china" },
      { name: "广西", type: "china" },
      { name: "贵州", type: "china" },
      { name: "湖南", type: "china" },
      { name: "湖北", type: "china" },
      { name: "河南", type: "china" },
      { name: "河北", type: "china" },
      { name: "山西", type: "china" },
      { name: "安徽", type: "china" },
      { name: "江西", type: "china" },
      { name: "吉林", type: "china" },
      { name: "辽宁", type: "china" }
    ]
  },

  onLoad() {
    // 可以在这里添加页面加载时的逻辑
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().init();
    }
  },

  navigateToGallery() {
    wx.switchTab({
      url: '/pages/gallery/index',
    });
  },

  onShareAppMessage() {
    return {
      title: `${HOMEPAGE_DATA.name} - Portfolio`,
      path: '/pages/index/index'
    };
  },

  onShareTimeline() {
    return {
      title: `${HOMEPAGE_DATA.name} - Portfolio`
    };
  }
});