// home.js
import Toast from 'tdesign-miniprogram/toast/index';

Page({
  data: {
    // 页面加载状态
    pageLoading: true,
    // 从简历中提取的个人信息
    resume: {
      name: '唐琦',
      title: 'Android/Flutter/混合开发工程师',
      basicInfo: [
        { label: '生日', value: '1990.04.05' },
        { label: '学历', value: '全日制本科 (信息与计算科学)' },
        { label: '工作经验', value: '12 年' },
      ],
      coreAdvantages: [
        '具备 Flutter 基础库、组件库设计与封装实战经验',
        '熟悉常见的Android+Flutter+H5 跨端混合开发',
        '拥有技术培训与团队协作、项目推进能力',
      ],
      skills: [
        {
          category: 'Android 技术栈',
          items: '熟练掌握 Handler, Activity 生命周期, MVC/MVP/MVVM, Jetpack, Glide, OkHttp, Retrofit 等。',
        },
        {
          category: 'Flutter 技术栈 (5年)',
          items: '熟悉混合开发, 基础组件封装, 基础库(net, ui, router), 外接纹理, 动态化, 自动化测试与性能调优。',
        },
        {
          category: '混合开发技术栈',
          items: '熟悉 WebView, JsBridge, Cordova, H5, Weex, RN, Vue。',
        },
        {
          category: '开发语言',
          isLanguage: true, // 添加一个标志，用于WXML中判断
          items: [ // 转为对象数组，用于WXML循环和style绑定
            { name: 'Vue (HTML, CSS, JS)' },
            { name: 'Dart' },
            { name: 'Java' },
            { name: 'Kotlin' },
          ],
        },
      ],
      workExperience: [
        {
          time: '2020.3 - 至今',
          company: '杭州海康威视科技股份有限公司',
          role: 'Android 高级开发工程师',
          summary: '担任 Flutter 主力开发, 负责 Flutter 改造、基础库封装、技术培训、动态化热修复方案、跨端通讯框架等。',
          // 完整的详情
          details: [
            '担任 Flutter 主力开发，负责连锁项目 “发现” 界面大部分模块的 Flutter 改造，确保功能顺利上线并稳定运行；',
            '主导 Flutter 技术调研与落地，独立封装并迭代维护基础库（含网络请求框架、外接纹理图片加载框架、公共 UI 组件、统一登录安全中心等），提升团队开发效率，其中安全中心组件被部门内所有移动app接入使用，上线期间未发生过一起严重线上故障；',
            '负责业务部北京团队 Flutter 技术培训与分享，整理编写基础仓库设计文档与说明文档，助力团队快速掌握 Flutter 技术；',
            '参与 Flutter 动态化热修复方案制定、设计与上线，完成跨部门技术分享，推动技术成果在公司内部复用；',
            '独立设计研发跨原生与 Flutter 且支持热修补的路由框架、项目跨端通讯框架，均成功落地使用；',
            '负责既有项目 Flutter 改造与技术支持，能根据需求选择合适项目结构，高效解决改造中的各类问题；',
            '负责 Flutter plugin、packages 发布工作，快速定位并解决项目构建与缓存错误，保障开发进度；',
            '参与需求评审、接口评审，跟进项目进度并协调沟通，确保项目按计划交付；',
            '了解 Flutter 自动化测试；了解 Flutter UI 布局与渲染优化，开展优化分析并落地改进方案；',
            '作为 H5 核心开发成员，负责移动端 H5 工作规划与落地，开发连锁 APP 复杂业务模块 Vue 代码，拆分分配日常 H5 工作任务，把控进度并处理线上问题。'
          ]
        },
        {
          time: '2018.1 - 2020.3',
          company: '杭州米雅科技有限公司',
          role: 'Android 混合开发工程师',
          summary: '使用 Kotlin + Jetpack, 采用 Weex 与 JsBridge 混合开发, 设计 Weex 热修复功能, 封装公共依赖, 使用 AIDL。',
          details: [
            '以 Kotlin 为主要开发语言，结合 Android Jetpack 组件进行项目开发，保障代码质量与开发效率；',
            '采用 Weex 与 JsBridge 进行混合开发，实现 iOS 与 Android 端代码共用，封装常用 Module、Components 及 Plugin，制定 Weex 开发规范，统一团队开发标准；',
            '设计并负责开发维护 Weex 热修复功能，大幅提升 Native 两端问题发现与解决效率，减少线上故障影响范围；',
            '在 Weex 项目中引入 ESLint 规范，统一开发者编码风格，降低项目维护难度；',
            '抽取项目常用类，封装基类、网络请求框架、图片加载框架等作为公共依赖，供多个项目复用，减少重复开发；',
            '使用 AIDL 与蓝牙 4.1 协议，实现手持设备与大屏设备的打印、扫描功能调用，满足项目硬件交互需求；',
            '采用 DataBinding 实现数据双向绑定更新，减少重复代码，提升开发效率。'
          ]
        },
        {
          time: '2015.12 - 2018.1',
          company: '上海全程网络科技有限公司',
          role: 'Android 开发工程师',
          summary: '采用 MVP 重构, 使用 DataBinding, 封装底层依赖库, 制定开发规范, 参与 Node.js 后端, 集成 Weex。',
          details: [
            '采用 MVP 设计模式重构项目中 MVC 模块，明确项目结构与类的职责，提升代码可维护性与扩展性；',
            '使用 DataBinding 技术，大幅减少项目重复代码，降低对 ButterKnife 等第三方依赖，尝试实现 View 与 Model 双向绑定；',
            '针对多项目场景，抽取网络请求、热更新缓存机制、DEBUG 模块、工具类（Util）及公共自定义控件，封装为底层依赖库，简化新项目开发流程，降低管理难度，提升上层开发效率；',
            '参与制定项目开发规范，包括 MVP 设计模式开发规范、代码编写与命名规范，统一团队开发标准；',
            '参与基于 Node.js 的后端接口服务实现，协助完成前后端对接，保障项目功能完整落地；',
            '集成 Weex 框架，使用 Vue 开发项目模块，探索混合开发模式在项目中的应用。'
          ]
        },
        {
          time: '2013.9 - 2015.11',
          company: '深圳乐活灵动科技有限公司',
          role: 'Android 开发工程师',
          summary: '采用 MVC 结构, 使用 Volley, 接入高德地图 SDK, 集成支付宝支付, 使用 SVN。',
          details: [
            '采用 MVC 结构开发，实现数据与模型分离，保障项目架构清晰；',
            '使用第三方 Volley 网络访问框架，实现 APP 与服务器的数据交互，保障网络请求稳定高效；',
            '接入高德地图 SDK，实现跑步功能中的打点、路线绘制，以及根据路线颜色区分速度快慢等核心功能，提升用户运动体验；',
            '通过多份 Dimens 文件实现屏幕适配，确保 APP 在不同尺寸设备上展示效果一致；',
            '集成支付宝第三方支付功能，满足用户在 APP 内的支付需求；',
            '使用 SVN 进行版本控制，保障团队代码管理规范，避免版本冲突问题。'
          ]
        },
      ],
      aboutMe: [
        '性格随和，具备出色的跨部门沟通能力',
        '责任心强，对待工作充满热情',
        '热爱新技术探索，能快速学习并应用前沿技术',
        '兴趣广泛，热爱设计与美术，喜爱运动',
      ],
    },
  },

  onShow() {
    // 保留 TabBar 初始化
    if (typeof this.getTabBar === 'function') {
      this.getTabBar().init();
    }
  },

  onLoad() {
    this.init();
  },

  init() {
    // 模拟加载
    setTimeout(() => {
      this.setData({
        pageLoading: false,
      });
    }, 500);

    // 为语言标签添加随机的动画样式
    this.setData({
      'resume.skills': this.data.resume.skills.map(skill => {
        if (skill.isLanguage) {
          skill.items = skill.items.map(item => ({
            ...item,
            // 随机化动画的持续时间和延迟，使其看起来更自然
            style: `--float-duration: ${Math.random() * 2 + 2.5}s; --float-delay: ${Math.random() * 1.5}s;`
          }));
        }
        return skill;
      })
    });
  },

  // 保留一个空实现，防止 WXML 中的旧绑定(如果存在)出错
  onPullDownRefresh() {
    wx.stopPullDownRefresh();
  },

  // 示例：点击卡片可以显示 Toast (如果需要)
  onCardTap() {
    Toast({
      context: this,
      selector: '#t-toast',
      message: '欢迎查看我的简历',
    });
  },

  // 新增：处理工作经验点击事件
  navigateToExperienceDetail(e) {
    const index = e.currentTarget.dataset.index;
    const experience = this.data.resume.workExperience[index];

    // 使用 Storage 来传递复杂数据
    wx.setStorageSync('currentExperienceDetail', experience);

    // 跳转到新页面 (您需要创建这个页面)
    wx.navigateTo({
      // 假设您的详情页放在 /pages/experience-detail/index
      url: '/pages/experience-detail/index',
    });
  },
});