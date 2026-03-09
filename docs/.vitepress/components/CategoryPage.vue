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
    description: '区块链、DeFi、NFT、DAO 等前沿动态',
  },
  ai: {
    icon: '🤖',
    title: 'AI 资讯',
    description: '人工智能、机器学习、工具应用最新进展',
  },
  opc: {
    icon: '🚀',
    title: '超级个体',
    description: '一人公司、独立开发、数字游民生活方式',
  },
}

// 当前板块配置
const currentConfig = computed(() => categoryConfig[category.value])
</script>

<template>
  <div class="category-page">
    <!-- 极简头部 - 无背景，纯文字 -->
    <header class="page-header">
      <div class="header-inner">
        <span class="header-icon">{{ currentConfig.icon }}</span>
        <h1 class="header-title">{{ currentConfig.title }}</h1>
        <p class="header-description">{{ currentConfig.description }}</p>
      </div>
    </header>

    <!-- 内容区域 - 大量留白 -->
    <main class="content-wrapper">
      <div class="content-inner">
        <Content class="markdown-content" />
      </div>
    </main>

    <!-- 底部引导 - 极简设计 -->
    <footer class="page-footer">
      <div class="footer-inner">
        <span class="footer-icon">💡</span>
        <p class="footer-text">持续关注，获取最新资讯</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* 使用 CSS 变量确保一致性 */
.category-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* ==============================
   极简头部设计
   ============================== */
.page-header {
  padding: var(--spacing-6) var(--spacing-4) var(--spacing-5);
  text-align: center;
}

.header-inner {
  max-width: 720px;
  margin: 0 auto;
}

.header-icon {
  font-size: var(--font-size-h3);
  display: block;
  margin-bottom: var(--spacing-2);
  line-height: 1;
}

.header-title {
  font-size: var(--font-size-h1);
  font-weight: var(--font-weight-bold);
  margin: 0 0 var(--spacing-3) 0;
  color: var(--color-text-primary);
  line-height: var(--line-height-title);
}

.header-description {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  margin: 0;
  line-height: var(--line-height-body);
}

/* ==============================
   内容区域设计
   ============================== */
.content-wrapper {
  flex: 1;
  padding: 0 var(--spacing-4);
}

.content-inner {
  max-width: 720px;
  margin: 0 auto;
}

.markdown-content {
  color: var(--color-text-primary);
  line-height: var(--line-height-body);
}

/* 重置 Markdown 标题样式，使用统一的设计语言 */
.markdown-content :deep(h2) {
  font-size: var(--font-size-h3);
  font-weight: var(--font-weight-semibold);
  margin-top: var(--spacing-6);
  margin-bottom: var(--spacing-3);
  color: var(--color-text-primary);
  border-bottom: var(--border-width) solid var(--color-border);
  padding-bottom: var(--spacing-2);
}

.markdown-content :deep(h3) {
  font-size: var(--font-size-h4);
  font-weight: var(--font-weight-semibold);
  margin-top: var(--spacing-5);
  margin-bottom: var(--spacing-2);
  color: var(--color-text-primary);
}

.markdown-content :deep(p) {
  margin-bottom: var(--spacing-3);
}

.markdown-content :deep(ul),
.markdown-content :deep(ol) {
  margin-bottom: var(--spacing-3);
  padding-left: var(--spacing-4);
}

.markdown-content :deep(li) {
  margin-bottom: var(--spacing-2);
}

/* ==============================
   底部引导设计
   ============================== */
.page-footer {
  padding: var(--spacing-6) var(--spacing-4);
  text-align: center;
  background-color: var(--color-bg-secondary);
}

.footer-inner {
  max-width: 480px;
  margin: 0 auto;
}

.footer-icon {
  font-size: var(--font-size-h4);
  display: block;
  margin-bottom: var(--spacing-2);
  line-height: 1;
}

.footer-text {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  margin: 0;
  line-height: var(--line-height-body);
}

/* ==============================
   响应式设计
   ============================== */
@media (max-width: 768px) {
  .page-header {
    padding: var(--spacing-5) var(--spacing-3) var(--spacing-4);
  }

  .header-icon {
    font-size: var(--font-size-h4);
    margin-bottom: var(--spacing-1);
  }

  .header-title {
    font-size: var(--font-size-h2);
    margin-bottom: var(--spacing-2);
  }

  .header-description {
    font-size: var(--font-size-base);
  }

  .content-wrapper {
    padding: 0 var(--spacing-3);
  }

  .markdown-content :deep(h2) {
    font-size: var(--font-size-h4);
    margin-top: var(--spacing-5);
  }

  .markdown-content :deep(h3) {
    font-size: var(--font-size-h5);
    margin-top: var(--spacing-4);
  }

  .page-footer {
    padding: var(--spacing-5) var(--spacing-3);
  }

  .footer-icon {
    font-size: var(--font-size-h5);
  }

  .footer-text {
    font-size: var(--font-size-sm);
  }
}

@media (max-width: 480px) {
  .page-header {
    padding: var(--spacing-4) var(--spacing-2) var(--spacing-3);
  }

  .header-title {
    font-size: var(--font-size-h3);
  }

  .header-description {
    font-size: var(--font-size-sm);
  }

  .content-wrapper {
    padding: 0 var(--spacing-2);
  }

  .page-footer {
    padding: var(--spacing-4) var(--spacing-2);
  }
}
</style>
