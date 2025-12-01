// pages/gallery/index.js
import { GALLERY_DATA } from '../../model/gallery';

Page({
  data: {
    galleryData: GALLERY_DATA,
    viewMode: 'list', // 'list' | 'detail' | 'lightbox'
    currentGroupIdx: -1,
    currentPhoto: null,
    currentLocation: '',
    currentPhotoIdx: -1,
    hasPrev: false,
    hasNext: false,
    showInfo: true, // Control lightbox info visibility
  },

  onLoad() {
    // 可以在这里添加页面加载时的逻辑
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().init();
    }
  },

  // Navigation: List -> Detail
  viewCategory(e) {
    const { groupIdx } = e.currentTarget.dataset;
    this.setData({
      viewMode: 'detail',
      currentGroupIdx: groupIdx,
      currentLocation: this.data.galleryData[groupIdx].location
    });
  },

  // Navigation: Detail -> List
  backToList() {
    this.setData({
      viewMode: 'list',
      currentGroupIdx: -1,
      currentLocation: ''
    });
  },

  // Navigation: Detail -> Lightbox
  openLightbox(e) {
    const { photoIdx } = e.currentTarget.dataset;
    this.updateLightboxState(this.data.currentGroupIdx, photoIdx, true);
  },

  // Navigation: Lightbox -> Detail
  closeLightbox() {
    this.setData({
      viewMode: 'detail',
      showInfo: true
    });
  },

  // Toggle Lightbox Info
  toggleInfo() {
    this.setData({
      showInfo: !this.data.showInfo
    });
  },

  preventTouchMove() {
    // 阻止遮罩层下的页面滚动
  },

  prevPhoto() {
    const { currentGroupIdx, currentPhotoIdx } = this.data;
    if (currentPhotoIdx > 0) {
      this.updateLightboxState(currentGroupIdx, currentPhotoIdx - 1);
    }
  },

  nextPhoto() {
    const { currentGroupIdx, currentPhotoIdx } = this.data;
    const photos = this.data.galleryData[currentGroupIdx].photos;
    if (currentPhotoIdx < photos.length - 1) {
      this.updateLightboxState(currentGroupIdx, currentPhotoIdx + 1);
    }
  },

  updateLightboxState(groupIdx, photoIdx, isOpen = true) {
    const group = this.data.galleryData[groupIdx];
    const photo = group.photos[photoIdx];

    this.setData({
      viewMode: isOpen ? 'lightbox' : 'detail',
      currentPhoto: photo,
      currentLocation: group.location,
      currentGroupIdx: groupIdx,
      currentPhotoIdx: photoIdx,
      hasPrev: photoIdx > 0,
      hasNext: photoIdx < group.photos.length - 1,
    });
  },

  onImageError(e) {
    const { groupIdx, photoIdx } = e.currentTarget.dataset;
    const { galleryData } = this.data;

    // Mark the photo as failed
    if (galleryData[groupIdx] && galleryData[groupIdx].photos[photoIdx]) {
      galleryData[groupIdx].photos[photoIdx].failed = true;

      // Check if all photos in the group have failed
      const allFailed = galleryData[groupIdx].photos.every(p => p.failed);
      if (allFailed) {
        galleryData[groupIdx].hidden = true;
      }

      this.setData({ galleryData });
    }
  },

  onShareAppMessage() {
    return {
      title: '我的摄影集',
      path: '/pages/gallery/index'
    };
  }
});
