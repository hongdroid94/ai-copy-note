/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 카테고리별 색상 (WIREFRAME.md 기반)
        category: {
          code: '#3B82F6',      // 파란색
          link: '#10B981',      // 초록색
          todo: '#F59E0B',      // 주황색
          idea: '#FBBF24',      // 노란색
          reference: '#8B5CF6', // 보라색
          other: '#6B7280',     // 회색
        }
      },
    },
  },
  plugins: [],
  darkMode: 'class', // 다크모드 지원
}

