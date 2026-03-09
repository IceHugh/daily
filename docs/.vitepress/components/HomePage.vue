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
.home-page {
  min-height: 100vh;
}

/* Hero Section */
.hero-section {
  padding: 4rem 1.5rem 3rem;
  text-align: center;
  background: linear-gradient(180deg, rgba(59, 130, 246, 0.1) 0%, transparent 100%);
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.gradient-text {
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.5rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.hero-date {
  font-size: 1rem;
  color: var(--vp-c-text-3);
}

/* Content Overview */
.content-overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  padding: 0 1.5rem 3rem;
  max-width: 1200px;
  margin: 0 auto;
}

.overview-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  cursor: pointer;
}

.overview-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.overview-card.web3 {
  border-left: 4px solid #3b82f6;
}

.overview-card.ai {
  border-left: 4px solid #8b5cf6;
}

.overview-card.opc {
  border-left: 4px solid #10b981;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.card-header .icon {
  font-size: 2rem;
}

.card-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
}

.card-stats {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
}

.label {
  font-size: 0.875rem;
  color: var(--vp-c-text-3);
}

/* News Section */
.news-section {
  padding: 2rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-title {
  font-size: 1.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
}

.section-title .icon {
  font-size: 1.75rem;
}

.view-all {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
}

.view-all:hover {
  color: var(--vp-c-brand-2);
  text-decoration: underline;
}

/* News Grid */
.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

/* News Card */
.news-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.news-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  border-color: var(--vp-c-brand-1);
}

.news-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.news-meta {
  margin-bottom: 0.75rem;
}

.news-date {
  font-size: 0.875rem;
  color: var(--vp-c-text-3);
}

.news-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
  line-height: 1.4;
  color: var(--vp-c-text-1);
}

.news-excerpt {
  font-size: 0.875rem;
  color: var(--vp-c-text-3);
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Empty State */
.empty-state {
  padding: 6rem 1.5rem;
  text-align: center;
}

.empty-content {
  max-width: 400px;
  margin: 0 auto;
}

.empty-icon {
  font-size: 4rem;
  display: block;
  margin-bottom: 1rem;
}

.empty-content h3 {
  font-size: 1.5rem;
  margin: 0 0 0.5rem 0;
  color: var(--vp-c-text-1);
}

.empty-content p {
  font-size: 1rem;
  color: var(--vp-c-text-3);
  margin: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1.125rem;
  }

  .news-grid {
    grid-template-columns: 1fr;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}
</style>
