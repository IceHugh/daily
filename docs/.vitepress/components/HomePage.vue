<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useData } from 'vitepress'
import { web3News, aiNews, opcNews, getLatestNews, formatDate } from '../data/loaders'

const { frontmatter } = useData()

// 加载各个板块的资讯
const web3Articles = computed(() => getLatestNews(web3News, 3))
const aiArticles = computed(() => getLatestNews(aiNews, 3))
const opcArticles = computed(() => getLatestNews(opcNews, 3))

// 当前日期
const currentDate = ref('')
onMounted(() => {
  currentDate.value = formatDate(new Date().toISOString())
})

// 日期问候
const greeting = computed(() => {
  const hour = new Date().getHours()
  if (hour < 12) return '早上好'
  if (hour < 18) return '下午好'
  return '晚上好'
})
</script>

<template>
  <div class="home-page">
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">
          <span class="gradient-text">{{ greeting }}</span>
          ，朋友们！
        </h1>
        <p class="hero-subtitle">{{ frontmatter.tagline }}</p>
        <p class="hero-date">{{ currentDate }} · 今日资讯</p>
      </div>
    </div>

    <!-- 今日内容概览 -->
    <div class="content-overview">
      <div class="overview-card web3">
        <div class="card-header">
          <span class="icon">🌐</span>
          <h2>Web3</h2>
        </div>
        <div class="card-stats">
          <span class="stat">{{ web3Articles.length }} 篇</span>
          <span class="label">最新资讯</span>
        </div>
      </div>

      <div class="overview-card ai">
        <div class="card-header">
          <span class="icon">🤖</span>
          <h2>AI</h2>
        </div>
        <div class="card-stats">
          <span class="stat">{{ aiArticles.length }} 篇</span>
          <span class="label">最新资讯</span>
        </div>
      </div>

      <div class="overview-card opc">
        <div class="card-header">
          <span class="icon">🚀</span>
          <h2>OPC</h2>
        </div>
        <div class="card-stats">
          <span class="stat">{{ opcArticles.length }} 篇</span>
          <span class="label">最新资讯</span>
        </div>
      </div>
    </div>

    <!-- Web3 资讯 -->
    <section v-if="web3Articles.length > 0" class="news-section">
      <div class="section-header">
        <h2 class="section-title">
          <span class="icon">🌐</span>
          Web3 最新动态
        </h2>
        <a href="/web3/" class="view-all">查看全部 →</a>
      </div>
      <div class="news-grid">
        <article v-for="article in web3Articles" :key="article.url" class="news-card">
          <a :href="article.url" class="news-link">
            <div class="news-meta">
              <time class="news-date">{{ formatDate(article.date) }}</time>
            </div>
            <h3 class="news-title">{{ article.title }}</h3>
            <p class="news-excerpt">{{ article.excerpt }}</p>
          </a>
        </article>
      </div>
    </section>

    <!-- AI 资讯 -->
    <section v-if="aiArticles.length > 0" class="news-section">
      <div class="section-header">
        <h2 class="section-title">
          <span class="icon">🤖</span>
          AI 最新动态
        </h2>
        <a href="/ai/" class="view-all">查看全部 →</a>
      </div>
      <div class="news-grid">
        <article v-for="article in aiArticles" :key="article.url" class="news-card">
          <a :href="article.url" class="news-link">
            <div class="news-meta">
              <time class="news-date">{{ formatDate(article.date) }}</time>
            </div>
            <h3 class="news-title">{{ article.title }}</h3>
            <p class="news-excerpt">{{ article.excerpt }}</p>
          </a>
        </article>
      </div>
    </section>

    <!-- OPC 资讯 -->
    <section v-if="opcArticles.length > 0" class="news-section">
      <div class="section-header">
        <h2 class="section-title">
          <span class="icon">🚀</span>
          超级个体最新动态
        </h2>
        <a href="/opc/" class="view-all">查看全部 →</a>
      </div>
      <div class="news-grid">
        <article v-for="article in opcArticles" :key="article.url" class="news-card">
          <a :href="article.url" class="news-link">
            <div class="news-meta">
              <time class="news-date">{{ formatDate(article.date) }}</time>
            </div>
            <h3 class="news-title">{{ article.title }}</h3>
            <p class="news-excerpt">{{ article.excerpt }}</p>
          </a>
        </article>
      </div>
    </section>

    <!-- 空状态 -->
    <div v-if="web3Articles.length === 0 && aiArticles.length === 0 && opcArticles.length === 0" class="empty-state">
      <div class="empty-content">
        <span class="empty-icon">📝</span>
        <h3>暂无资讯</h3>
        <p>朋友们，还没有资讯发布，敬请期待！</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ==============================
   极简现代风格首页组件
   Minimalist Modern Homepage
   ============================== */

.home-page {
  min-height: 100vh;
}

/* ==============================
   Hero 区域 - 极简设计
   ============================== */
.hero-section {
  padding: var(--spacing-6) var(--spacing-2);
  text-align: center;
  background-color: var(--color-bg-primary);
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: var(--font-size-h1);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0 0 var(--spacing-2) 0;
  line-height: var(--line-height-title);
  letter-spacing: -0.02em;
}

.hero-subtitle {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-regular);
  color: var(--color-text-secondary);
  margin: 0 0 var(--spacing-1) 0;
  line-height: var(--line-height-body);
}

.hero-date {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-regular);
  color: var(--color-text-tertiary);
  margin: 0;
}

/* ==============================
   内容概览卡片 - 简洁设计
   ============================== */
.content-overview {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-3);
  padding: 0 var(--spacing-2) var(--spacing-5);
  max-width: 1200px;
  margin: 0 auto;
}

.overview-card {
  background-color: var(--color-bg-primary);
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--border-radius);
  padding: var(--spacing-4) var(--spacing-3);
  transition: all var(--transition-base);
  cursor: pointer;
  position: relative;
}

.overview-card:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow);
}

.card-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  margin-bottom: var(--spacing-2);
}

.card-header .icon {
  font-size: 2rem;
  line-height: 1;
}

.card-header h2 {
  font-size: var(--font-size-h5);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0;
}

.card-stats {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1);
}

.stat {
  font-size: 2rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  line-height: 1;
}

.label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-regular);
  color: var(--color-text-tertiary);
}

/* ==============================
   资讯板块 - 清晰布局
   ============================== */
.news-section {
  padding: var(--spacing-4) var(--spacing-2);
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-3);
  padding-bottom: var(--spacing-2);
  border-bottom: var(--border-width) solid var(--color-border);
}

.section-title {
  font-size: var(--font-size-h4);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  margin: 0;
}

.section-title .icon {
  font-size: 1.5rem;
  line-height: 1;
}

.view-all {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--color-primary);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.view-all:hover {
  color: var(--color-accent);
  text-decoration: underline;
}

/* ==============================
   资讯网格 - 3列布局
   ============================== */
.news-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-3);
}

/* ==============================
   资讯卡片 - 极简设计
   ============================== */
.news-card {
  background-color: var(--color-bg-primary);
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--border-radius);
  padding: var(--spacing-3);
  transition: all var(--transition-base);
}

.news-card:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow);
}

.news-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.news-meta {
  margin-bottom: var(--spacing-2);
}

.news-date {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-regular);
  color: var(--color-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.news-title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--spacing-2) 0;
  line-height: var(--line-height-tight);
}

.news-excerpt {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-regular);
  color: var(--color-text-secondary);
  line-height: var(--line-height-body);
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* ==============================
   穩状态 - 简洁设计
   ============================== */
.empty-state {
  padding: var(--spacing-7) var(--spacing-2);
  text-align: center;
}

.empty-content {
  max-width: 400px;
  margin: 0 auto;
}

.empty-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: var(--spacing-2);
  line-height: 1;
}

.empty-content h3 {
  font-size: var(--font-size-h5);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--spacing-1) 0;
}

.empty-content p {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-regular);
  color: var(--color-text-secondary);
  margin: 0;
}

/* ==============================
   响应式设计 - Responsive
   ============================== */

/* 平板设备 */
@media (max-width: 1024px) {
  .content-overview {
    grid-template-columns: repeat(2, 1fr);
  }

  .news-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 移动设备 */
@media (max-width: 768px) {
  .hero-section {
    padding: var(--spacing-5) var(--spacing-2);
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: var(--font-size-base);
  }

  .content-overview {
    grid-template-columns: 1fr;
    gap: var(--spacing-2);
    padding: 0 var(--spacing-2) var(--spacing-4);
  }

  .news-section {
    padding: var(--spacing-3) var(--spacing-2);
  }

  .news-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-2);
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-2);
  }

  .empty-state {
    padding: var(--spacing-5) var(--spacing-2);
  }
}
</style>
