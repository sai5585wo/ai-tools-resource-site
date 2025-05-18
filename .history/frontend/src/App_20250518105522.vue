<script setup>
import { ref, computed, onMounted } from 'vue'
import ToolCard from './components/ToolCard.vue'
import { icons } from './data/icons'
import { getAllTools, getAllCategories, searchTools } from './api/tools'

const menuOpen = ref(false)
const currentCategory = ref('最新推荐')
const searchQuery = ref('')
const expandedMenu = ref('')
const tools = ref([])
const categories = ref([])

// 在组件挂载时获取数据
onMounted(async () => {
  const [toolsData, categoriesData] = await Promise.all([
    getAllTools(),
    getAllCategories()
  ])
  tools.value = toolsData
  categories.value = categoriesData
})

// 使用从API获取的分类数据
// categories 已经在上面定义为 ref([])，并在 onMounted 中获取数据
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

const filteredTools = computed(() => {
  if (!searchQuery.value) {
    return tools.filter(tool => {
      const matchesCategory = currentCategory.value === '最新推荐' 
        ? tool.category === '最新推荐'
        : tool.category === currentCategory.value
      
      // 如果当前分类有子分类且选择了特定子分类
      const category = categories.find(c => c.name === currentCategory.value)
      if (category?.hasSubmenu) {
        const currentSubCategory = getCurrentSubCategory(currentCategory.value)
        if (currentSubCategory === '热门推荐') {
          // 显示该分类下标记为热门的工具
          return matchesCategory && tool.tags.some(tag => tag.type === 'hot')
        } else {
          return matchesCategory && tool.subCategory === currentSubCategory
        }
      }
      
      return matchesCategory
    })
  }
  
  // 当有搜索查询时，搜索所有工具，不受分类限制
  const searchTerm = searchQuery.value.toLowerCase().trim()
  
  // 如果搜索词为空，返回空数组
  if (!searchTerm) {
    return []
  }
  
  // 首先找出所有工具
  const allMatches = tools.map(tool => {
    const title = tool.title.toLowerCase()
    const titleStartsWithMatch = title.startsWith(searchTerm)
    const titleWordStartsWithMatch = title.split(/\s+/).some(word => word.startsWith(searchTerm))
    
    return {
      tool,
      titleStartsWithMatch,
      titleWordStartsWithMatch
    }
  })
  
  // 过滤并排序结果
  const matches = allMatches.filter(match => 
    match.titleStartsWithMatch || match.titleWordStartsWithMatch
  )
  
  // 按匹配优先级排序
  matches.sort((a, b) => {
    // 标题开头匹配的优先级最高
    if (a.titleStartsWithMatch && !b.titleStartsWithMatch) return -1
    if (!a.titleStartsWithMatch && b.titleStartsWithMatch) return 1
    // 其次是标题中的单词开头匹配
    if (a.titleWordStartsWithMatch && !b.titleWordStartsWithMatch) return -1
    if (!a.titleWordStartsWithMatch && b.titleWordStartsWithMatch) return 1
    return 0
  })
  
  // 返回排序后的工具列表
  return matches.map(match => match.tool)
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
      <section id="最新推荐" class="category-section" v-show="!searchQuery">
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

      <!-- 搜索结果 -->
      <section v-if="searchQuery" class="category-section">
        <div class="content-header">
          <h1>搜索结果</h1>
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

      <!-- 常规分类 (当没有搜索时显示) -->
      <template v-if="!searchQuery">
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

        <!-- 其他分类 -->
        <section 
          v-for="category in categories.slice(2)" 
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
      </template>
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
