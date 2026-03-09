import { createContentLoader } from 'vitepress'

/**
 * 加载 Web3 板块的最新资讯
 */
export const web3News = createContentLoader('web3/**/*.md', {
  includeExcerpt: true,
  transform(raw, { frontmatter, url }) {
    return {
      title: frontmatter.title || raw.slice(0, 50) + '...',
      date: frontmatter.date || '2025-01-01',
      url,
      excerpt: raw.slice(0, 150) + '...',
    }
  },
  sort: (a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return dateB - dateA
  },
})

/**
 * 加载 AI 板块的最新资讯
 */
export const aiNews = createContentLoader('ai/**/*.md', {
  includeExcerpt: true,
  transform(raw, { frontmatter, url }) {
    return {
      title: frontmatter.title || raw.slice(0, 50) + '...',
      date: frontmatter.date || '2025-01-01',
      url,
      excerpt: raw.slice(0, 150) + '...',
    }
  },
  sort: (a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return dateB - dateA
  },
})

/**
 * 加载 OPC 板块的最新资讯
 */
export const opcNews = createContentLoader('opc/**/*.md', {
  includeExcerpt: true,
  transform(raw, { frontmatter, url }) {
    return {
      title: frontmatter.title || raw.slice(0, 50) + '...',
      date: frontmatter.date || '2025-01-01',
      url,
      excerpt: raw.slice(0, 150) + '...',
    }
  },
  sort: (a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return dateB - dateA
  },
})
/**
 * 获取当日资讯
 */
export function getTodayNews(articles: any[]) {
  const today = new Date().toISOString().split('T')[0]
  return articles.filter((article) => article.date === today)
}

/**
 * 获取最新资讯（限制数量）
 */
export function getLatestNews(articles: any[], limit: number = 5) {
  return articles.slice(0, limit)
}

/**
 * 格式化日期
 */
export function formatDate(date: string): string {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
