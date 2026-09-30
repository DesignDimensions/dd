import { projectStory } from './projectStories'
import { SAFETY_PIN_STORY } from './safetyPin'
import { SURYAGARH_STORY } from './suryagarh'

/**
 * Stories by slug — what the CMS will serve. A project is written out in
 * full (Suryagarh) or built from the shared template (every other one,
 * projectStories.js); articles are written out. Null when there is none.
 */
export function getProjectStory(slug) {
  return slug === 'suryagarh' ? SURYAGARH_STORY : projectStory(slug)
}

/** Articles by slug — served at /design-dialogue/<slug>. */
export const ARTICLES = { 'safety-pin': SAFETY_PIN_STORY }

export function getArticleStory(slug) {
  return ARTICLES[slug] ?? null
}
