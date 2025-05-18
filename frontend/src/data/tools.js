import { icons } from './icons'

export const tools = [
  // 最新推荐
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
    title: 'Claude 3',
    description: 'Anthropic 最新发布的AI助手，支持多模态输入',
    tags: [{ text: '新品', type: 'new' }, { text: 'EN', type: 'en' }],
    icon: icons.claude,
    category: '最新推荐',
    subCategory: '最新推荐',
    url: 'https://claude.ai'
  },
  {
    title: 'ChatGPT',
    description: 'OpenAI开发的AI对话模型',
    tags: [{ text: '热门', type: 'hot' }, { text: 'EN', type: 'en' }],
    icon: icons.chatgpt,
    category: '最新推荐',
    subCategory: '最新推荐',
    url: 'https://chat.openai.com'
  },
  {
    title: 'GitHub Copilot',
    description: 'AI驱动的代码智能助手',
    tags: [{ text: '热门', type: 'hot' }, { text: 'EN', type: 'en' }],
    icon: icons.github,
    category: '最新推荐',
    subCategory: '最新推荐',
    url: 'https://github.com/features/copilot'
  },
  
  // AI绘画
  {
    title: 'Midjourney',
    description: '一个探索新型思维模式为扩展人类想象力的工具。',
    tags: [{ text: '热门', type: 'hot' }, { text: 'EN', type: 'en' }],
    icon: icons.midjourney,
    category: 'AI绘画',
    subCategory: '热门推荐',
    url: 'https://www.midjourney.com'
  },
  {
    title: 'Stable Diffusion 3',
    description: '新一代文本到图像生成AI模型',
    tags: [{ text: '新品', type: 'new' }, { text: 'EN', type: 'en' }],
    icon: icons.stableDiffusion,
    category: 'AI绘画',
    subCategory: '热门推荐',
    url: 'https://stability.ai'
  },
  {
    title: '文心一格',
    description: '百度开发的AI艺术与创意平台',
    tags: [{ text: '免费', type: 'free' }, { text: 'CN', type: 'cn' }],
    icon: icons.wenxinyige,
    category: 'AI绘画',
    subCategory: '热门推荐',
    url: 'https://yige.baidu.com'
  },
  
  // AI写作
  {
    title: 'Claude 3',
    description: 'Anthropic 最新发布的AI助手，支持多模态输入',
    tags: [{ text: '新品', type: 'new' }, { text: 'EN', type: 'en' }],
    icon: icons.claude,
    category: 'AI写作',
    subCategory: '热门推荐',
    url: 'https://claude.ai'
  },
  {
    title: 'ChatGPT',
    description: 'OpenAI开发的AI对话模型',
    tags: [{ text: '热门', type: 'hot' }, { text: 'EN', type: 'en' }],
    icon: icons.chatgpt,
    category: 'AI写作',
    subCategory: '热门推荐',
    url: 'https://chat.openai.com'
  },
  
  // AI编程
  {
    title: 'GitHub Copilot',
    description: 'AI驱动的代码智能助手',
    tags: [{ text: '热门', type: 'hot' }, { text: 'EN', type: 'en' }],
    icon: icons.github,
    category: 'AI编程',
    subCategory: '热门推荐',
    url: 'https://github.com/features/copilot'
  },
  {
    title: 'Amazon CodeWhisperer',
    description: '亚马逊开发的AI代码助手',
    tags: [{ text: '免费', type: 'free' }, { text: 'EN', type: 'en' }],
    icon: icons.codewhisperer,
    category: 'AI编程',
    subCategory: '热门推荐',
    url: 'https://aws.amazon.com/codewhisperer/'
  },
  {
    title: 'Cursor',
    description: '基于AI的新一代代码编辑器',
    tags: [{ text: '新品', type: 'new' }, { text: 'EN', type: 'en' }],
    icon: icons.cursor,
    category: 'AI编程',
    subCategory: '热门推荐',
    url: 'https://cursor.sh'
  },
  
  // AI聊天
  {
    title: 'Character.AI',
    description: '与AI角色对话的平台',
    tags: [{ text: '热门', type: 'hot' }, { text: 'EN', type: 'en' }],
    icon: icons.characterai,
    category: 'AI聊天',
    subCategory: '热门推荐',
    url: 'https://character.ai'
  },
  {
    title: '通义千问',
    description: '阿里开发的AI对话模型',
    tags: [{ text: '免费', type: 'free' }, { text: 'CN', type: 'cn' }],
    icon: icons.tongyi,
    category: 'AI聊天',
    subCategory: '热门推荐',
    url: 'https://qianwen.aliyun.com'
  },
  {
    title: '文心一言',
    description: '百度开发的AI对话模型',
    tags: [{ text: '免费', type: 'free' }, { text: 'CN', type: 'cn' }],
    icon: icons.wenxin,
    category: 'AI聊天',
    subCategory: '热门推荐',
    url: 'https://yiyan.baidu.com'
  },
  
  // AI音频
  {
    title: 'ElevenLabs',
    description: '最先进的AI语音生成平台',
    tags: [{ text: '热门', type: 'hot' }, { text: 'EN', type: 'en' }],
    icon: icons.elevenlabs,
    category: 'AI音频',
    subCategory: '热门推荐',
    url: 'https://elevenlabs.io'
  },
  {
    title: 'Murf',
    description: 'AI语音生成器和编辑器',
    tags: [{ text: '新品', type: 'new' }, { text: 'EN', type: 'en' }],
    icon: icons.murf,
    category: 'AI音频',
    subCategory: '热门推荐',
    url: 'https://murf.ai'
  },
  {
    title: 'Soundraw',
    description: 'AI音乐生成平台',
    tags: [{ text: '热门', type: 'hot' }, { text: 'EN', type: 'en' }],
    icon: icons.soundraw,
    category: 'AI音频',
    subCategory: '热门推荐',
    url: 'https://soundraw.io'
  },
  
  // AI提示词
  {
    title: 'PromptBase',
    description: '提示词市场和社区',
    tags: [{ text: '热门', type: 'hot' }, { text: 'EN', type: 'en' }],
    icon: icons.promptbase,
    category: 'AI提示词',
    subCategory: '热门推荐',
    url: 'https://promptbase.com'
  },
  {
    title: 'PromptHero',
    description: 'AI艺术提示词分享平台',
    tags: [{ text: '免费', type: 'free' }, { text: 'EN', type: 'en' }],
    icon: icons.prompthero,
    category: 'AI提示词',
    subCategory: '热门推荐',
    url: 'https://prompthero.com'
  },
  {
    title: 'PromptHunt',
    description: '发现和分享AI提示词',
    tags: [{ text: '新品', type: 'new' }, { text: 'EN', type: 'en' }],
    icon: icons.prompthunt,
    category: 'AI提示词',
    subCategory: '热门推荐',
    url: 'https://prompthunt.com'
  },
  
  // AI设计
  {
    title: 'Figma',
    description: '支持AI功能的协作设计工具',
    tags: [{ text: '热门', type: 'hot' }, { text: 'EN', type: 'en' }],
    icon: icons.figma,
    category: 'AI设计',
    subCategory: '热门推荐',
    url: 'https://figma.com'
  },
  {
    title: 'Framer',
    description: '使用AI构建网站',
    tags: [{ text: '新品', type: 'new' }, { text: 'EN', type: 'en' }],
    icon: icons.framer,
    category: 'AI设计',
    subCategory: '热门推荐',
    url: 'https://framer.com'
  },
  {
    title: 'Uizard',
    description: 'AI驱动的设计平台',
    tags: [{ text: '免费', type: 'free' }, { text: 'EN', type: 'en' }],
    icon: icons.uizard,
    category: 'AI设计',
    subCategory: '热门推荐',
    url: 'https://uizard.io'
  },
  
  // AI数字人
  {
    title: 'D-ID',
    description: '创建和定制AI数字人',
    tags: [{ text: '热门', type: 'hot' }, { text: 'EN', type: 'en' }],
    icon: icons.did,
    category: 'AI数字人',
    subCategory: '热门推荐',
    url: 'https://www.d-id.com'
  },
  {
    title: 'Synthesia',
    description: 'AI视频生成平台',
    tags: [{ text: '热门', type: 'hot' }, { text: 'EN', type: 'en' }],
    icon: icons.synthesia,
    category: 'AI数字人',
    subCategory: '热门推荐',
    url: 'https://www.synthesia.io'
  },
  {
    title: 'Digital Humans',
    description: '实时AI数字人平台',
    tags: [{ text: '新品', type: 'new' }, { text: 'EN', type: 'en' }],
    icon: icons.digitalhumans,
    category: 'AI数字人',
    subCategory: '热门推荐',
    url: 'https://digitalhumans.com'
  },
  
  // AI插件
  {
    title: 'ChatGPT Plugins',
    description: 'ChatGPT官方插件市场',
    tags: [{ text: '热门', type: 'hot' }, { text: 'EN', type: 'en' }],
    icon: icons.chatgptplugins,
    category: 'AI插件',
    subCategory: '热门推荐',
    url: 'https://chat.openai.com/plugins'
  },
  {
    title: 'Claude Extension',
    description: 'Claude浏览器扩展',
    tags: [{ text: '新品', type: 'new' }, { text: 'EN', type: 'en' }],
    icon: icons.claudeext,
    category: 'AI插件',
    subCategory: '热门推荐',
    url: 'https://extension.anthropic.com'
  },
  {
    title: 'Raycast AI',
    description: 'AI增强的快捷启动器',
    tags: [{ text: '热门', type: 'hot' }, { text: 'EN', type: 'en' }],
    icon: icons.raycast,
    category: 'AI插件',
    subCategory: '热门推荐',
    url: 'https://www.raycast.com'
  }
] 