require('dotenv').config();
const mongoose = require('mongoose');
const Tool = require('../models/Tool');
const Category = require('../models/Category');

// 分类数据
const categories = [
  { 
    name: '最新推荐', 
    icon: '🏠'
  },
  { 
    name: 'AI绘画', 
    icon: '🎨', 
    hasSubmenu: true,
    submenu: ['热门推荐', '图片清晰放大', '抠图背景去除', '电商图片生成', '图片模糊变清晰', 'LOGO生成']
  },
  { 
    name: 'AI写作', 
    icon: '✍️', 
    hasSubmenu: true,
    submenu: ['热门推荐', 'AI论文', 'AI内容检测', 'AI小说写作', 'AI文本摘要', 'AI公文写作']
  },
  { 
    name: 'AI视频', 
    icon: '🎥', 
    hasSubmenu: true,
    submenu: ['热门推荐', 'AI换脸', '视频转动漫', '对口型视频', 'AI自动剪辑']
  },
  { 
    name: 'AI办公', 
    icon: '💼', 
    hasSubmenu: true,
    submenu: ['热门推荐', 'AI制作PPT', 'AI文档助手', 'AI表格处理', 'AI思维导图']
  },
  { 
    name: 'AI聊天', 
    icon: '💬', 
    hasSubmenu: true,
    submenu: ['热门推荐', 'AI虚拟角色', 'AI智能客服']
  },
  { 
    name: 'AI编程', 
    icon: '💻',
    hasSubmenu: true,
    submenu: ['热门推荐', '代码生成', '代码补全', '代码转换', '代码优化']
  },
  { 
    name: 'AI音频', 
    icon: '🎵', 
    hasSubmenu: true,
    submenu: ['热门推荐', '文本到语音', 'AI作曲', 'AI语音克隆']
  },
  { 
    name: 'AI提示词', 
    icon: '💡',
    hasSubmenu: true,
    submenu: ['热门推荐', '绘画提示词', '写作提示词', '视频提示词']
  },
  { 
    name: 'AI设计', 
    icon: '🎯',
    hasSubmenu: true,
    submenu: ['热门推荐', 'UI设计', 'Logo设计', '海报设计', '品牌设计']
  },
  { 
    name: 'AI数字人', 
    icon: '👤',
    hasSubmenu: true,
    submenu: ['热门推荐', '数字人生成', '数字人定制', '数字人直播']
  },
  { 
    name: 'AI插件', 
    icon: '🔌',
    hasSubmenu: true,
    submenu: ['热门推荐', '浏览器插件', '设计插件', '办公插件']
  }
];

// 工具数据
const tools = [
  // 最新推荐
  {
    title: 'Midjourney',
    description: '一个探索新型思维模式为扩展人类想象力的工具。',
    tags: [
      { text: '热门', type: 'hot' },
      { text: 'EN', type: 'en' }
    ],
    icon: '🎨',
    category: '最新推荐',
    subCategory: '最新推荐',
    url: 'https://www.midjourney.com'
  },
  {
    title: 'Stable Diffusion 3',
    description: '新一代文本到图像生成AI模型',
    tags: [
      { text: '新品', type: 'new' },
      { text: 'EN', type: 'en' }
    ],
    icon: '🖼️',
    category: '最新推荐',
    subCategory: '最新推荐',
    url: 'https://stability.ai'
  },
  {
    title: 'Claude 3',
    description: 'Anthropic 最新发布的AI助手，支持多模态输入',
    tags: [
      { text: '新品', type: 'new' },
      { text: 'EN', type: 'en' }
    ],
    icon: '🤖',
    category: '最新推荐',
    subCategory: '最新推荐',
    url: 'https://claude.ai'
  },
  {
    title: 'ChatGPT',
    description: 'OpenAI开发的AI对话模型',
    tags: [
      { text: '热门', type: 'hot' },
      { text: 'EN', type: 'en' }
    ],
    icon: '💬',
    category: '最新推荐',
    subCategory: '最新推荐',
    url: 'https://chat.openai.com'
  },
  {
    title: 'GitHub Copilot',
    description: 'AI驱动的代码智能助手',
    tags: [
      { text: '热门', type: 'hot' },
      { text: 'EN', type: 'en' }
    ],
    icon: '🐙',
    category: '最新推荐',
    subCategory: '最新推荐',
    url: 'https://github.com/features/copilot'
  },
  
  // AI绘画分类的工具
  {
    title: 'Midjourney绘画',
    description: '一个探索新型思维模式为扩展人类想象力的工具。',
    tags: [
      { text: '热门', type: 'hot' },
      { text: 'EN', type: 'en' }
    ],
    icon: '🎨',
    category: 'AI绘画',
    subCategory: '热门推荐',
    url: 'https://www.midjourney.com'
  },
  {
    title: 'Stable Diffusion绘画',
    description: '新一代文本到图像生成AI模型',
    tags: [
      { text: '新品', type: 'new' },
      { text: 'EN', type: 'en' }
    ],
    icon: '🖼️',
    category: 'AI绘画',
    subCategory: '热门推荐',
    url: 'https://stability.ai'
  },
  {
    title: '文心一格',
    description: '百度开发的AI艺术与创意平台',
    tags: [
      { text: '免费', type: 'free' },
      { text: 'CN', type: 'cn' }
    ],
    icon: '✨',
    category: 'AI绘画',
    subCategory: '热门推荐',
    url: 'https://yige.baidu.com'
  },

  // AI写作分类工具
  {
    title: 'ChatGPT写作',
    description: 'OpenAI开发的AI写作助手，支持多种写作场景',
    tags: [
      { text: '热门', type: 'hot' },
      { text: 'EN', type: 'en' }
    ],
    icon: '✍️',
    category: 'AI写作',
    subCategory: '热门推荐',
    url: 'https://chat.openai.com'
  },
  {
    title: '写作猫',
    description: '中文AI写作助手，支持多种文体和场景',
    tags: [
      { text: '热门', type: 'hot' },
      { text: 'CN', type: 'cn' }
    ],
    icon: '📝',
    category: 'AI写作',
    subCategory: '热门推荐',
    url: 'https://xiezuocat.com'
  },
  {
    title: '秘塔写作',
    description: '专业的AI论文写作和润色工具',
    tags: [
      { text: '新品', type: 'new' },
      { text: 'CN', type: 'cn' }
    ],
    icon: '📚',
    category: 'AI写作',
    subCategory: 'AI论文',
    url: 'https://metaso.cn'
  },

  // AI视频分类工具
  {
    title: 'Runway',
    description: '专业的AI视频生成和编辑平台',
    tags: [
      { text: '热门', type: 'hot' },
      { text: 'EN', type: 'en' }
    ],
    icon: '🎥',
    category: 'AI视频',
    subCategory: '热门推荐',
    url: 'https://runway.ml'
  },
  {
    title: 'Synthesia',
    description: 'AI数字人视频生成平台',
    tags: [
      { text: '热门', type: 'hot' },
      { text: 'EN', type: 'en' }
    ],
    icon: '🎬',
    category: 'AI视频',
    subCategory: '热门推荐',
    url: 'https://www.synthesia.io'
  },
  {
    title: 'HeyGen',
    description: 'AI数字人视频制作平台',
    tags: [
      { text: '新品', type: 'new' },
      { text: 'EN', type: 'en' }
    ],
    icon: '🎭',
    category: 'AI视频',
    subCategory: 'AI换脸',
    url: 'https://www.heygen.com'
  },

  // AI办公分类工具
  {
    title: 'Microsoft Copilot',
    description: '微软推出的AI办公助手，集成Office全家桶',
    tags: [
      { text: '热门', type: 'hot' },
      { text: 'EN', type: 'en' }
    ],
    icon: '💼',
    category: 'AI办公',
    subCategory: '热门推荐',
    url: 'https://copilot.microsoft.com'
  },
  {
    title: 'Notion AI',
    description: 'Notion集成的AI助手，提升笔记和写作效率',
    tags: [
      { text: '热门', type: 'hot' },
      { text: 'EN', type: 'en' }
    ],
    icon: '📝',
    category: 'AI办公',
    subCategory: 'AI文档助手',
    url: 'https://notion.ai'
  },
  {
    title: 'Beautiful.ai',
    description: 'AI驱动的智能PPT设计工具',
    tags: [
      { text: '推荐', type: 'recommended' },
      { text: 'EN', type: 'en' }
    ],
    icon: '🎯',
    category: 'AI办公',
    subCategory: 'AI制作PPT',
    url: 'https://www.beautiful.ai'
  }
];

// 连接数据库
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-tools', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

// 导入分类数据
const importCategories = async () => {
  try {
    // 清空现有分类数据
    await Category.deleteMany({});
    console.log('已清空现有分类数据');

    // 为每个分类添加序号
    const categoriesWithOrder = categories.map((category, index) => ({
      ...category,
      order: index
    }));

    // 导入新的分类数据
    await Category.insertMany(categoriesWithOrder);
    console.log('分类数据导入成功');
  } catch (error) {
    console.error('导入分类数据时出错:', error);
  }
};

// 导入工具数据
const importTools = async () => {
  try {
    // 清空现有工具数据
    await Tool.deleteMany({});
    console.log('已清空现有工具数据');

    // 导入新的工具数据
    await Tool.insertMany(tools);
    console.log('工具数据导入成功');
  } catch (error) {
    console.error('导入工具数据时出错:', error);
  }
};

// 执行导入
const importData = async () => {
  await connectDB();
  await importCategories();
  await importTools();
  console.log('所有数据导入完成');
  process.exit();
};

importData(); 