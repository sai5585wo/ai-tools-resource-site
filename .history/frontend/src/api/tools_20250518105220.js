import { tools } from '../data/tools'
import { categories } from '../data/categories'

// 获取所有工具
export const getAllTools = () => {
  return Promise.resolve(tools)
}

// 获取所有分类
export const getAllCategories = () => {
  return Promise.resolve(categories)
}

// 根据分类获取工具
export const getToolsByCategory = (category) => {
  const categoryTools = tools.filter(tool => tool.category === category)
  return Promise.resolve(categoryTools)
}

// 根据子分类获取工具
export const getToolsBySubCategory = (category, subCategory) => {
  const subCategoryTools = tools.filter(
    tool => tool.category === category && tool.subCategory === subCategory
  )
  return Promise.resolve(subCategoryTools)
}

// 搜索工具
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