<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1aO4KpsFBpwuM07V7bPP2WCr1JlVVnkW_

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## 🌐 Bilingual Support (双语支持)

The app supports both **Chinese (中文)** and **English**, with **Chinese as the default language**.

### Features
- **Language Switcher**: Click the globe icon (🌐) in the top-right corner to switch languages
- **Persistent Selection**: Your language preference is saved in localStorage
- **Full Translation**: All UI text, labels, and messages are translated
- **Default Language**: Chinese (中文) is set as the default

### Implementation
The app uses `react-i18next` for internationalization:
- Translation files: `i18n/zh.json` (Chinese) and `i18n/en.json` (English)
- Configuration: `i18n.ts`
- Language switcher component: `components/LanguageSwitcher.tsx`
