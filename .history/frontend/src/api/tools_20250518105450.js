import { tools } from '../data/tools'
import { categories } from '../data/categories'

// 这个文件实现了工具和分类相关的API接口:

// 1. getAllTools: 获取所有工具数据
// 返回完整的工具列表数据
export const getAllTools = () => {
  return Promise.resolve(tools)
}

// 2. getAllCategories: 获取所有分类数据 
// 返回完整的分类列表数据
export const getAllCategories = () => {
  return Promise.resolve(categories)
}

// 3. getToolsByCategory: 根据分类名称筛选工具
// 参数: category - 分类名称
// 返回该分类下的所有工具
export const getToolsByCategory = (category) => {
  const categoryTools = tools.filter(tool => tool.category === category)
  return Promise.resolve(categoryTools)
}

// 4. getToolsBySubCategory: 根据分类和子分类筛选工具
// 参数: category - 分类名称, subCategory - 子分类名称
// 返回该分类和子分类下的所有工具
export const getToolsBySubCategory = (category, subCategory) => {
  const subCategoryTools = tools.filter(
    tool => tool.category === category && tool.subCategory === subCategory
  )
  return Promise.resolve(subCategoryTools)
}

// 5. searchTools: 根据搜索词搜索工具
// 参数: query - 搜索关键词
// 返回标题匹配搜索词的工具列表
// 匹配规则:
// - 工具标题以搜索词开头
// - 工具标题中的单词以搜索词开头
export const searchTools = (query) => {
  const searchTerm = query.toLowerCase().trim()
  
  if (!searchTerm) {
    return Promise.resolve([])
  }
  
  const searchResults = tools.filter(tool => {
    const title = tool.title.toLowerCase()
    return title.startsWith(searchTerm) || 
           title.split(/\\s+/).some(word => word.startsWith(searchTerm))
  })
  
  return Promise.resolve(searchResults)
} 