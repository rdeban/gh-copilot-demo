# Internationalization (i18n)

This directory contains the internationalization setup for the Album Viewer application.

## Supported Languages

- **English (en)** - Default
- **French (fr)**
- **German (de)**

## Structure

```
i18n/
├── index.ts          # Main i18n composable with useI18n()
└── locales/
    ├── en.ts         # English translations
    ├── fr.ts         # French translations
    └── de.ts         # German translations
```

## Usage

Import the `useI18n` composable in your component:

```typescript
import { useI18n } from '@/i18n'

const { t, locale, setLocale } = useI18n()
```

### Accessing Translations

```vue
<template>
  <h1>{{ t.header.title }}</h1>
  <p>{{ t.header.subtitle }}</p>
</template>
```

### Changing Language

```typescript
setLocale('fr') // Switch to French
setLocale('de') // Switch to German
setLocale('en') // Switch to English
```

### Current Locale

```typescript
const currentLanguage = locale.value // 'en', 'fr', or 'de'
```

## Adding New Languages

1. Create a new locale file in `locales/` (e.g., `es.ts` for Spanish)
2. Copy the structure from `en.ts` and translate all values
3. Import the new locale in `index.ts`
4. Add it to the `translations` object and `Locale` type
5. Update the language selector in `App.vue`

Example:

```typescript
// locales/es.ts
export default {
  header: {
    title: '🎵 Colección de Álbumes',
    subtitle: 'Descubre increíbles álbumes de música'
  },
  // ... rest of translations
}
```

## Translation Schema

All locale files must follow the same schema defined in `en.ts`:

```typescript
{
  header: {
    title: string
    subtitle: string
  },
  loading: {
    message: string
  },
  error: {
    message: string
    retry: string
  },
  album: {
    addToCart: string
    preview: string
  },
  language: {
    select: string
    en: string
    fr: string
    de: string
  }
}
```

## Persistence

The selected language is automatically saved to `localStorage` and restored when the app loads.
