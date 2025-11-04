// Gemini API 테스트 스크립트
import { GoogleGenerativeAI } from '@google/generative-ai'

const API_KEY = 'AIzaSyBZJu_085bM1rxSldgW0M3HLTQTJLe69Sg'
const genAI = new GoogleGenerativeAI(API_KEY)

const modelsToTest = [
  'gemini-pro',
  'gemini-1.0-pro',
  'gemini-1.5-pro',
  'gemini-1.5-flash',
  'gemini-2.0-flash-exp',
  'gemini-2.5-pro',
  'models/gemini-pro',
  'models/gemini-1.5-pro',
]

async function testModel(modelName) {
  try {
    console.log(`\n🧪 테스트: ${modelName}`)
    const model = genAI.getGenerativeModel({ model: modelName })
    const result = await model.generateContent('Hello')
    const response = await result.response
    const text = response.text()
    console.log(`✅ 성공: ${modelName}`)
    console.log(`   응답: ${text.substring(0, 50)}...`)
    return true
  } catch (error) {
    console.log(`❌ 실패: ${modelName}`)
    console.log(`   오류: ${error.message}`)
    return false
  }
}

async function testAllModels() {
  console.log('🚀 Gemini API 모델 테스트 시작...\n')
  
  for (const modelName of modelsToTest) {
    await testModel(modelName)
  }
  
  console.log('\n✨ 테스트 완료!')
}

testAllModels()

