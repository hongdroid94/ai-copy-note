# AI Copy Note - Frontend

AI 기반 스마트 클립보드 메모 서비스 프론트엔드

## 🚀 기술 스택

- **React 18** - UI 라이브러리
- **Vite** - 빌드 도구
- **TailwindCSS** - 스타일링
- **React Router v6** - 라우팅

## 📦 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview
```

## 📁 프로젝트 구조

```
src/
├── components/
│   ├── auth/          # 인증 관련 컴포넌트
│   ├── dashboard/     # 대시보드 컴포넌트
│   └── layout/        # 레이아웃 컴포넌트
├── pages/             # 페이지 컴포넌트
├── utils/             # 유틸리티 함수
├── App.jsx            # 앱 루트
├── main.jsx           # 진입점
└── index.css          # 글로벌 스타일
```

## 🎨 주요 화면

1. **로그인/회원가입** - `/login`, `/signup`
2. **메인 대시보드** - `/dashboard`
   - 메모 입력 영역
   - 카테고리 사이드바
   - 메모 리스트

## 🌐 배포

Netlify를 통해 배포됩니다.

```bash
# Netlify CLI로 배포
netlify deploy --prod
```

## 📝 개발 상태

현재 UI 구조만 구현된 상태이며, 실제 기능(Supabase 연동, Gemini API 등)은 추후 구현 예정입니다.

## 📄 관련 문서

- [PRD.md](../PRD.md) - 프로젝트 요구사항 문서
- [WIREFRAME.md](../WIREFRAME.md) - 와이어프레임
