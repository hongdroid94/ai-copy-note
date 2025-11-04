# Gemini API 설정 가이드

AI Copy Note에서 Gemini API를 사용하기 위한 설정 가이드입니다.

## 🔑 API 키 발급

1. **Google AI Studio 접속**
   - https://makersuite.google.com/app/apikey 방문
   - Google 계정으로 로그인

2. **API 키 생성**
   - "Create API Key" 버튼 클릭
   - 생성된 API 키 복사

## ⚙️ 로컬 개발 환경 설정

### 1. 환경변수 파일 생성

`client/.env` 파일을 생성하고 다음 내용을 입력하세요:

```env
# Google Gemini API
VITE_GEMINI_API_KEY=your_api_key_here

# App Environment
VITE_APP_ENV=development
```

**주의**: `.env` 파일은 Git에 커밋되지 않습니다 (.gitignore에 포함됨)

### 2. API 키 설정

발급받은 API 키를 `.env` 파일의 `VITE_GEMINI_API_KEY`에 입력:

```env
VITE_GEMINI_API_KEY=AIzaSyBZJu_085bM1rxSldgW0M3HLTQTJLe69Sg
```

### 3. 개발 서버 재시작

환경변수를 변경한 후에는 개발 서버를 재시작해야 합니다:

```bash
cd client
npm run dev
```

## 🚀 Netlify 배포 환경 설정

### 방법 1: Netlify 웹 UI에서 설정

1. [Netlify 대시보드](https://app.netlify.com) 접속
2. 프로젝트 선택 (ai-copy-note)
3. **Site settings** → **Environment variables** 메뉴 이동
4. **Add a variable** 클릭
5. 다음 정보 입력:
   - Key: `VITE_GEMINI_API_KEY`
   - Value: `your_api_key_here`
6. **Save** 클릭
7. 프로젝트 재배포

### 방법 2: Netlify CLI로 설정

```bash
# Netlify CLI 설치 (필요한 경우)
npm install -g netlify-cli

# 환경변수 설정
netlify env:set VITE_GEMINI_API_KEY "your_api_key_here"

# 재배포
cd client
npm run build
netlify deploy --prod
```

## 🧪 API 테스트

개발자 콘솔에서 API가 제대로 작동하는지 테스트:

```javascript
import { testGeminiAPI } from './utils/gemini'

// 콘솔에서 실행
testGeminiAPI()
```

## 🎯 Gemini API 사용 기능

### 1. 자동 카테고리 분류
메모 내용을 분석하여 적절한 카테고리를 자동으로 선택합니다:
- 💻 코드
- 🔗 링크
- ✅ 할 일
- 💡 아이디어
- 📄 참고자료
- 🎯 기타

### 2. 태그 자동 생성
메모와 관련된 3-5개의 태그를 자동으로 생성합니다.

### 3. 제목 자동 생성
메모 내용을 요약하는 20자 이내의 짧은 제목을 생성합니다.

### 4. 요약 생성
200자 이상의 긴 텍스트인 경우 100자 이내로 요약을 생성합니다.

## 📊 프롬프트 설계

Gemini API에 전송되는 프롬프트는 다음과 같이 설계되어 있습니다:

```
다음 텍스트를 분석하여 JSON 형식으로 응답해주세요.

텍스트:
"""
{사용자가 입력한 내용}
"""

요청사항:
1. 카테고리 선택 (코드, 링크, 할일, 아이디어, 참고자료, 기타)
2. 3-5개의 관련 태그 생성
3. 20자 이내의 제목 생성
4. 200자 이상인 경우 100자 이내로 요약

JSON 형식:
{
  "category": "카테고리",
  "tags": ["태그1", "태그2", "태그3"],
  "title": "제목",
  "summary": "요약 또는 null"
}
```

## 🔒 보안 주의사항

1. **API 키 노출 금지**
   - `.env` 파일을 절대 Git에 커밋하지 마세요
   - 프론트엔드에 노출된 API 키는 클라이언트에서 볼 수 있습니다
   - 프로덕션에서는 서버사이드에서 API를 호출하는 것이 안전합니다

2. **API 사용량 제한**
   - Gemini API는 무료 tier에서 일일 요청 제한이 있습니다
   - 과도한 요청을 방지하기 위해 debouncing이 적용되어 있습니다

3. **에러 처리**
   - API 호출 실패 시 기본값으로 폴백됩니다
   - 사용자에게 적절한 오류 메시지가 표시됩니다

## 🐛 문제 해결

### API 키가 인식되지 않는 경우

1. `.env` 파일이 `client/` 디렉토리에 있는지 확인
2. 파일명이 정확히 `.env`인지 확인 (`.env.local` 아님)
3. API 키 앞뒤에 공백이 없는지 확인
4. 개발 서버를 재시작했는지 확인

### API 호출 오류

1. 인터넷 연결 확인
2. API 키가 유효한지 Google AI Studio에서 확인
3. 브라우저 개발자 도구의 Console 탭에서 상세 오류 확인
4. Gemini API 사용량 한도를 초과하지 않았는지 확인

### 환경변수가 undefined인 경우

Vite에서는 환경변수 이름이 반드시 `VITE_`로 시작해야 합니다:
- ✅ `VITE_GEMINI_API_KEY`
- ❌ `GEMINI_API_KEY`

## 📚 참고 자료

- [Google Gemini API 문서](https://ai.google.dev/docs)
- [Vite 환경변수 가이드](https://vitejs.dev/guide/env-and-mode.html)
- [Netlify 환경변수 설정](https://docs.netlify.com/environment-variables/overview/)

---

**작성일**: 2025-10-19  
**API 버전**: Gemini Pro

