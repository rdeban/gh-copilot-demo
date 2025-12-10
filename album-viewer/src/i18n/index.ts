import { ref, computed } from 'vue'
import en from './locales/en'
import fr from './locales/fr'
import de from './locales/de'

export type Locale = 'en' | 'fr' | 'de'

export type TranslationSchema = typeof en

const translations: Record<Locale, TranslationSchema> = {
  en,
  fr,
  de
}

const currentLocale = ref<Locale>('en')

export function useI18n() {
  const t = computed(() => translations[currentLocale.value])
  
  const setLocale = (locale: Locale) => {
    currentLocale.value = locale
    localStorage.setItem('locale', locale)
  }
  
  const locale = computed(() => currentLocale.value)
  
  // Load saved locale from localStorage
  const savedLocale = localStorage.getItem('locale') as Locale | null
  if (savedLocale && translations[savedLocale]) {
    currentLocale.value = savedLocale
  }
  
  return {
    t,
    locale,
    setLocale
  }
}
