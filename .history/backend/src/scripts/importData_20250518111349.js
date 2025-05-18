require('dotenv').config();
const mongoose = require('mongoose');
const { tools } = require('../../frontend/src/data/tools');
const { categories } = require('../../frontend/src/data/categories');
const Tool = require('../models/Tool');
const Category = require('../models/Category');

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