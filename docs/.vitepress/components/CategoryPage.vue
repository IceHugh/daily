<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { getLatestNews, formatDate } from '../data/loaders'

const { frontmatter, page } = useData()

// 从页面路径确定板块
const category = computed(() => {
  const path = page.value.path
  if (path.startsWith('/web3')) return 'web3'
  if (path.startsWith('/ai')) return 'ai'
  if (path.startsWith('/opc')) return 'opc'
  return 'web3'
})

// 板块配置
const categoryConfig = {
  web3: {
    icon: '🌐',
    title: 'Web3 资讯',
    color: '#3b82f6',
    description: '区块链、DeFi、NFT、DAO 等前沿动态',
  },
  ai: {
    icon: '🤖',
    title: 'AI 资讯',
    color: '#8b5cf6',
    description: '人工智能、机器学习、工具应用最新进展',
  },
  opc: {
    icon: '🚀',
    title: '超级个体',
    color: '#10b981',
    description: '一人公司、独立开发、数字游民生活方式',
  },
}

// 当前板块配置
const currentConfig = computed(() => categoryConfig[category.value])
</script>

<template>
  <div class="category-page">
    <!-- Section Header -->
    <div class="section-header">
      <div class="header-content">
        <span class="section-icon">{{ currentConfig.icon }}</span>
        <h1 class="section-title">{{ currentConfig.title }}</h1>
        <p class="section-description">{{ currentConfig.description }}</p>
      </div>
    </div>

    <!-- 板块内容 -->
    <div class="content-wrapper">
      <Content class="markdown-content" />
    </div>

    <!-- 空状态提示 -->
    <div class="footer-cta">
      <div class="cta-content">
        <span class="cta-icon">💡</span>
        <h3>发现新资讯</h3>
        <p>朋友们，持续关注这个板块，获取最新资讯！</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.category-page {
  min-height: 100vh;
}

/* Section Header */
.section-header {
  padding: 3rem 1.5rem 2rem;
  background: linear-gradient(180deg, var(--vp-c-bg-soft) 0%, transparent 100%);
  border-bottom: 1px solid var(--vp-c-border);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.section-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 1rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  color: var(--vp-c-text-1);
}

.section-description {
  font-size: 1.125rem;
  color: var(--vp-c-text-3);
  margin: 0;
  max-width: 600px;
  margin: 0 auto;
}

/* Content Wrapper */
.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.markdown-content {
  color: var(--vp-c-text-2);
  line-height: 1.7;
}

/* Footer CTA */
.footer-cta {
  padding: 3rem 1.5rem;
  text-align: center;
  background: linear-gradient(180deg, transparent 0%, var(--vp-c-bg-soft) 100%);
}

.cta-content {
  max-width: 600px;
  margin: 0 auto;
}

.cta-icon {
  font-size: 2.5rem;
  display: block;
  margin-bottom: 1rem;
}

.cta-content h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
  color: var(--vp-c-text-1);
}

.cta-content p {
  font-size: 1rem;
  color: var(--vp-c-text-3);
  margin: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .section-icon {
    font-size: 2rem;
  }

  .section-title {
    font-size: 1.75rem;
  }

  .section-description {
    font-size: 1rem;
  }

  .cta-icon {
    font-size: 2rem;
  }

  .cta-content h3 {
    font-size: 1.25rem;
  }
}
</style>
