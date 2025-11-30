Page({
  data: {
    resume: {
      name: '张三',
      title: '前端开发工程师',
      phone: '13888888888',
      email: 'zhangsan@example.com',
      city: '深圳',
      education: [
        {
          degree: '本科',
          university: '某某大学',
          major: '计算机科学与技术',
          startDate: '2016.09',
          endDate: '2020.06',
        },
      ],
      experience: [
        {
          position: '前端开发工程师',
          company: '某某科技公司',
          startDate: '2020.07',
          endDate: '至今',
          responsibilities: [
            '负责公司产品前端页面开发与维护',
            '参与项目需求分析，技术方案设计和评审',
            '与后端工程师协作，完成接口联调和功能实现',
          ],
        },
      ],
      skills: [
        'JavaScript',
        'Vue.js',
        'React.js',
        '小程序开发',
        'HTML',
        'CSS',
      ],
    },
  },

  onLoad() {
    // No specific data fetching needed for a generic resume
  },

  navigateToExperienceDetail(e) {
    const { index } = e.currentTarget.dataset;
    const experienceItem = this.data.resume.experience[index];
    // 将整个 experience 数组或单个 experience 对象存储在全局数据中
    // 这里为了简化，我们直接传递索引，并在详情页根据索引从全局数据中获取
    console.log("adadassdasdasd");
    wx.navigateTo({
      url: `/pages/experience-detail/index?index=${index}`,
    });
  },
});
