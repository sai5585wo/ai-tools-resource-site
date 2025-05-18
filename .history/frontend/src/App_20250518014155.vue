<script setup>
import { ref, computed } from 'vue'
import ToolCard from './components/ToolCard.vue'
import icons from './assets/icons'

const menuOpen = ref(false)
const currentCategory = ref('最新推荐')
const searchQuery = ref('')
const expandedMenu = ref('')

// 定义分类数据
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
]

// 子分类状态
const subCategoryStates = ref({})

// 计算属性：获取分类的子分类
const getCategorySubmenu = computed(() => (categoryName) => {
  const category = categories.find(c => c.name === categoryName)
  return category?.submenu || []
})

// 计算属性：获取当前子分类
const getCurrentSubCategory = computed(() => (categoryName) => {
  return subCategoryStates.value[categoryName] || '热门推荐'
})

// 计算属性：获取分类的工具
const getCategoryTools = computed(() => (categoryName) => {
  return tools.filter(tool => {
    if (tool.category !== categoryName) return false;
    
    if (categoryName === '最新推荐') return true;
    
    const currentSubCategory = getCurrentSubCategory.value(categoryName)
    if (currentSubCategory === '热门推荐') {
      return tool.tags.some(tag => tag.type === 'hot')
    }
    
    return tool.subCategory === currentSubCategory
  })
})

const tools = [
  // 最新推荐（两行10个）
  {
    title: 'Midjourney',
    description: '一个探索新型思维模式为扩展人类想象力的工具。',
    tags: [{ text: '热门', type: 'hot' }, { text: 'EN', type: 'en' }],
    icon: icons.midjourney,
    category: '最新推荐',
    subCategory: '最新推荐',
    url: 'https://www.midjourney.com'
  },
  {
    title: 'Stable Diffusion 3',
    description: '新一代文本到图像生成AI模型',
    tags: [{ text: '新品', type: 'new' }, { text: 'EN', type: 'en' }],
    icon: icons.stableDiffusion,
    category: '最新推荐',
    subCategory: '最新推荐',
    url: 'https://stability.ai'
  },
  {
    title: '文心一格',
    description: 'AI 艺术和创意辅助平台',
    tags: [{ text: '免费', type: 'free' }, { text: '中文', type: 'zh' }],
    icon: icons.wenxinyige,
    category: '最新推荐',
    subCategory: '最新推荐',
    url: 'https://yige.baidu.com'
  },
  {
    title: 'Claude 3 Opus',
    description: '最新一代AI语言模型，支持多模态理解和生成',
    tags: [{ text: '新品', type: 'new' }, { text: 'EN', type: 'en' }],
    icon: icons.claude,
    category: '最新推荐',
    subCategory: '最新推荐',
    url: 'https://claude.ai'
  },
  {
    title: 'Gemini Pro',
    description: 'Google最新AI模型，支持多模态交互',
    tags: [{ text: '热门', type: 'hot' }, { text: '中英', type: 'zh' }],
    icon: '🌟',
    category: '最新推荐',
    subCategory: '最新推荐',
    url: 'https://gemini.google.com'
  },
  {
    title: 'Sora',
    description: 'OpenAI革命性的文本生成视频AI模型',
    tags: [{ text: '新品', type: 'new' }, { text: 'EN', type: 'en' }],
    icon: '🎬',
    category: '最新推荐',
    subCategory: '最新推荐',
    url: 'https://openai.com/sora'
  },
  {
    title: 'GPTs Store',
    description: 'OpenAI定制化AI助手商店',
    tags: [{ text: '热门', type: 'hot' }, { text: '中英', type: 'zh' }],
    icon: '🤖',
    category: '最新推荐',
    subCategory: '最新推荐',
    url: 'https://chat.openai.com/gpts'
  },
  {
    title: 'AutoGPT',
    description: '自主AI代理，可执行复杂任务链',
    tags: [{ text: '新品', type: 'new' }, { text: 'EN', type: 'en' }],
    icon: '⚡',
    category: '最新推荐',
    subCategory: '最新推荐',
    url: 'https://autogpt.net'
  },
  {
    title: 'Anthropic Claude API',
    description: '企业级AI API服务，支持长文本处理',
    tags: [{ text: '推荐', type: 'hot' }, { text: 'EN', type: 'en' }],
    icon: '💫',
    category: '最新推荐',
    subCategory: '最新推荐',
    url: 'https://anthropic.com/api'
  },
  {
    title: 'Perplexity AI',
    description: '智能搜索引擎，实时信息查询和分析',
    tags: [{ text: '免费', type: 'free' }, { text: 'EN', type: 'en' }],
    icon: '🔍',
    category: '最新推荐',
    subCategory: '最新推荐',
    url: 'https://perplexity.ai'
  },
  {
    title: 'H2O Danube3',
    description: '文本生成图像的先进模型',
    tags: [{ text: '新品', type: 'new' }, { text: 'EN', type: 'en' }],
    icon: '😊',
    category: 'AI绘画',
    subCategory: '图片清晰放大',
    url: 'https://h2o.ai'
  },
  {
    title: '302.AI',
    description: '全场景AI绘画工具，轻量好用。',
    tags: [{ text: '推荐', type: 'hot' }, { text: '中文', type: 'zh' }],
    icon: '🔮',
    category: 'AI绘画',
    subCategory: '图片模糊变清晰',
    url: 'https://302.ai'
  },
  {
    title: 'Civitai',
    description: '最强的开源 AI 艺术模型',
    tags: [{ text: '热门', type: 'hot' }, { text: 'EN', type: 'en' }],
    icon: '🎨',
    category: 'AI绘画',
    subCategory: '热门推荐',
    url: 'https://civitai.com'
  },
  {
    title: 'Dreamlike.art',
    description: '用AI艺术生成独特且神奇的图像。',
    tags: [{ text: '推荐', type: 'hot' }, { text: 'EN', type: 'en' }],
    icon: '🌟',
    category: 'AI绘画',
    subCategory: '电商图片生成',
    url: 'https://dreamlike.art'
  },
  {
    title: 'NightCafe Studio',
    description: '快速、美观、易用的AI艺术生成器。',
    tags: [{ text: '付费', type: 'pro' }, { text: 'EN', type: 'en' }],
    icon: '🌙',
    category: 'AI绘画',
    subCategory: '热门推荐',
    url: 'https://nightcafe.studio'
  },
  {
    title: 'Tiamat',
    description: '点燃无限创想 国内领先的 AI 生成平台。',
    tags: [{ text: '新品', type: 'new' }, { text: '中文', type: 'zh' }],
    icon: '🌀',
    category: 'AI绘画',
    subCategory: '抠图背景去除',
    url: 'https://tiamat.ai'
  },
  {
    title: 'Lexica',
    description: '一款AI图片搜索引擎',
    tags: [{ text: '免费', type: 'free' }, { text: 'EN', type: 'en' }],
    icon: '📱',
    category: 'AI绘画',
    subCategory: 'LOGO生成',
    url: 'https://lexica.art'
  },

  // AI绘画
  {
    title: 'Scribble Diffusion',
    description: '将您的草图转化为精美图像。',
    tags: [{ text: '免费', type: 'free' }, { text: 'EN', type: 'en' }],
    icon: '✏️',
    category: 'AI绘画',
    url: 'https://scribblediffusion.com'
  },
  {
    title: 'LeonardoAI',
    description: '程序创造力，利用Leonardo AI的力量。',
    tags: [{ text: '付费', type: 'pro' }, { text: 'EN', type: 'en' }],
    icon: '👨‍🎨',
    category: 'AI绘画',
    url: 'https://leonardo.ai'
  },
  {
    title: 'DreamStudio',
    description: '智能创意工具，助力您的创作。',
    tags: [{ text: '推荐', type: 'hot' }, { text: 'EN', type: 'en' }],
    icon: '🎨',
    category: 'AI绘画',
    url: 'https://dreamstudio.ai'
  },
  {
    title: 'LibilibAI',
    description: '中国领先的AI创作平台,具有强大的中文理解能力。',
    tags: [{ text: '新品', type: 'new' }, { text: '中文', type: 'zh' }],
    icon: '🎯',
    category: 'AI绘画',
    url: 'https://libilib.com'
  },
  {
    title: '无界 AI',
    description: '无界 AI - 人人都是艺术家。',
    tags: [{ text: '免费', type: 'free' }, { text: '中文', type: 'zh' }],
    icon: '🎼',
    category: 'AI绘画',
    url: 'https://wujieai.com'
  },
  {
    title: 'Clipdrop',
    description: 'AI 强力图像处理工具。',
    tags: [{ text: '推荐', type: 'hot' }, { text: 'EN', type: 'en' }],
    icon: '✂️',
    category: 'AI绘画',
    url: 'https://clipdrop.co'
  },
  {
    title: 'Adobe Firefly',
    description: '创造力无限，文字变艺术。',
    tags: [{ text: '付费', type: 'pro' }, { text: 'EN', type: 'en' }],
    icon: '🔥',
    category: 'AI绘画',
    url: 'https://firefly.adobe.com'
  },
  {
    title: '吐司 Tusi.Art',
    description: '在线生图的 AI 梗图分享社区。',
    tags: [{ text: '免费', type: 'free' }, { text: '中文', type: 'zh' }],
    icon: '🍞',
    category: 'AI绘画',
    url: 'https://tusi.art'
  },
  {
    title: '悠船',
    description: '让创意更简单，更高效。',
    tags: [{ text: '推荐', type: 'hot' }, { text: '中文', type: 'zh' }],
    icon: '⛵',
    category: 'AI绘画',
    url: 'https://www.youchuang.fun'
  },
  {
    title: '海艺SeaArt',
    description: '免费AI图片生成平台。',
    tags: [{ text: '免费', type: 'free' }, { text: '中文', type: 'zh' }],
    icon: '🌊',
    category: 'AI绘画',
    url: 'https://seaart.ai'
  },
  {
    title: '触手 AI',
    description: '国产AI绘画生成工具平台。',
    tags: [{ text: '新品', type: 'new' }, { text: '中文', type: 'zh' }],
    icon: '🤖',
    category: 'AI绘画',
    url: 'https://chushou.tv'
  },
  {
    title: 'Bing Image Creator',
    description: '来自Microsoft Bing的图像创作工具。',
    tags: [{ text: '免费', type: 'free' }, { text: 'EN', type: 'en' }],
    icon: '🔍',
    category: 'AI绘画',
    url: 'https://www.bing.com/create'
  },
  {
    title: '即梦',
    description: '一款AI创作工具，通过智能描述和创意提示生成图像。',
    tags: [{ text: '推荐', type: 'hot' }, { text: '中文', type: 'zh' }],
    icon: '💭',
    category: 'AI绘画',
    url: 'https://jimmeng.com'
  },
  {
    title: 'nijijourney',
    description: '魔法般的二次元绘画生成！',
    tags: [{ text: '付费', type: 'pro' }, { text: 'JP', type: 'jp' }],
    icon: '✨',
    category: 'AI绘画',
    url: 'https://nijijourney.com'
  },
  {
    title: 'Getimg.ai',
    description: '强大的AI工具套件。',
    tags: [{ text: '推荐', type: 'hot' }, { text: 'EN', type: 'en' }],
    icon: '🎨',
    category: 'AI绘画',
    url: 'https://getimg.ai'
  },
  {
    title: 'Ideogram.ai',
    description: '释放一次性生成多种风格的艺术图像。',
    tags: [{ text: '新品', type: 'new' }, { text: 'EN', type: 'en' }],
    icon: '🎭',
    category: 'AI绘画',
    url: 'https://ideogram.ai'
  },
  {
    title: 'Canva',
    description: '通过 AI 文本生成图像,各种完美选项。',
    tags: [{ text: '热门', type: 'hot' }, { text: '中英', type: 'zh' }],
    icon: '🎨',
    category: 'AI绘画',
    url: 'https://www.canva.com'
  },
  {
    title: 'WHEE',
    description: '一刻打造理想的WHEE。',
    tags: [{ text: '新品', type: 'new' }, { text: '中文', type: 'zh' }],
    icon: '🎪',
    category: 'AI绘画',
    url: 'https://whee.com'
  },

  // AI写作
  {
    title: 'ChatGPT Plus',
    description: 'OpenAI的高级AI写作助手，支持多语言创作和编辑。',
    tags: [{ text: '付费', type: 'pro' }, { text: '中英', type: 'zh' }],
    icon: icons.chatgpt,
    category: 'AI写作',
    subCategory: '热门推荐',
    url: 'https://chat.openai.com'
  },
  {
    title: 'Claude 3',
    description: 'Anthropic的最新AI助手，擅长学术写作和文献分析。',
    tags: [{ text: '新品', type: 'new' }, { text: 'EN', type: 'en' }],
    icon: icons.claude,
    category: 'AI写作',
    subCategory: '热门推荐',
    url: 'https://claude.ai'
  },
  {
    title: '写作猫',
    description: '中文AI写作助手，支持多种文体和场景的写作需求。',
    tags: [{ text: '推荐', type: 'hot' }, { text: '中文', type: 'zh' }],
    icon: icons.xiezuomao,
    category: 'AI写作',
    subCategory: '热门推荐',
    url: 'https://xiezuocat.com'
  },
  {
    title: 'Notion AI',
    description: '强大的AI写作和编辑助手，集成在Notion中。',
    tags: [{ text: '付费', type: 'pro' }, { text: '中英', type: 'zh' }],
    icon: icons.notion,
    category: 'AI写作',
    subCategory: 'AI论文',
    url: 'https://notion.so'
  },
  {
    title: 'Grammarly',
    description: '专业的AI写作润色和语法检查工具。',
    tags: [{ text: '推荐', type: 'hot' }, { text: 'EN', type: 'en' }],
    icon: '✍️',
    category: 'AI写作',
    subCategory: 'AI内容检测',
    url: 'https://grammarly.com'
  },
  {
    title: 'Copy.ai',
    description: '专业的AI营销文案和内容生成工具。',
    tags: [{ text: '付费', type: 'pro' }, { text: 'EN', type: 'en' }],
    icon: '📝',
    category: 'AI写作',
    subCategory: '热门推荐',
    url: 'https://copy.ai'
  },
  {
    title: 'Jasper',
    description: '面向企业的AI内容创作平台。',
    tags: [{ text: '付费', type: 'pro' }, { text: 'EN', type: 'en' }],
    icon: '💡',
    category: 'AI写作',
    subCategory: '热门推荐',
    url: 'https://jasper.ai'
  },
  {
    title: 'DeepL Write',
    description: 'AI驱动的写作改进和翻译工具。',
    tags: [{ text: '新品', type: 'new' }, { text: '中英', type: 'zh' }],
    icon: '🌐',
    category: 'AI写作',
    subCategory: 'AI文本摘要',
    url: 'https://deepl.com/write'
  },
  {
    title: 'Novel AI',
    description: 'AI辅助小说创作工具，支持情节发展。',
    tags: [{ text: '付费', type: 'pro' }, { text: 'EN', type: 'en' }],
    icon: '📚',
    category: 'AI写作',
    subCategory: 'AI小说写作',
    url: 'https://novelai.net'
  },
  {
    title: '秘塔写作',
    description: '中文AI写作助手，适合学术和公文写作。',
    tags: [{ text: '推荐', type: 'hot' }, { text: '中文', type: 'zh' }],
    icon: '📖',
    category: 'AI写作',
    subCategory: 'AI公文写作',
    url: 'https://xiezuo.metaso.cn'
  },
  {
    title: 'Rytr',
    description: '多语言AI写作助手，支持多种写作场景。',
    tags: [{ text: '免费', type: 'free' }, { text: 'EN', type: 'en' }],
    icon: '✨',
    category: 'AI写作',
    subCategory: '热门推荐',
    url: 'https://rytr.me'
  },
  {
    title: 'WordAI',
    description: '智能文本重写和内容优化工具。',
    tags: [{ text: '付费', type: 'pro' }, { text: 'EN', type: 'en' }],
    icon: '🔄',
    category: 'AI写作',
    subCategory: 'AI内容检测',
    url: 'https://wordai.com'
  },
  {
    title: 'Writesonic',
    description: 'AI驱动的内容创作和营销文案工具。',
    tags: [{ text: '推荐', type: 'hot' }, { text: 'EN', type: 'en' }],
    icon: '🚀',
    category: 'AI写作',
    subCategory: '热门推荐',
    url: 'https://writesonic.com'
  },
  {
    title: 'Academic Writer',
    description: '专业的学术论文AI写作助手。',
    tags: [{ text: '付费', type: 'pro' }, { text: 'EN', type: 'en' }],
    icon: '📄',
    category: 'AI写作',
    subCategory: 'AI论文',
    url: 'https://writer.com/academic'
  },
  {
    title: 'Compose AI',
    description: '智能邮件和商务写作助手。',
    tags: [{ text: '免费', type: 'free' }, { text: 'EN', type: 'en' }],
    icon: '📧',
    category: 'AI写作',
    subCategory: '热门推荐',
    url: 'https://compose.ai'
  },

  // AI视频
  {
    title: 'Runway Gen-2',
    description: '专业的AI视频生成和编辑工具，支持文本生成视频。',
    tags: [{ text: '专业版', type: 'pro' }, { text: 'EN', type: 'en' }],
    icon: icons.runway,
    category: 'AI视频',
    subCategory: '热门推荐',
    url: 'https://runwayml.com'
  },
  {
    title: 'Pika Labs',
    description: '创新的AI视频创作平台，支持多种视频特效和转场。',
    tags: [{ text: '新品', type: 'new' }, { text: 'EN', type: 'en' }],
    icon: icons.pika,
    category: 'AI视频',
    subCategory: '热门推荐',
    url: 'https://pika.art'
  },
  {
    title: 'HeyGen',
    description: 'AI数字人视频生成平台，支持多语言配音和表情同步。',
    tags: [{ text: '热门', type: 'hot' }, { text: '中英', type: 'zh' }],
    icon: icons.heygen,
    category: 'AI视频',
    subCategory: '热门推荐',
    url: 'https://www.heygen.com'
  },
  {
    title: 'Synthesia',
    description: '专业的AI视频生成平台，适合企业培训和营销。',
    tags: [{ text: '付费', type: 'pro' }, { text: 'EN', type: 'en' }],
    icon: icons.synthesia,
    category: 'AI视频',
    subCategory: '对口型视频',
    url: 'https://www.synthesia.io'
  },
  {
    title: 'Kapwing',
    description: '在线视频编辑器，集成AI功能。',
    tags: [{ text: '免费', type: 'free' }, { text: 'EN', type: 'en' }],
    icon: '🎥',
    category: 'AI视频',
    subCategory: 'AI自动剪辑',
    url: 'https://www.kapwing.com'
  },
  {
    title: 'Descript',
    description: '革命性的AI视频编辑工具，支持文本编辑视频。',
    tags: [{ text: '推荐', type: 'hot' }, { text: 'EN', type: 'en' }],
    icon: '🎬',
    category: 'AI视频',
    subCategory: 'AI自动剪辑',
    url: 'https://www.descript.com'
  },
  {
    title: 'D-ID',
    description: 'AI数字人视频生成平台。',
    tags: [{ text: '热门', type: 'hot' }, { text: 'EN', type: 'en' }],
    icon: '👤',
    category: 'AI视频',
    subCategory: '对口型视频',
    url: 'https://www.d-id.com'
  },
  {
    title: 'Fliki',
    description: '将文本转换为AI配音视频。',
    tags: [{ text: '新品', type: 'new' }, { text: 'EN', type: 'en' }],
    icon: '🎙️',
    category: 'AI视频',
    subCategory: '对口型视频',
    url: 'https://fliki.ai'
  },
  {
    title: 'InVideo',
    description: '在线视频制作工具，集成AI功能。',
    tags: [{ text: '免费', type: 'free' }, { text: 'EN', type: 'en' }],
    icon: '🎦',
    category: 'AI视频',
    subCategory: 'AI自动剪辑',
    url: 'https://invideo.io'
  },
  {
    title: 'Pictory',
    description: '自动从长视频中提取精彩片段。',
    tags: [{ text: '付费', type: 'pro' }, { text: 'EN', type: 'en' }],
    icon: '✂️',
    category: 'AI视频',
    subCategory: 'AI自动剪辑',
    url: 'https://pictory.ai'
  },
  {
    title: 'Veed.io',
    description: '在线视频编辑器，支持AI字幕和配音。',
    tags: [{ text: '推荐', type: 'hot' }, { text: 'EN', type: 'en' }],
    icon: '🎵',
    category: 'AI视频',
    subCategory: '对口型视频',
    url: 'https://www.veed.io'
  },
  {
    title: 'Kaiber',
    description: 'AI视频生成和风格转换工具。',
    tags: [{ text: '新品', type: 'new' }, { text: 'EN', type: 'en' }],
    icon: '🎨',
    category: 'AI视频',
    subCategory: '视频转动漫',
    url: 'https://kaiber.ai'
  },
  {
    title: 'Colossyan',
    description: '企业级AI视频创作平台。',
    tags: [{ text: '付费', type: 'pro' }, { text: 'EN', type: 'en' }],
    icon: '🎭',
    category: 'AI视频',
    subCategory: 'AI换脸',
    url: 'https://www.colossyan.com'
  },
  {
    title: 'Shuffll',
    description: 'AI驱动的社交媒体视频制作工具。',
    tags: [{ text: '免费', type: 'free' }, { text: 'EN', type: 'en' }],
    icon: '📱',
    category: 'AI视频',
    subCategory: 'AI自动剪辑',
    url: 'https://shuffll.com'
  },
  {
    title: 'Topaz Video AI',
    description: 'AI视频增强和放大工具。',
    tags: [{ text: '付费', type: 'pro' }, { text: 'EN', type: 'en' }],
    icon: '🔍',
    category: 'AI视频',
    subCategory: '视频转动漫',
    url: 'https://www.topazlabs.com/topaz-video-ai'
  },

  // AI办公
  {
    title: 'Notion AI',
    description: '集成AI功能的全能办公工具，支持智能写作和内容管理。',
    tags: [{ text: '推荐', type: 'hot' }, { text: '中英', type: 'zh' }],
    icon: icons.notion,
    category: 'AI办公',
    subCategory: '热门推荐',
    url: 'https://www.notion.so'
  },
  {
    title: 'Microsoft 365 Copilot',
    description: '微软Office套件的AI助手，提升办公效率。',
    tags: [{ text: '新品', type: 'new' }, { text: '中英', type: 'zh' }],
    icon: icons.microsoft,
    category: 'AI办公',
    subCategory: '热门推荐',
    url: 'https://www.microsoft.com/microsoft-365/copilot'
  },
  {
    title: 'Canva AI',
    description: '智能设计平台，支持AI生成设计和编辑功能。',
    tags: [{ text: '免费版', type: 'free' }, { text: '中英', type: 'zh' }],
    icon: icons.canva,
    category: 'AI办公',
    subCategory: '热门推荐',
    url: 'https://www.canva.com'
  },
  {
    title: 'Beautiful.ai',
    description: 'AI驱动的专业演示文稿制作工具。',
    tags: [{ text: '付费', type: 'pro' }, { text: 'EN', type: 'en' }],
    icon: '📊',
    category: 'AI办公',
    subCategory: 'AI制作PPT',
    url: 'https://www.beautiful.ai'
  },
  {
    title: 'Tome',
    description: 'AI驱动的故事叙述和演示工具。',
    tags: [{ text: '新品', type: 'new' }, { text: 'EN', type: 'en' }],
    icon: '📖',
    category: 'AI办公',
    subCategory: 'AI制作PPT',
    url: 'https://tome.app'
  },
  {
    title: 'Gamma',
    description: '下一代演示文稿创作平台。',
    tags: [{ text: '推荐', type: 'hot' }, { text: 'EN', type: 'en' }],
    icon: '🎯',
    category: 'AI办公',
    subCategory: 'AI制作PPT',
    url: 'https://gamma.app'
  },
  {
    title: 'Coda AI',
    description: '智能文档协作平台。',
    tags: [{ text: '付费', type: 'pro' }, { text: 'EN', type: 'en' }],
    icon: '📝',
    category: 'AI办公',
    subCategory: 'AI文档助手',
    url: 'https://coda.io'
  },
  {
    title: 'Mem.ai',
    description: '智能笔记和知识管理工具。',
    tags: [{ text: '新品', type: 'new' }, { text: 'EN', type: 'en' }],
    icon: '🧠',
    category: 'AI办公',
    subCategory: 'AI文档助手',
    url: 'https://mem.ai'
  },
  {
    title: 'Taskade AI',
    description: 'AI驱动的项目管理和协作工具。',
    tags: [{ text: '免费', type: 'free' }, { text: 'EN', type: 'en' }],
    icon: '✅',
    category: 'AI办公',
    subCategory: 'AI文档助手',
    url: 'https://www.taskade.com'
  },
  {
    title: 'Rows',
    description: '智能电子表格工具，支持AI分析。',
    tags: [{ text: '推荐', type: 'hot' }, { text: 'EN', type: 'en' }],
    icon: '📊',
    category: 'AI办公',
    subCategory: 'AI表格处理',
    url: 'https://rows.com'
  },
  {
    title: 'Numbrs',
    description: 'AI驱动的财务分析工具。',
    tags: [{ text: '付费', type: 'pro' }, { text: 'EN', type: 'en' }],
    icon: '💹',
    category: 'AI办公',
    subCategory: 'AI表格处理',
    url: 'https://numbrs.ai'
  },
  {
    title: 'XMind',
    description: 'AI辅助思维导图工具。',
    tags: [{ text: '推荐', type: 'hot' }, { text: '中英', type: 'zh' }],
    icon: '🌐',
    category: 'AI办公',
    subCategory: 'AI思维导图',
    url: 'https://xmind.ai'
  },
  {
    title: 'MindShow',
    description: 'AI驱动的演示文稿动画工具。',
    tags: [{ text: '新品', type: 'new' }, { text: '中文', type: 'zh' }],
    icon: '🎬',
    category: 'AI办公',
    subCategory: 'AI制作PPT',
    url: 'https://www.mindshow.ai'
  },
  {
    title: 'Craft',
    description: '现代化的文档创作工具，集成AI功能。',
    tags: [{ text: '付费', type: 'pro' }, { text: 'EN', type: 'en' }],
    icon: '✨',
    category: 'AI办公',
    subCategory: 'AI文档助手',
    url: 'https://www.craft.do'
  },
  {
    title: 'Airtable AI',
    description: '智能数据库和表格处理工具。',
    tags: [{ text: '付费', type: 'pro' }, { text: 'EN', type: 'en' }],
    icon: '📋',
    category: 'AI办公',
    subCategory: 'AI表格处理',
    url: 'https://www.airtable.com'
  },

  // AI编程
  {
    title: 'GitHub Copilot',
    description: '强大的AI编程助手，支持多种编程语言的代码生成。',
    tags: [{ text: '付费', type: 'pro' }, { text: 'EN', type: 'en' }],
    icon: icons.github,
    category: 'AI编程',
    subCategory: '热门推荐',
    url: 'https://github.com/features/copilot'
  },
  {
    title: 'CodeWhisperer',
    description: '亚马逊开发的AI编程助手，专注于安全和效率。',
    tags: [{ text: '免费', type: 'free' }, { text: 'EN', type: 'en' }],
    icon: icons.codewhisperer,
    category: 'AI编程',
    subCategory: '热门推荐',
    url: 'https://aws.amazon.com/codewhisperer'
  },
  {
    title: 'Cursor',
    description: '基于AI的新一代代码编辑器，支持自然语言编程。',
    tags: [{ text: '推荐', type: 'hot' }, { text: 'EN', type: 'en' }],
    icon: icons.cursor,
    category: 'AI编程',
    subCategory: '热门推荐',
    url: 'https://cursor.sh'
  },
  {
    title: 'Tabnine',
    description: 'AI代码补全工具，支持所有主流IDE。',
    tags: [{ text: '推荐', type: 'hot' }, { text: 'EN', type: 'en' }],
    icon: '⌨️',
    category: 'AI编程',
    subCategory: '代码补全',
    url: 'https://www.tabnine.com'
  },
  {
    title: 'Replit',
    description: '在线IDE与AI编程助手集成。',
    tags: [{ text: '免费', type: 'free' }, { text: 'EN', type: 'en' }],
    icon: '💻',
    category: 'AI编程',
    subCategory: '代码生成',
    url: 'https://replit.com'
  },
  {
    title: 'CodeGeeX',
    description: '开源的AI编程助手，支持多种编程语言。',
    tags: [{ text: '免费', type: 'free' }, { text: '中英', type: 'zh' }],
    icon: '🔧',
    category: 'AI编程',
    subCategory: '代码生成',
    url: 'https://codegeex.cn'
  },
  {
    title: 'Codeium',
    description: '免费的AI代码补全工具。',
    tags: [{ text: '免费', type: 'free' }, { text: 'EN', type: 'en' }],
    icon: '🚀',
    category: 'AI编程',
    subCategory: '代码补全',
    url: 'https://codeium.com'
  },
  {
    title: 'Sourcegraph Cody',
    description: 'AI代码搜索和理解工具。',
    tags: [{ text: '新品', type: 'new' }, { text: 'EN', type: 'en' }],
    icon: '🔍',
    category: 'AI编程',
    subCategory: '代码生成',
    url: 'https://sourcegraph.com/cody'
  },
  {
    title: 'Amazon CodeCatalyst',
    description: 'AWS的统一软件开发服务。',
    tags: [{ text: '付费', type: 'pro' }, { text: 'EN', type: 'en' }],
    icon: '☁️',
    category: 'AI编程',
    subCategory: '代码优化',
    url: 'https://aws.amazon.com/codecatalyst'
  },
  {
    title: 'Mutable AI',
    description: 'AI驱动的代码重构和优化工具。',
    tags: [{ text: '付费', type: 'pro' }, { text: 'EN', type: 'en' }],
    icon: '🔄',
    category: 'AI编程',
    subCategory: '代码优化',
    url: 'https://mutable.ai'
  },
  {
    title: 'CodeConverter',
    description: 'AI驱动的代码转换工具。',
    tags: [{ text: '免费', type: 'free' }, { text: 'EN', type: 'en' }],
    icon: '🔄',
    category: 'AI编程',
    subCategory: '代码转换',
    url: 'https://codeconverter.ai'
  },
  {
    title: 'Safurai',
    description: 'AI代码审查和优化助手。',
    tags: [{ text: '新品', type: 'new' }, { text: 'EN', type: 'en' }],
    icon: '🛡️',
    category: 'AI编程',
    subCategory: '代码优化',
    url: 'https://safurai.com'
  },
  {
    title: 'Stenography',
    description: 'AI驱动的代码文档生成工具。',
    tags: [{ text: '推荐', type: 'hot' }, { text: 'EN', type: 'en' }],
    icon: '📝',
    category: 'AI编程',
    subCategory: '代码生成',
    url: 'https://stenography.dev'
  },
  {
    title: 'Mintlify',
    description: 'AI驱动的文档编写助手。',
    tags: [{ text: '付费', type: 'pro' }, { text: 'EN', type: 'en' }],
    icon: '📚',
    category: 'AI编程',
    subCategory: '代码生成',
    url: 'https://mintlify.com'
  },
  {
    title: 'Pieces.app',
    description: 'AI驱动的代码片段管理工具。',
    tags: [{ text: '免费', type: 'free' }, { text: 'EN', type: 'en' }],
    icon: '🧩',
    category: 'AI编程',
    subCategory: '代码优化',
    url: 'https://pieces.app'
  },
  {
    title: 'Character.AI',
    description: '创建和与AI角色对话的平台，支持多种场景和个性。',
    tags: [{ text: '热门', type: 'hot' }, { text: 'EN', type: 'en' }],
    icon: icons.characterai,
    category: 'AI聊天',
    url: 'https://character.ai'
  },
  {
    title: '通义千问',
    description: '阿里巴巴开发的智能对话模型，中文理解能力强。',
    tags: [{ text: '免费', type: 'free' }, { text: '中文', type: 'zh' }],
    icon: icons.tongyi,
    category: 'AI聊天',
    url: 'https://qianwen.aliyun.com'
  },
  {
    title: '文心一言',
    description: '百度推出的知识增强大语言模型，擅长中文创作。',
    tags: [{ text: '免费', type: 'free' }, { text: '中文', type: 'zh' }],
    icon: icons.wenxin,
    category: 'AI聊天',
    url: 'https://yiyan.baidu.com'
  },
  {
    title: 'Elevenlabs',
    description: '领先的AI语音生成和克隆平台，支持多种语言和声音风格。',
    tags: [{ text: '热门', type: 'hot' }, { text: 'EN', type: 'en' }],
    icon: icons.elevenlabs,
    category: 'AI音频',
    url: 'https://elevenlabs.io'
  },
  {
    title: 'Murf AI',
    description: '专业的AI配音工具，适合视频制作和演示。',
    tags: [{ text: '推荐', type: 'hot' }, { text: 'EN', type: 'en' }],
    icon: icons.murf,
    category: 'AI音频',
    url: 'https://murf.ai'
  },
  {
    title: 'Soundraw',
    description: 'AI音乐创作平台，可生成各种风格的原创音乐。',
    tags: [{ text: '新品', type: 'new' }, { text: 'EN', type: 'en' }],
    icon: icons.soundraw,
    category: 'AI音频',
    url: 'https://soundraw.io'
  },
  {
    title: 'PromptBase',
    description: '专业的AI提示词市场，包含各种优质提示词模板。',
    tags: [{ text: '热门', type: 'hot' }, { text: 'EN', type: 'en' }],
    icon: icons.promptbase,
    category: 'AI提示词',
    url: 'https://promptbase.com'
  },
  {
    title: 'PromptHero',
    description: 'AI艺术提示词分享社区，适合Midjourney等工具。',
    tags: [{ text: '推荐', type: 'hot' }, { text: 'EN', type: 'en' }],
    icon: icons.prompthero,
    category: 'AI提示词',
    url: 'https://prompthero.com'
  },
  {
    title: 'Prompt Hunt',
    description: '发现和分享AI提示词的平台，支持多种AI工具。',
    tags: [{ text: '免费', type: 'free' }, { text: 'EN', type: 'en' }],
    icon: icons.prompthunt,
    category: 'AI提示词',
    url: 'https://prompthunt.com'
  },
  {
    title: 'Figma AI',
    description: 'Figma内置的AI设计助手，提升设计效率。',
    tags: [{ text: '热门', type: 'hot' }, { text: 'EN', type: 'en' }],
    icon: icons.figma,
    category: 'AI设计',
    url: 'https://figma.com'
  },
  {
    title: 'Framer AI',
    description: '使用AI快速创建专业网站的设计工具。',
    tags: [{ text: '新品', type: 'new' }, { text: 'EN', type: 'en' }],
    icon: icons.framer,
    category: 'AI设计',
    url: 'https://framer.com'
  },
  {
    title: 'Uizard',
    description: 'AI驱动的UI/UX设计平台，从草图到原型。',
    tags: [{ text: '推荐', type: 'hot' }, { text: 'EN', type: 'en' }],
    icon: icons.uizard,
    category: 'AI设计',
    url: 'https://uizard.io'
  },
  {
    title: 'D-ID',
    description: '创建AI数字人视频的领先平台，支持多语言。',
    tags: [{ text: '热门', type: 'hot' }, { text: 'EN', type: 'en' }],
    icon: icons.did,
    category: 'AI数字人',
    url: 'https://www.d-id.com'
  },
  {
    title: 'Synthesia',
    description: '专业的AI视频生成平台，适合企业培训和营销。',
    tags: [{ text: '付费', type: 'pro' }, { text: 'EN', type: 'en' }],
    icon: icons.synthesia,
    category: 'AI数字人',
    url: 'https://www.synthesia.io'
  },
  {
    title: '数字人口语',
    description: '中文AI数字人平台，支持实时对话和直播。',
    tags: [{ text: '中文', type: 'zh' }, { text: '新品', type: 'new' }],
    icon: icons.digitalhumans,
    category: 'AI数字人',
    url: 'https://www.digitalhumans.com'
  },
  {
    title: 'ChatGPT Plugins',
    description: 'OpenAI官方插件商店，扩展ChatGPT功能。',
    tags: [{ text: '热门', type: 'hot' }, { text: 'EN', type: 'en' }],
    icon: icons.chatgptplugins,
    category: 'AI插件',
    url: 'https://chat.openai.com/plugins'
  },
  {
    title: 'Claude Extensions',
    description: 'Claude的扩展功能集合，增强AI助手能力。',
    tags: [{ text: '新品', type: 'new' }, { text: 'EN', type: 'en' }],
    icon: icons.claudeext,
    category: 'AI插件',
    url: 'https://claude.ai/extensions'
  },
  {
    title: 'Raycast AI',
    description: '强大的AI生产力工具集，提供各种实用功能。',
    tags: [{ text: '推荐', type: 'hot' }, { text: 'EN', type: 'en' }],
    icon: icons.raycast,
    category: 'AI插件',
    url: 'https://www.raycast.com'
  },
  {
    title: 'Claude Chat',
    description: 'Anthropic开发的AI助手，擅长学术和专业对话。',
    tags: [{ text: '热门', type: 'hot' }, { text: 'EN', type: 'en' }],
    icon: '🤖',
    category: 'AI聊天',
    subCategory: 'AI虚拟角色',
    url: 'https://claude.ai/chat'
  },
  {
    title: 'Gemini',
    description: 'Google推出的AI助手，支持多模态对话。',
    tags: [{ text: '新品', type: 'new' }, { text: '中英', type: 'zh' }],
    icon: '🌟',
    category: 'AI聊天',
    subCategory: 'AI智能客服',
    url: 'https://gemini.google.com'
  },
  {
    title: 'ChatGPT',
    description: 'OpenAI开发的AI语言模型，支持多场景对话。',
    tags: [{ text: '热门', type: 'hot' }, { text: '中英', type: 'zh' }],
    icon: '💬',
    category: 'AI聊天',
    subCategory: '热门推荐',
    url: 'https://chat.openai.com'
  },
  {
    title: 'Poe',
    description: '集成多个AI模型的对话平台。',
    tags: [{ text: '免费', type: 'free' }, { text: 'EN', type: 'en' }],
    icon: '🦜',
    category: 'AI聊天',
    subCategory: '热门推荐',
    url: 'https://poe.com'
  },
  {
    title: 'Anthropic API',
    description: '企业级AI对话API服务。',
    tags: [{ text: '付费', type: 'pro' }, { text: 'EN', type: 'en' }],
    icon: '🔌',
    category: 'AI聊天',
    subCategory: 'AI智能客服',
    url: 'https://anthropic.com/api'
  },
  {
    title: 'Replika',
    description: '个性化AI伴侣，提供情感支持和对话。',
    tags: [{ text: '推荐', type: 'hot' }, { text: 'EN', type: 'en' }],
    icon: '🤗',
    category: 'AI聊天',
    subCategory: 'AI虚拟角色',
    url: 'https://replika.com'
  },
  {
    title: 'Pi by Inflection',
    description: '富有同理心的AI助手。',
    tags: [{ text: '新品', type: 'new' }, { text: 'EN', type: 'en' }],
    icon: '🥧',
    category: 'AI聊天',
    subCategory: 'AI虚拟角色',
    url: 'https://pi.ai'
  },
  {
    title: 'Anthropic Claude 3',
    description: '最新一代AI助手，支持多模态理解。',
    tags: [{ text: '新品', type: 'new' }, { text: 'EN', type: 'en' }],
    icon: '🌟',
    category: 'AI聊天',
    subCategory: '热门推荐',
    url: 'https://claude.ai'
  },
  {
    title: 'LangChain Chat',
    description: '基于LangChain的可定制AI助手。',
    tags: [{ text: '开发者', type: 'dev' }, { text: 'EN', type: 'en' }],
    icon: '⚡',
    category: 'AI聊天',
    subCategory: 'AI智能客服',
    url: 'https://chat.langchain.com'
  },
  // AI音频工具
  {
    title: 'Play.ht',
    description: 'AI语音生成和克隆平台。',
    tags: [{ text: '推荐', type: 'hot' }, { text: 'EN', type: 'en' }],
    icon: '🎧',
    category: 'AI音频',
    subCategory: '文本到语音',
    url: 'https://play.ht'
  },
  {
    title: 'Resemble.ai',
    description: '专业的AI语音克隆和合成平台。',
    tags: [{ text: '付费', type: 'pro' }, { text: 'EN', type: 'en' }],
    icon: '🎤',
    category: 'AI音频',
    subCategory: 'AI语音克隆',
    url: 'https://www.resemble.ai'
  },
  {
    title: 'Descript',
    description: '革命性的音频编辑工具。',
    tags: [{ text: '热门', type: 'hot' }, { text: 'EN', type: 'en' }],
    icon: '🎵',
    category: 'AI音频',
    subCategory: '文本到语音',
    url: 'https://www.descript.com'
  },
  {
    title: 'Voicemod',
    description: '实时语音变声器。',
    tags: [{ text: '免费', type: 'free' }, { text: 'EN', type: 'en' }],
    icon: '🎙️',
    category: 'AI音频',
    subCategory: 'AI语音克隆',
    url: 'https://www.voicemod.net'
  },
  {
    title: 'Boomy',
    description: 'AI音乐创作平台。',
    tags: [{ text: '新品', type: 'new' }, { text: 'EN', type: 'en' }],
    icon: '🎹',
    category: 'AI音频',
    subCategory: 'AI作曲',
    url: 'https://boomy.com'
  },
  {
    title: 'Splash',
    description: 'AI音乐生成工具。',
    tags: [{ text: '免费', type: 'free' }, { text: 'EN', type: 'en' }],
    icon: '🌊',
    category: 'AI音频',
    subCategory: 'AI作曲',
    url: 'https://www.splashmusic.com'
  },
  // AI提示词工具
  {
    title: 'MJ Prompt Helper',
    description: 'Midjourney提示词助手。',
    tags: [{ text: '免费', type: 'free' }, { text: 'EN', type: 'en' }],
    icon: '🎨',
    category: 'AI提示词',
    subCategory: '绘画提示词',
    url: 'https://prompthelper.ai'
  },
  {
    title: 'PromptPerfect',
    description: 'AI提示词优化工具。',
    tags: [{ text: '付费', type: 'pro' }, { text: 'EN', type: 'en' }],
    icon: '✨',
    category: 'AI提示词',
    subCategory: '写作提示词',
    url: 'https://promptperfect.ai'
  },
  {
    title: 'LearnPrompting',
    description: '提示词工程学习平台。',
    tags: [{ text: '教程', type: 'edu' }, { text: 'EN', type: 'en' }],
    icon: '📚',
    category: 'AI提示词',
    subCategory: '写作提示词',
    url: 'https://learnprompting.org'
  },
  {
    title: 'Promptist',
    description: 'AI艺术提示词生成器。',
    tags: [{ text: '新品', type: 'new' }, { text: 'EN', type: 'en' }],
    icon: '🎭',
    category: 'AI提示词',
    subCategory: '绘画提示词',
    url: 'https://promptist.com'
  },
  {
    title: 'MidLibrary',
    description: 'Midjourney提示词图书馆。',
    tags: [{ text: '热门', type: 'hot' }, { text: 'EN', type: 'en' }],
    icon: '📖',
    category: 'AI提示词',
    subCategory: '绘画提示词',
    url: 'https://midlibrary.io'
  },
  {
    title: 'PromptLayer',
    description: '提示词版本控制和管理工具。',
    tags: [{ text: '开发者', type: 'dev' }, { text: 'EN', type: 'en' }],
    icon: '🔄',
    category: 'AI提示词',
    subCategory: '写作提示词',
    url: 'https://promptlayer.com'
  },
  // AI设计工具
  {
    title: 'Galileo AI',
    description: 'AI驱动的UI设计工具。',
    tags: [{ text: '新品', type: 'new' }, { text: 'EN', type: 'en' }],
    icon: '🎨',
    category: 'AI设计',
    subCategory: 'UI设计',
    url: 'https://www.usegalileo.ai'
  },
  {
    title: 'Designs.ai',
    description: '一站式AI设计平台。',
    tags: [{ text: '推荐', type: 'hot' }, { text: 'EN', type: 'en' }],
    icon: '🎯',
    category: 'AI设计',
    subCategory: 'Logo设计',
    url: 'https://designs.ai'
  },
  {
    title: 'Brandmark',
    description: 'AI logo设计工具。',
    tags: [{ text: '付费', type: 'pro' }, { text: 'EN', type: 'en' }],
    icon: '🎯',
    category: 'AI设计',
    subCategory: 'Logo设计',
    url: 'https://brandmark.io'
  },
  {
    title: 'Remove.bg',
    description: 'AI图片背景消除工具。',
    tags: [{ text: '免费', type: 'free' }, { text: 'EN', type: 'en' }],
    icon: '✂️',
    category: 'AI设计',
    subCategory: '品牌设计',
    url: 'https://www.remove.bg'
  },
  {
    title: 'Khroma',
    description: 'AI配色工具。',
    tags: [{ text: '免费', type: 'free' }, { text: 'EN', type: 'en' }],
    icon: '🎨',
    category: 'AI设计',
    subCategory: 'UI设计',
    url: 'https://khroma.co'
  },
  {
    title: 'Looka',
    description: 'AI品牌设计平台。',
    tags: [{ text: '付费', type: 'pro' }, { text: 'EN', type: 'en' }],
    icon: '🎯',
    category: 'AI设计',
    subCategory: '品牌设计',
    url: 'https://looka.com'
  },
  // AI数字人工具
  {
    title: 'DeepBrain AI',
    description: '专业的AI数字人生成平台。',
    tags: [{ text: '付费', type: 'pro' }, { text: 'EN', type: 'en' }],
    icon: '🤖',
    category: 'AI数字人',
    subCategory: '数字人生成',
    url: 'https://www.deepbrain.io'
  },
  {
    title: 'Soul Machines',
    description: '数字人交互平台。',
    tags: [{ text: '企业版', type: 'pro' }, { text: 'EN', type: 'en' }],
    icon: '👥',
    category: 'AI数字人',
    subCategory: '数字人定制',
    url: 'https://www.soulmachines.com'
  },
  {
    title: 'Synthesia STUDIO',
    description: '数字人视频生成平台。',
    tags: [{ text: '付费', type: 'pro' }, { text: 'EN', type: 'en' }],
    icon: '🎬',
    category: 'AI数字人',
    subCategory: '数字人直播',
    url: 'https://www.synthesia.io/studio'
  },
  {
    title: 'Hour One',
    description: 'AI数字人视频创作平台。',
    tags: [{ text: '新品', type: 'new' }, { text: 'EN', type: 'en' }],
    icon: '🎥',
    category: 'AI数字人',
    subCategory: '数字人生成',
    url: 'https://hourone.ai'
  },
  {
    title: 'Rephrase.ai',
    description: 'AI数字人视频制作工具。',
    tags: [{ text: '付费', type: 'pro' }, { text: 'EN', type: 'en' }],
    icon: '🎭',
    category: 'AI数字人',
    subCategory: '数字人定制',
    url: 'https://www.rephrase.ai'
  },
  {
    title: 'Colossyan Creator',
    description: '企业级数字人视频平台。',
    tags: [{ text: '企业版', type: 'pro' }, { text: 'EN', type: 'en' }],
    icon: '🎬',
    category: 'AI数字人',
    subCategory: '数字人直播',
    url: 'https://www.colossyan.com'
  },
  // AI插件工具
  {
    title: 'Merlin',
    description: '通用AI浏览器插件。',
    tags: [{ text: '免费', type: 'free' }, { text: 'EN', type: 'en' }],
    icon: '🧙‍♂️',
    category: 'AI插件',
    subCategory: '浏览器插件',
    url: 'https://merlin.foyer.work'
  },
  {
    title: 'ChatGPT for Google',
    description: '在搜索结果中集成ChatGPT。',
    tags: [{ text: '免费', type: 'free' }, { text: 'EN', type: 'en' }],
    icon: '🔍',
    category: 'AI插件',
    subCategory: '浏览器插件',
    url: 'https://chrome.google.com/webstore/detail/chatgpt-for-google/jgjaeacdkonaoafenlfkkkmbaopkbilf'
  },
  {
    title: 'Notion AI',
    description: 'Notion集成AI助手。',
    tags: [{ text: '付费', type: 'pro' }, { text: 'EN', type: 'en' }],
    icon: '📝',
    category: 'AI插件',
    subCategory: '办公插件',
    url: 'https://www.notion.so/product/ai'
  },
  {
    title: 'Grammarly AI',
    description: 'AI写作助手插件。',
    tags: [{ text: '推荐', type: 'hot' }, { text: 'EN', type: 'en' }],
    icon: '✍️',
    category: 'AI插件',
    subCategory: '办公插件',
    url: 'https://www.grammarly.com'
  },
  {
    title: 'Figma AI',
    description: 'Figma AI设计助手。',
    tags: [{ text: '设计', type: 'design' }, { text: 'EN', type: 'en' }],
    icon: '🎨',
    category: 'AI插件',
    subCategory: '设计插件',
    url: 'https://www.figma.com/ai'
  },
  {
    title: 'Adobe Firefly',
    description: 'Adobe Creative Cloud AI插件。',
    tags: [{ text: '付费', type: 'pro' }, { text: 'EN', type: 'en' }],
    icon: '🎨',
    category: 'AI插件',
    subCategory: '设计插件',
    url: 'https://www.adobe.com/products/firefly.html'
  },
  // AI视频新增工具
  {
    title: 'Runway',
    description: '领先的AI视频生成和编辑平台，支持多种创新功能。',
    tags: [{ text: '热门', type: 'hot' }, { text: 'EN', type: 'en' }],
    icon: '🎬',
    category: 'AI视频',
    subCategory: '热门推荐',
    url: 'https://runway.ml'
  },
  {
    title: 'Pika Labs',
    description: '新一代AI视频生成工具，效果惊艳。',
    tags: [{ text: '新品', type: 'new' }, { text: 'EN', type: 'en' }],
    icon: '⚡',
    category: 'AI视频',
    subCategory: '热门推荐',
    url: 'https://pika.art'
  },
  {
    title: 'Stability AI Video',
    description: 'Stability AI推出的视频生成模型。',
    tags: [{ text: '新品', type: 'new' }, { text: 'EN', type: 'en' }],
    icon: '🎥',
    category: 'AI视频',
    subCategory: '热门推荐',
    url: 'https://stability.ai/video'
  },
  {
    title: '剪映专业版',
    description: '字节跳动旗下智能视频剪辑工具。',
    tags: [{ text: '免费', type: 'free' }, { text: '中文', type: 'zh' }],
    icon: '✂️',
    category: 'AI视频',
    subCategory: 'AI自动剪辑',
    url: 'https://www.capcut.cn'
  },
  {
    title: 'Vidyo.ai',
    description: 'AI驱动的视频重制和压缩工具。',
    tags: [{ text: '效率', type: 'efficiency' }, { text: 'EN', type: 'en' }],
    icon: '🎯',
    category: 'AI视频',
    subCategory: 'AI自动剪辑',
    url: 'https://vidyo.ai'
  },

  // AI办公新增工具
  {
    title: 'Microsoft 365 Copilot',
    description: '微软Office全家桶的AI助手，集成度高。',
    tags: [{ text: '热门', type: 'hot' }, { text: '中英', type: 'zh' }],
    icon: '📊',
    category: 'AI办公',
    subCategory: '热门推荐',
    url: 'https://microsoft.com/copilot'
  },
  {
    title: 'Notion AI Plus',
    description: '增强版Notion AI，支持更多智能功能。',
    tags: [{ text: '热门', type: 'hot' }, { text: '中英', type: 'zh' }],
    icon: '📝',
    category: 'AI办公',
    subCategory: '热门推荐',
    url: 'https://notion.so'
  },
  {
    title: 'Coda AI',
    description: '智能文档协作平台，支持自动化。',
    tags: [{ text: '效率', type: 'efficiency' }, { text: 'EN', type: 'en' }],
    icon: '📘',
    category: 'AI办公',
    subCategory: 'AI文档助手',
    url: 'https://coda.io'
  },
  {
    title: 'Mem.ai',
    description: '智能笔记和知识管理工具。',
    tags: [{ text: '新品', type: 'new' }, { text: 'EN', type: 'en' }],
    icon: '🧠',
    category: 'AI办公',
    subCategory: 'AI文档助手',
    url: 'https://mem.ai'
  },
  {
    title: 'Tome',
    description: 'AI驱动的演示文稿创作工具。',
    tags: [{ text: '创新', type: 'innovative' }, { text: 'EN', type: 'en' }],
    icon: '📊',
    category: 'AI办公',
    subCategory: 'AI制作PPT',
    url: 'https://tome.app'
  },

  // AI聊天新增工具
  {
    title: 'Claude 3',
    description: 'Anthropic最新一代AI助手，性能强大。',
    tags: [{ text: '热门', type: 'hot' }, { text: 'EN', type: 'en' }],
    icon: '🌟',
    category: 'AI聊天',
    subCategory: '热门推荐',
    url: 'https://claude.ai'
  },
  {
    title: 'Gemini Pro',
    description: 'Google最新AI模型，支持多模态。',
    tags: [{ text: '热门', type: 'hot' }, { text: '中英', type: 'zh' }],
    icon: '🚀',
    category: 'AI聊天',
    subCategory: '热门推荐',
    url: 'https://gemini.google.com'
  },
  {
    title: '月之暗面',
    description: '国内领先的AI助手，支持定制化。',
    tags: [{ text: '新品', type: 'new' }, { text: '中文', type: 'zh' }],
    icon: '🌙',
    category: 'AI聊天',
    subCategory: '热门推荐',
    url: 'https://www.moonshot.cn'
  },
  {
    title: 'Anthropic API',
    description: '企业级AI对话接口服务。',
    tags: [{ text: '专业', type: 'pro' }, { text: 'EN', type: 'en' }],
    icon: '⚡',
    category: 'AI聊天',
    subCategory: 'AI智能客服',
    url: 'https://anthropic.com/api'
  },
  {
    title: 'OpenAI API',
    description: 'ChatGPT背后的API服务。',
    tags: [{ text: '专业', type: 'pro' }, { text: 'EN', type: 'en' }],
    icon: '🔌',
    category: 'AI聊天',
    subCategory: 'AI智能客服',
    url: 'https://openai.com/api'
  },

  // AI绘画新增工具
  {
    title: 'DALL·E 3',
    description: 'OpenAI最新图像生成模型。',
    tags: [{ text: '热门', type: 'hot' }, { text: 'EN', type: 'en' }],
    icon: '🎨',
    category: 'AI绘画',
    subCategory: '热门推荐',
    url: 'https://openai.com/dall-e-3'
  },
  {
    title: 'Midjourney V6',
    description: '最新版本的Midjourney，效果更真实。',
    tags: [{ text: '热门', type: 'hot' }, { text: 'EN', type: 'en' }],
    icon: '🖼️',
    category: 'AI绘画',
    subCategory: '热门推荐',
    url: 'https://www.midjourney.com'
  },
  {
    title: 'Adobe Firefly',
    description: 'Adobe推出的AI创意套件。',
    tags: [{ text: '专业', type: 'pro' }, { text: 'EN', type: 'en' }],
    icon: '🔥',
    category: 'AI绘画',
    subCategory: '热门推荐',
    url: 'https://firefly.adobe.com'
  },
  {
    title: 'Canva AI',
    description: '智能设计平台的AI功能。',
    tags: [{ text: '设计', type: 'design' }, { text: '中英', type: 'zh' }],
    icon: '✨',
    category: 'AI绘画',
    subCategory: '电商图片生成',
    url: 'https://www.canva.com'
  },
  {
    title: 'Stable Diffusion 3',
    description: '开源图像生成模型的最新版本。',
    tags: [{ text: '新品', type: 'new' }, { text: 'EN', type: 'en' }],
    icon: '🎭',
    category: 'AI绘画',
    subCategory: '热门推荐',
    url: 'https://stability.ai'
  },

  // AI音频新增工具
  {
    title: 'Eleven Labs',
    description: '领先的AI语音生成和克隆平台。',
    tags: [{ text: '热门', type: 'hot' }, { text: 'EN', type: 'en' }],
    icon: '🎙️',
    category: 'AI音频',
    subCategory: '热门推荐',
    url: 'https://elevenlabs.io'
  },
  {
    title: 'Murf AI',
    description: '专业的AI配音和语音合成工具。',
    tags: [{ text: '专业', type: 'pro' }, { text: 'EN', type: 'en' }],
    icon: '🎤',
    category: 'AI音频',
    subCategory: '文本到语音',
    url: 'https://murf.ai'
  },
  {
    title: 'Soundraw',
    description: 'AI音乐创作平台。',
    tags: [{ text: '创意', type: 'creative' }, { text: 'EN', type: 'en' }],
    icon: '🎵',
    category: 'AI音频',
    subCategory: 'AI作曲',
    url: 'https://soundraw.io'
  },
  {
    title: 'Voicemod AI',
    description: '实时AI变声器。',
    tags: [{ text: '趣味', type: 'fun' }, { text: 'EN', type: 'en' }],
    icon: '🎭',
    category: 'AI音频',
    subCategory: 'AI语音克隆',
    url: 'https://www.voicemod.net'
  },
  {
    title: 'Descript',
    description: '智能音频编辑工具。',
    tags: [{ text: '效率', type: 'efficiency' }, { text: 'EN', type: 'en' }],
    icon: '✂️',
    category: 'AI音频',
    subCategory: '文本到语音',
    url: 'https://www.descript.com'
  },

  // AI提示词新增工具
  {
    title: 'PromptBase',
    description: '专业的AI提示词市场。',
    tags: [{ text: '热门', type: 'hot' }, { text: 'EN', type: 'en' }],
    icon: '💡',
    category: 'AI提示词',
    subCategory: '热门推荐',
    url: 'https://promptbase.com'
  },
  {
    title: 'MidJourney Prompt Helper',
    description: 'MJ提示词助手。',
    tags: [{ text: '工具', type: 'tool' }, { text: 'EN', type: 'en' }],
    icon: '🎨',
    category: 'AI提示词',
    subCategory: '绘画提示词',
    url: 'https://prompt.noonshot.com'
  },
  {
    title: 'ChatGPT Prompt Generator',
    description: 'ChatGPT提示词生成器。',
    tags: [{ text: '效率', type: 'efficiency' }, { text: 'EN', type: 'en' }],
    icon: '✨',
    category: 'AI提示词',
    subCategory: '写作提示词',
    url: 'https://www.promptmaker.ai'
  },
  {
    title: 'Prompt Engineering Guide',
    description: '提示词工程学习指南。',
    tags: [{ text: '教程', type: 'tutorial' }, { text: 'EN', type: 'en' }],
    icon: '📚',
    category: 'AI提示词',
    subCategory: '写作提示词',
    url: 'https://www.promptingguide.ai'
  },
  {
    title: 'PromptPerfect',
    description: 'AI提示词优化工具。',
    tags: [{ text: '专业', type: 'pro' }, { text: 'EN', type: 'en' }],
    icon: '🎯',
    category: 'AI提示词',
    subCategory: '写作提示词',
    url: 'https://promptperfect.jina.ai'
  },

  // AI插件新增工具
  {
    title: 'ChatGPT Plugins',
    description: 'ChatGPT官方插件商店。',
    tags: [{ text: '热门', type: 'hot' }, { text: 'EN', type: 'en' }],
    icon: '🔌',
    category: 'AI插件',
    subCategory: '热门推荐',
    url: 'https://chat.openai.com/plugins'
  },
  {
    title: 'Claude Extensions',
    description: 'Claude扩展功能集合。',
    tags: [{ text: '新品', type: 'new' }, { text: 'EN', type: 'en' }],
    icon: '⚡',
    category: 'AI插件',
    subCategory: '热门推荐',
    url: 'https://claude.ai/extensions'
  },
  {
    title: 'Raycast AI',
    description: 'Mac平台AI效率工具。',
    tags: [{ text: '效率', type: 'efficiency' }, { text: 'EN', type: 'en' }],
    icon: '🚀',
    category: 'AI插件',
    subCategory: '办公插件',
    url: 'https://www.raycast.com'
  },
  {
    title: 'Arc Browser AI',
    description: '内置AI功能的新一代浏览器。',
    tags: [{ text: '创新', type: 'innovative' }, { text: 'EN', type: 'en' }],
    icon: '🌈',
    category: 'AI插件',
    subCategory: '浏览器插件',
    url: 'https://arc.net'
  },
  {
    title: 'Cursor IDE',
    description: 'AI驱动的代码编辑器。',
    tags: [{ text: '开发者', type: 'dev' }, { text: 'EN', type: 'en' }],
    icon: '💻',
    category: 'AI插件',
    subCategory: '开发插件',
    url: 'https://cursor.sh'
  },
  // AI绘画新增工具
  {
    title: 'Krea AI',
    description: '专业的AI艺术创作平台，支持多种风格。',
    tags: [{ text: '新品', type: 'new' }, { text: 'EN', type: 'en' }],
    icon: '🎨',
    category: 'AI绘画',
    subCategory: '热门推荐',
    url: 'https://krea.ai'
  },
  {
    title: 'Artbreeder',
    description: 'AI艺术作品融合和生成工具。',
    tags: [{ text: '创意', type: 'creative' }, { text: 'EN', type: 'en' }],
    icon: '🎭',
    category: 'AI绘画',
    subCategory: '图片清晰放大',
    url: 'https://www.artbreeder.com'
  },
  {
    title: 'PhotoRoom',
    description: '专业的AI图片编辑和背景处理工具。',
    tags: [{ text: '专业', type: 'pro' }, { text: 'EN', type: 'en' }],
    icon: '📸',
    category: 'AI绘画',
    subCategory: '抠图背景去除',
    url: 'https://www.photoroom.com'
  },
  {
    title: 'Fotor',
    description: '在线图片编辑器，集成AI功能。',
    tags: [{ text: '免费', type: 'free' }, { text: '中英', type: 'zh' }],
    icon: '✨',
    category: 'AI绘画',
    subCategory: '图片模糊变清晰',
    url: 'https://www.fotor.com'
  },
  {
    title: 'Pixlr',
    description: '专业的在线图片编辑工具。',
    tags: [{ text: '设计', type: 'design' }, { text: 'EN', type: 'en' }],
    icon: '🖼️',
    category: 'AI绘画',
    subCategory: '电商图片生成',
    url: 'https://pixlr.com'
  },
  {
    title: 'Deep Art Effects',
    description: 'AI艺术风格转换工具。',
    tags: [{ text: '艺术', type: 'art' }, { text: 'EN', type: 'en' }],
    icon: '🎨',
    category: 'AI绘画',
    subCategory: '图片模糊变清晰',
    url: 'https://www.deeparteffects.com'
  },
  {
    title: 'Neural.love',
    description: 'AI图像增强和修复工具。',
    tags: [{ text: '专业', type: 'pro' }, { text: 'EN', type: 'en' }],
    icon: '🔮',
    category: 'AI绘画',
    subCategory: '图片清晰放大',
    url: 'https://neural.love'
  },
  {
    title: 'Playground AI',
    description: '实验性AI图像生成平台。',
    tags: [{ text: '创新', type: 'innovative' }, { text: 'EN', type: 'en' }],
    icon: '🎮',
    category: 'AI绘画',
    subCategory: '热门推荐',
    url: 'https://playground.ai'
  },
  {
    title: 'Wombo Dream',
    description: '手机端AI艺术生成App。',
    tags: [{ text: '移动端', type: 'mobile' }, { text: 'EN', type: 'en' }],
    icon: '💫',
    category: 'AI绘画',
    subCategory: '热门推荐',
    url: 'https://www.wombo.art'
  },
  {
    title: 'NightCafe Creator',
    description: '多样化AI艺术创作平台。',
    tags: [{ text: '创意', type: 'creative' }, { text: 'EN', type: 'en' }],
    icon: '🌙',
    category: 'AI绘画',
    subCategory: '热门推荐',
    url: 'https://creator.nightcafe.studio'
  },

  // AI写作新增工具
  {
    title: 'Sudowrite',
    description: '专业的AI小说写作助手。',
    tags: [{ text: '创意', type: 'creative' }, { text: 'EN', type: 'en' }],
    icon: '📚',
    category: 'AI写作',
    subCategory: 'AI小说写作',
    url: 'https://www.sudowrite.com'
  },
  {
    title: 'Jenni AI',
    description: 'AI学术写作助手。',
    tags: [{ text: '学术', type: 'academic' }, { text: 'EN', type: 'en' }],
    icon: '📝',
    category: 'AI写作',
    subCategory: 'AI论文',
    url: 'https://jenni.ai'
  },
  {
    title: 'Quillbot',
    description: 'AI改写和润色工具。',
    tags: [{ text: '效率', type: 'efficiency' }, { text: 'EN', type: 'en' }],
    icon: '✍️',
    category: 'AI写作',
    subCategory: 'AI内容检测',
    url: 'https://quillbot.com'
  },
  {
    title: 'Hemingway Editor',
    description: 'AI写作风格优化工具。',
    tags: [{ text: '写作', type: 'writing' }, { text: 'EN', type: 'en' }],
    icon: '📖',
    category: 'AI写作',
    subCategory: 'AI文本摘要',
    url: 'https://hemingwayapp.com'
  },
  {
    title: 'ProWritingAid',
    description: '专业的写作分析和改进工具。',
    tags: [{ text: '专业', type: 'pro' }, { text: 'EN', type: 'en' }],
    icon: '✨',
    category: 'AI写作',
    subCategory: 'AI内容检测',
    url: 'https://prowritingaid.com'
  },
  {
    title: 'Hyperwrite',
    description: 'AI写作助手和内容生成器。',
    tags: [{ text: '创新', type: 'innovative' }, { text: 'EN', type: 'en' }],
    icon: '⚡',
    category: 'AI写作',
    subCategory: '热门推荐',
    url: 'https://hyperwrite.com'
  },
  {
    title: 'Anyword',
    description: 'AI营销文案生成工具。',
    tags: [{ text: '营销', type: 'marketing' }, { text: 'EN', type: 'en' }],
    icon: '💡',
    category: 'AI写作',
    subCategory: '热门推荐',
    url: 'https://anyword.com'
  },
  {
    title: 'Wordtune',
    description: 'AI写作改进和建议工具。',
    tags: [{ text: '效率', type: 'efficiency' }, { text: 'EN', type: 'en' }],
    icon: '🎯',
    category: 'AI写作',
    subCategory: 'AI文本摘要',
    url: 'https://www.wordtune.com'
  },
  {
    title: 'Scalenut',
    description: 'AI SEO内容优化平台。',
    tags: [{ text: 'SEO', type: 'seo' }, { text: 'EN', type: 'en' }],
    icon: '📊',
    category: 'AI写作',
    subCategory: '热门推荐',
    url: 'https://www.scalenut.com'
  },
  {
    title: 'Article Forge',
    description: 'AI文章生成器。',
    tags: [{ text: '自动化', type: 'automation' }, { text: 'EN', type: 'en' }],
    icon: '📰',
    category: 'AI写作',
    subCategory: '热门推荐',
    url: 'https://www.articleforge.com'
  },

  // AI视频新增工具
  {
    title: 'Synthesia',
    description: '企业级AI视频生成平台。',
    tags: [{ text: '企业', type: 'enterprise' }, { text: 'EN', type: 'en' }],
    icon: '🎥',
    category: 'AI视频',
    subCategory: '热门推荐',
    url: 'https://www.synthesia.io'
  },
  {
    title: 'InVideo',
    description: 'AI驱动的在线视频制作工具。',
    tags: [{ text: '创意', type: 'creative' }, { text: 'EN', type: 'en' }],
    icon: '🎬',
    category: 'AI视频',
    subCategory: 'AI自动剪辑',
    url: 'https://invideo.io'
  },
  {
    title: 'Lumen5',
    description: 'AI营销视频制作平台。',
    tags: [{ text: '营销', type: 'marketing' }, { text: 'EN', type: 'en' }],
    icon: '✨',
    category: 'AI视频',
    subCategory: 'AI自动剪辑',
    url: 'https://lumen5.com'
  },
  {
    title: 'Pictory',
    description: 'AI视频摘要和编辑工具。',
    tags: [{ text: '效率', type: 'efficiency' }, { text: 'EN', type: 'en' }],
    icon: '✂️',
    category: 'AI视频',
    subCategory: 'AI自动剪辑',
    url: 'https://pictory.ai'
  },
  {
    title: 'Kapwing',
    description: '在线视频编辑器，支持AI功能。',
    tags: [{ text: '免费', type: 'free' }, { text: 'EN', type: 'en' }],
    icon: '🎨',
    category: 'AI视频',
    subCategory: 'AI自动剪辑',
    url: 'https://www.kapwing.com'
  },
  {
    title: 'Descript',
    description: '创新的AI视频编辑平台。',
    tags: [{ text: '创新', type: 'innovative' }, { text: 'EN', type: 'en' }],
    icon: '🎯',
    category: 'AI视频',
    subCategory: 'AI自动剪辑',
    url: 'https://www.descript.com'
  },
  {
    title: 'Veed.io',
    description: '专业的在线视频编辑工具。',
    tags: [{ text: '专业', type: 'pro' }, { text: 'EN', type: 'en' }],
    icon: '🎥',
    category: 'AI视频',
    subCategory: 'AI自动剪辑',
    url: 'https://www.veed.io'
  },
  {
    title: 'Elai.io',
    description: 'AI数字人视频生成平台。',
    tags: [{ text: '数字人', type: 'avatar' }, { text: 'EN', type: 'en' }],
    icon: '🤖',
    category: 'AI视频',
    subCategory: '对口型视频',
    url: 'https://elai.io'
  },
  {
    title: 'Opus.pro',
    description: 'AI视频后期制作工具。',
    tags: [{ text: '专业', type: 'pro' }, { text: 'EN', type: 'en' }],
    icon: '🎬',
    category: 'AI视频',
    subCategory: 'AI自动剪辑',
    url: 'https://opus.pro'
  },
  {
    title: 'Runway ML',
    description: 'AI视频特效和编辑平台。',
    tags: [{ text: '特效', type: 'effects' }, { text: 'EN', type: 'en' }],
    icon: '✨',
    category: 'AI视频',
    subCategory: '视频转动漫',
    url: 'https://runwayml.com'
  }
]

const filteredTools = computed(() => {
  return tools.filter(tool => {
    const matchesSearch = searchQuery.value === '' || 
      tool.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesCategory = currentCategory.value === '最新推荐' 
      ? tool.category === '最新推荐'
      : tool.category === currentCategory.value
    
    // 如果当前分类有子分类且选择了特定子分类
    const category = categories.find(c => c.name === currentCategory.value)
    if (category?.hasSubmenu) {
      const currentSubCategory = getCurrentSubCategory(currentCategory.value)
      if (currentSubCategory === '热门推荐') {
        // 显示该分类下标记为热门的工具
        return matchesSearch && matchesCategory && tool.tags.some(tag => tag.type === 'hot')
      } else {
        return matchesSearch && matchesCategory && tool.subCategory === currentSubCategory
      }
    }
    
    return matchesSearch && matchesCategory
  })
})

// 处理子分类点击
const handleSubCategoryClick = (categoryName, subCategory) => {
  subCategoryStates.value[categoryName] = subCategory
}

const toggleMenu = (categoryName) => {
  if (expandedMenu.value === categoryName) {
    expandedMenu.value = ''
  } else {
    expandedMenu.value = categoryName
  }
}

const isMenuExpanded = (categoryName) => {
  return expandedMenu.value === categoryName
}

const handleNavClick = (category) => {
  currentCategory.value = category.name
  // 不需要重置子分类，因为每个分类都有自己的状态
  
  if (category.hasSubmenu) {
    toggleMenu(category.name)
  } else {
    expandedMenu.value = ''
  }

  // 获取主内容区域元素
  const mainContent = document.querySelector('.main-content')
  const targetElement = document.getElementById(category.name)
  
  if (mainContent && targetElement) {
    const topOffset = targetElement.offsetTop
    mainContent.scrollTo({
      top: topOffset - 32,
      behavior: 'smooth'
    })
  }
}
</script>

<template>
  <div class="app-container">
    <nav class="sidebar">
      <div class="logo">
        <span class="logo-icon">AI</span>
        <span class="logo-text">base</span>
      </div>
      
      <div class="search-box">
        <input 
          type="text" 
          v-model="searchQuery"
          placeholder="搜索AI工具..."
        >
        <span class="search-icon">🔍</span>
      </div>
      
      <div class="nav-links">
        <div 
          v-for="category in categories" 
          :key="category.name"
          class="nav-item-wrapper"
        >
          <a 
            :href="'#' + category.name"
            :class="{ 
              'nav-item': true,
              'active': currentCategory === category.name,
              'has-submenu': category.hasSubmenu
            }"
            @click="handleNavClick(category)"
          >
            <span class="nav-icon">{{ category.icon }}</span>
            <span class="nav-text">{{ category.name }}</span>
            <span 
              v-if="category.hasSubmenu" 
              class="submenu-arrow"
              :class="{ 'expanded': isMenuExpanded(category.name) }"
            >▼</span>
          </a>
          
          <div 
            v-if="category.hasSubmenu"
            class="submenu"
            :class="{ 'expanded': isMenuExpanded(category.name) }"
          >
            <a 
              v-for="item in getCategorySubmenu(category.name)"
              :key="item"
              :href="'#' + category.name"
              class="submenu-item"
              :class="{ 'active': getCurrentSubCategory(category.name) === item }"
              @click.prevent="handleSubCategoryClick(category.name, item)"
            >
              {{ item }}
            </a>
          </div>
        </div>
      </div>
    </nav>

    <main class="main-content">
      <!-- 最新推荐 -->
      <section id="最新推荐" class="category-section">
        <div class="content-header">
          <h1>最新推荐</h1>
        </div>
        <div class="tools-grid hot-recommendations">
          <ToolCard
            v-for="tool in getCategoryTools('最新推荐')"
            :key="tool.title"
            :title="tool.title"
            :description="tool.description"
            :tags="tool.tags"
            :icon="tool.icon"
            :url="tool.url"
          />
        </div>
      </section>

      <!-- AI绘画 -->
      <section id="AI绘画" class="category-section">
        <div class="content-header">
          <div class="header-wrapper">
            <h1>AI绘画</h1>
            <div class="category-tags">
              <a href="#" 
                v-for="tag in getCategorySubmenu('AI绘画')" 
                :key="tag"
                :class="{ 'active': getCurrentSubCategory('AI绘画') === tag }"
                @click.prevent="handleSubCategoryClick('AI绘画', tag)"
              >
                {{ tag }}
              </a>
            </div>
          </div>
        </div>
        <div class="tools-grid">
          <ToolCard
            v-for="tool in getCategoryTools('AI绘画')"
            :key="tool.title"
            :title="tool.title"
            :description="tool.description"
            :tags="tool.tags"
            :icon="tool.icon"
            :url="tool.url"
          />
        </div>
      </section>

      <!-- AI写作 -->
      <section id="AI写作" class="category-section">
        <div class="content-header">
          <div class="header-wrapper">
            <h1>AI写作</h1>
            <div class="category-tags">
              <a href="#" 
                v-for="tag in getCategorySubmenu('AI写作')" 
                :key="tag"
                :class="{ 'active': getCurrentSubCategory('AI写作') === tag }"
                @click.prevent="handleSubCategoryClick('AI写作', tag)"
              >
                {{ tag }}
              </a>
            </div>
          </div>
        </div>
        <div class="tools-grid">
          <ToolCard
            v-for="tool in getCategoryTools('AI写作')"
            :key="tool.title"
            :title="tool.title"
            :description="tool.description"
            :tags="tool.tags"
            :icon="tool.icon"
            :url="tool.url"
          />
        </div>
      </section>

      <!-- 其他分类 -->
      <section 
        v-for="category in categories.slice(3)" 
        :key="category.name" 
        :id="category.name"
        class="category-section"
      >
        <div class="content-header">
          <div class="header-wrapper">
            <h1>{{ category.name }}</h1>
            <div class="category-tags" v-if="category.hasSubmenu">
              <a href="#" 
                v-for="tag in getCategorySubmenu(category.name)" 
                :key="tag"
                :class="{ 'active': getCurrentSubCategory(category.name) === tag }"
                @click.prevent="handleSubCategoryClick(category.name, tag)"
              >
                {{ tag }}
              </a>
            </div>
          </div>
        </div>
        <div class="tools-grid">
          <ToolCard
            v-for="tool in getCategoryTools(category.name)"
            :key="tool.title"
            :title="tool.title"
            :description="tool.description"
            :tags="tool.tags"
            :icon="tool.icon"
            :url="tool.url"
          />
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.app-container {
  width: 100%;
  min-height: 100vh;
  background: #f5f6fa;
  color: #333;
  display: flex;
  scroll-padding-top: 2rem; /* 添加滚动内边距 */
}

.sidebar {
  width: 240px;
  background: white;
  border-right: 1px solid #eee;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  box-shadow: 2px 0 8px rgba(0,0,0,0.05);
  overflow-y: auto;
  overflow-x: hidden; /* 防止水平滚动 */
}

.logo {
  padding: 0.5rem 1.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 1.5rem;
  font-weight: bold;
}

.logo-icon {
  color: #4086f4;
}

.logo-text {
  color: #333;
  margin-left: 0.25rem;
}

.search-box {
  margin: 0 1rem 1rem;
  position: relative;
}

.search-box input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  font-size: 0.9rem;
  outline: none;
  transition: all 0.3s;
  background: #f5f6fa;
  color: #333;
}

.search-box input::placeholder {
  color: #999;
}

.search-box input:focus {
  border-color: #4086f4;
  background: white;
  box-shadow: 0 0 0 3px rgba(64, 134, 244, 0.1);
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1rem;
  color: #4086f4;
  pointer-events: none;
}

.nav-links {
  display: flex;
  flex-direction: column;
  padding: 0 0.75rem;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  color: #666;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
  justify-content: flex-start;
  gap: 0.75rem;
}

.nav-item:hover {
  background: #f0f5ff;
  color: #4086f4;
}

.nav-item.active {
  background: #f0f5ff;
  color: #4086f4;
  font-weight: 500;
}

.nav-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.nav-text {
  flex: 1;
  text-align: left;
  font-size: 0.95rem;
}

.submenu-arrow {
  font-size: 0.75rem;
  opacity: 0.5;
  transition: transform 0.3s ease;
  margin-left: auto;
}

.submenu-arrow.expanded {
  transform: rotate(180deg);
}

.has-submenu:hover .submenu-arrow {
  opacity: 1;
}

.submenu {
  max-height: 0;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  background: #fafafa;
  margin: 0 0.5rem;
  border-radius: 6px;
  opacity: 0;
}

.submenu.expanded {
  max-height: 500px;
  margin: 0.5rem;
  opacity: 1;
}

.submenu-item {
  display: block;
  padding: 0.6rem 1rem 0.6rem 2.5rem;
  color: #666;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.2s;
  text-align: left;
}

.submenu-item:hover {
  color: #4086f4;
  background: #f0f5ff;
}

.main-content {
  flex: 1;
  margin-left: 240px;
  padding: 2rem;
  background: #f5f6fa;
  min-height: 100vh;
  overflow-y: auto;
  overflow-x: hidden; /* 防止水平滚动 */
  scroll-behavior: smooth;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  padding-bottom: 4rem;
}

.category-section {
  margin-bottom: 3rem;
  padding-top: 1rem;
}

.category-section:last-child {
  margin-bottom: 0;
}

.content-header {
  margin-bottom: 1.5rem;
  text-align: left;
}

.header-wrapper {
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.content-header h1 {
  font-size: 1.5rem;
  color: #333;
  font-weight: 600;
  margin: 0;
  white-space: nowrap;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.25rem;
  padding: 0.5rem 0;
}

/* 响应式布局 */
@media (max-width: 1600px) {
  .tools-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 1200px) {
  .tools-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    transition: transform 0.3s;
    z-index: 1000;
  }

  .sidebar.open {
    transform: translateX(0);
  }

  .main-content {
    margin-left: 0;
    padding: 1rem;
  }

  .tools-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .tools-grid {
    grid-template-columns: 1fr;
  }
}

.category-tags {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
}

.category-tags a {
  padding: 0.4rem 1rem;
  border-radius: 20px;
  background: #f5f6fa;
  color: #666;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s;
  white-space: nowrap;
}

.category-tags a:hover {
  background: #e8f3ff;
  color: #4086f4;
}

.category-tags a.active {
  background: #4086f4;
  color: white;
}

/* 移除全局滚动相关样式 */
:root {
  scroll-behavior: auto;
}

html {
  scroll-behavior: auto;
  overflow: hidden;
}

body {
  scroll-behavior: auto;
  overflow: hidden;
}

/* 导航链接样式 */
.nav-item {
  text-decoration: none;
  color: inherit;
}

.nav-item:hover {
  text-decoration: none;
}

.submenu-item {
  text-decoration: none;
  color: inherit;
}

.submenu-item:hover {
  text-decoration: none;
}

/* 在 style 部分添加自定义滚动条样式 */
.sidebar::-webkit-scrollbar {
  width: 6px;
}

.sidebar::-webkit-scrollbar-track {
  background: #f5f6fa;
}

.sidebar::-webkit-scrollbar-thumb {
  background: #e0e3f0;
  border-radius: 3px;
}

.sidebar::-webkit-scrollbar-thumb:hover {
  background: #c0c4d6;
}

.main-content::-webkit-scrollbar {
  width: 8px;
}

.main-content::-webkit-scrollbar-track {
  background: #f5f6fa;
}

.main-content::-webkit-scrollbar-thumb {
  background: #e0e3f0;
  border-radius: 4px;
}

.main-content::-webkit-scrollbar-thumb:hover {
  background: #c0c4d6;
}

/* Firefox 滚动条样式 */
.sidebar, .main-content {
  scrollbar-width: thin;
  scrollbar-color: #e0e3f0 #f5f6fa;
}

/* 确保滚动行为平滑 */
.sidebar, .main-content {
  scroll-behavior: smooth;
}
</style>
