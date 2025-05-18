import { icons } from './icons'

export const tools = [
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
  // ... 其他工具数据 ...
] 