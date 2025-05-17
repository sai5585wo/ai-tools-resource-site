<script setup>
import { ref, computed } from 'vue'
import ToolCard from './components/ToolCard.vue'
import icons from './assets/icons'

const menuOpen = ref(false)
const currentCategory = ref('最新推荐')
const searchQuery = ref('')
const expandedMenu = ref('')
// 使用响应式对象存储每个分类的子分类状态
const categorySubCategories = ref(
  categories.reduce((acc, category) => {
    acc[category.name] = '热门推荐'
    return acc
  }, {})
)

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
    subCategory: '电商图片生成'
  },
  {
    title: 'NightCafe Studio',
    description: '快速、美观、易用的AI艺术生成器。',
    tags: [{ text: '付费', type: 'pro' }, { text: 'EN', type: 'en' }],
    icon: '🌙',
    category: 'AI绘画',
    subCategory: '热门推荐'
  },
  {
    title: 'Tiamat',
    description: '点燃无限创想 国内领先的 AI 生成平台。',
    tags: [{ text: '新品', type: 'new' }, { text: '中文', type: 'zh' }],
    icon: '🌀',
    category: 'AI绘画',
    subCategory: '抠图背景去除'
  },
  {
    title: 'Lexica',
    description: '一款AI图片搜索引擎',
    tags: [{ text: '免费', type: 'free' }, { text: 'EN', type: 'en' }],
    icon: '📱',
    category: 'AI绘画',
    subCategory: 'LOGO生成'
  },

  // AI绘画
  {
    title: 'Scribble Diffusion',
    description: '将您的草图转化为精美图像。',
    tags: [{ text: '免费', type: 'free' }, { text: 'EN', type: 'en' }],
    icon: '✏️',
    category: 'AI绘画'
  },
  {
    title: 'LeonardoAI',
    description: '程序创造力，利用Leonardo AI的力量。',
    tags: [{ text: '付费', type: 'pro' }, { text: 'EN', type: 'en' }],
    icon: '👨‍🎨',
    category: 'AI绘画'
  },
  {
    title: 'DreamStudio',
    description: '智能创意工具，助力您的创作。',
    tags: [{ text: '推荐', type: 'hot' }, { text: 'EN', type: 'en' }],
    icon: '🎨',
    category: 'AI绘画'
  },
  {
    title: 'LibilibAI',
    description: '中国领先的AI创作平台,具有强大的中文理解能力。',
    tags: [{ text: '新品', type: 'new' }, { text: '中文', type: 'zh' }],
    icon: '🎯',
    category: 'AI绘画'
  },
  {
    title: '无界 AI',
    description: '无界 AI - 人人都是艺术家。',
    tags: [{ text: '免费', type: 'free' }, { text: '中文', type: 'zh' }],
    icon: '🎼',
    category: 'AI绘画'
  },
  {
    title: 'Clipdrop',
    description: 'AI 强力图像处理工具。',
    tags: [{ text: '推荐', type: 'hot' }, { text: 'EN', type: 'en' }],
    icon: '✂️',
    category: 'AI绘画'
  },
  {
    title: 'Adobe Firefly',
    description: '创造力无限，文字变艺术。',
    tags: [{ text: '付费', type: 'pro' }, { text: 'EN', type: 'en' }],
    icon: '🔥',
    category: 'AI绘画'
  },
  {
    title: '吐司 Tusi.Art',
    description: '在线生图的 AI 梗图分享社区。',
    tags: [{ text: '免费', type: 'free' }, { text: '中文', type: 'zh' }],
    icon: '🍞',
    category: 'AI绘画'
  },
  {
    title: '悠船',
    description: '让创意更简单，更高效。',
    tags: [{ text: '推荐', type: 'hot' }, { text: '中文', type: 'zh' }],
    icon: '⛵',
    category: 'AI绘画'
  },
  {
    title: '海艺SeaArt',
    description: '免费AI图片生成平台。',
    tags: [{ text: '免费', type: 'free' }, { text: '中文', type: 'zh' }],
    icon: '🌊',
    category: 'AI绘画'
  },
  {
    title: '触手 AI',
    description: '国产AI绘画生成工具平台。',
    tags: [{ text: '新品', type: 'new' }, { text: '中文', type: 'zh' }],
    icon: '🤖',
    category: 'AI绘画'
  },
  {
    title: 'Bing Image Creator',
    description: '来自Microsoft Bing的图像创作工具。',
    tags: [{ text: '免费', type: 'free' }, { text: 'EN', type: 'en' }],
    icon: '🔍',
    category: 'AI绘画'
  },
  {
    title: '即梦',
    description: '一款AI创作工具，通过智能描述和创意提示生成图像。',
    tags: [{ text: '推荐', type: 'hot' }, { text: '中文', type: 'zh' }],
    icon: '💭',
    category: 'AI绘画'
  },
  {
    title: 'nijijourney',
    description: '魔法般的二次元绘画生成！',
    tags: [{ text: '付费', type: 'pro' }, { text: 'JP', type: 'jp' }],
    icon: '✨',
    category: 'AI绘画'
  },
  {
    title: 'Getimg.ai',
    description: '强大的AI工具套件。',
    tags: [{ text: '推荐', type: 'hot' }, { text: 'EN', type: 'en' }],
    icon: '🎨',
    category: 'AI绘画'
  },
  {
    title: 'Ideogram.ai',
    description: '释放一次性生成多种风格的艺术图像。',
    tags: [{ text: '新品', type: 'new' }, { text: 'EN', type: 'en' }],
    icon: '🎭',
    category: 'AI绘画'
  },
  {
    title: 'Canva',
    description: '通过 AI 文本生成图像,各种完美选项。',
    tags: [{ text: '热门', type: 'hot' }, { text: '中英', type: 'zh' }],
    icon: '🎨',
    category: 'AI绘画'
  },
  {
    title: 'WHEE',
    description: '一刻打造理想的WHEE。',
    tags: [{ text: '新品', type: 'new' }, { text: '中文', type: 'zh' }],
    icon: '🎪',
    category: 'AI绘画'
  },

  // AI写作
  {
    title: 'ChatGPT Plus',
    description: 'OpenAI的高级AI写作助手，支持多语言创作和编辑。',
    tags: [{ text: '付费', type: 'pro' }, { text: '中英', type: 'zh' }],
    icon: icons.chatgpt,
    category: 'AI写作',
    url: 'https://chat.openai.com'
  },
  {
    title: 'Claude 3',
    description: 'Anthropic的最新AI助手，擅长学术写作和文献分析。',
    tags: [{ text: '新品', type: 'new' }, { text: 'EN', type: 'en' }],
    icon: icons.claude,
    category: 'AI写作',
    url: 'https://claude.ai'
  },
  {
    title: '写作猫',
    description: '中文AI写作助手，支持多种文体和场景的写作需求。',
    tags: [{ text: '推荐', type: 'hot' }, { text: '中文', type: 'zh' }],
    icon: icons.xiezuomao,
    category: 'AI写作',
    url: 'https://xiezuocat.com'
  },

  // AI视频
  {
    title: 'Runway Gen-2',
    description: '专业的AI视频生成和编辑工具，支持文本生成视频。',
    tags: [{ text: '专业版', type: 'pro' }, { text: 'EN', type: 'en' }],
    icon: icons.runway,
    category: 'AI视频',
    url: 'https://runwayml.com'
  },
  {
    title: 'Pika Labs',
    description: '创新的AI视频创作平台，支持多种视频特效和转场。',
    tags: [{ text: '新品', type: 'new' }, { text: 'EN', type: 'en' }],
    icon: icons.pika,
    category: 'AI视频',
    url: 'https://pika.art'
  },
  {
    title: 'HeyGen',
    description: 'AI数字人视频生成平台，支持多语言配音和表情同步。',
    tags: [{ text: '热门', type: 'hot' }, { text: '中英', type: 'zh' }],
    icon: icons.heygen,
    category: 'AI视频',
    url: 'https://www.heygen.com'
  },

  // AI办公
  {
    title: 'Notion AI',
    description: '集成AI功能的全能办公工具，支持智能写作和内容管理。',
    tags: [{ text: '推荐', type: 'hot' }, { text: '中英', type: 'zh' }],
    icon: icons.notion,
    category: 'AI办公',
    url: 'https://www.notion.so'
  },
  {
    title: 'Microsoft 365 Copilot',
    description: '微软Office套件的AI助手，提升办公效率。',
    tags: [{ text: '新品', type: 'new' }, { text: '中英', type: 'zh' }],
    icon: icons.microsoft,
    category: 'AI办公',
    url: 'https://www.microsoft.com/microsoft-365/copilot'
  },
  {
    title: 'Canva AI',
    description: '智能设计平台，支持AI生成设计和编辑功能。',
    tags: [{ text: '免费版', type: 'free' }, { text: '中英', type: 'zh' }],
    icon: icons.canva,
    category: 'AI办公',
    url: 'https://www.canva.com'
  },

  // AI编程
  {
    title: 'GitHub Copilot',
    description: '强大的AI编程助手，支持多种编程语言的代码生成。',
    tags: [{ text: '付费', type: 'pro' }, { text: 'EN', type: 'en' }],
    icon: icons.github,
    category: 'AI编程',
    url: 'https://github.com/features/copilot'
  },
  {
    title: 'CodeWhisperer',
    description: '亚马逊开发的AI编程助手，专注于安全和效率。',
    tags: [{ text: '免费', type: 'free' }, { text: 'EN', type: 'en' }],
    icon: icons.codewhisperer,
    category: 'AI编程',
    url: 'https://aws.amazon.com/codewhisperer'
  },
  {
    title: 'Cursor',
    description: '基于AI的新一代代码编辑器，支持自然语言编程。',
    tags: [{ text: '推荐', type: 'hot' }, { text: 'EN', type: 'en' }],
    icon: icons.cursor,
    category: 'AI编程',
    url: 'https://cursor.sh'
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
  }
]

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
      const currentSubCategory = categorySubCategories.value[currentCategory.value]
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

// 添加获取特定分类工具的方法
const getToolsByCategory = (category) => {
  return tools.filter(tool => tool.category === category)
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
              v-for="item in category.submenu"
              :key="item"
              :href="'#' + category.name"
              class="submenu-item"
              :class="{ 'active': categorySubCategories[category.name] === item }"
              @click.prevent="categorySubCategories[category.name] = item"
            >
              {{ item }}
            </a>
          </div>
        </div>
      </div>
    </nav>

    <main class="main-content">
      <!-- 热门推荐 -->
      <section id="最新推荐" class="category-section">
        <div class="content-header">
          <h1>最新推荐</h1>
        </div>
        <div class="tools-grid hot-recommendations">
          <ToolCard
            v-for="tool in getToolsByCategory('最新推荐')"
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
                v-for="tag in categories.find(c => c.name === 'AI绘画').submenu" 
                :key="tag"
                :class="{ 'active': categorySubCategories['AI绘画'] === tag }"
                @click.prevent="categorySubCategories['AI绘画'] = tag"
              >
                {{ tag }}
              </a>
            </div>
          </div>
        </div>
        <div class="tools-grid">
          <ToolCard
            v-for="tool in filteredTools"
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
                v-for="tag in categories.find(c => c.name === 'AI写作').submenu" 
                :key="tag"
                :class="{ 'active': categorySubCategories['AI写作'] === tag }"
                @click.prevent="categorySubCategories['AI写作'] = tag"
              >
                {{ tag }}
              </a>
            </div>
          </div>
        </div>
        <div class="tools-grid">
          <ToolCard
            v-for="tool in filteredTools"
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
                v-for="tag in category.submenu" 
                :key="tag"
                :class="{ 'active': categorySubCategories[category.name] === tag }"
                @click.prevent="categorySubCategories[category.name] = tag"
              >
                {{ tag }}
              </a>
            </div>
          </div>
        </div>
        <div class="tools-grid">
          <ToolCard
            v-for="tool in filteredTools"
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
</style>
