<template>
  <a :href="url" target="_blank" rel="noopener noreferrer" class="tool-card">
    <div class="tool-header">
      <div class="tool-icon">
        <img v-if="icon.startsWith('http')" :src="icon" :alt="title">
        <span v-else class="emoji-icon">{{ icon }}</span>
      </div>
      <div class="tool-title">{{ title }}</div>
    </div>
    <p class="tool-description">{{ description }}</p>
    <div class="tool-tags">
      <span class="tag" :class="tag.type" v-for="tag in tags" :key="tag.text">{{ tag.text }}</span>
    </div>
  </a>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tags: {
    type: Array,
    default: () => []
  },
  icon: {
    type: String,
    default: '🤖'
  },
  url: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.tool-card {
  background: white;
  border-radius: 12px;
  padding: 1rem;
  height: 140px;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: all 0.3s;
  border: 1px solid #eee;
  text-decoration: none;
  cursor: pointer;
}

.tool-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border-color: #e0e0e0;
}

.tool-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.tool-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  flex-shrink: 0;
}

.tool-icon img {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.emoji-icon {
  font-size: 1.25rem;
}

.tool-title {
  font-size: 1rem;
  font-weight: 500;
  color: #333;
  margin: 0;
}

.tool-description {
  font-size: 0.875rem;
  color: #666;
  margin: 0;
  line-height: 1.5;
  flex: 1;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  height: 21px; /* 设置固定高度，等于 font-size * line-height */
}

.tool-tags {
  display: flex;
  gap: 0.5rem;
  margin-top: auto;
}

.tag {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
}

.tag.hot {
  background: #fff2f0;
  color: #ff4d4f;
}

.tag.new {
  background: #f0f5ff;
  color: #4086f4;
}

.tag.free {
  background: #f6ffed;
  color: #52c41a;
}

.tag.pro {
  background: #fff7e6;
  color: #fa8c16;
}

.tag.en {
  background: #f5f5f5;
  color: #666;
}

.tag.zh {
  background: #e6fffb;
  color: #13c2c2;
}

.tag.jp {
  background: #fff0f6;
  color: #eb2f96;
}
</style> 