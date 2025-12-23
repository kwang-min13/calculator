# 공학용 계산기 배포 가이드

## 🚀 배포 준비 완료

이 프로젝트는 GitHub Pages에 자동 배포되도록 설정되어 있습니다.

---

## 📋 배포 전 체크리스트

### 1. Node.js 설치 확인
```bash
node --version
npm --version
```

Node.js가 설치되어 있지 않다면:
- https://nodejs.org/ 에서 LTS 버전 다운로드
- 설치 후 터미널 재시작

### 2. 의존성 설치
```bash
cd c:\workplace\Calculator
npm install
```

### 3. 로컬 개발 서버 테스트
```bash
npm run dev
```
- 브라우저에서 http://localhost:5173 접속
- 모든 기능 동작 확인:
  - ✅ 숫자 입력
  - ✅ 사칙연산
  - ✅ 공학 함수 (sin, cos, tan, ln, log, sqrt)
  - ✅ DEG/RAD 모드 전환
  - ✅ 키보드 입력 (Enter, Escape, Backspace)
  - ✅ 다크모드 전환
  - ✅ 반응형 디자인

### 4. 프로덕션 빌드 테스트
```bash
npm run build
npm run preview
```
- 브라우저에서 http://localhost:4173/calculator/ 접속
- 빌드된 버전 동작 확인

---

## 🌐 GitHub Pages 배포

### 자동 배포 설정

1. **GitHub Pages 활성화**
   - GitHub Repository 이동: https://github.com/kwang-min13/calculator
   - Settings → Pages
   - Source: **GitHub Actions** 선택
   - Save

2. **코드 푸시 (이미 완료)**
   ```bash
   git push origin main
   ```

3. **GitHub Actions 워크플로우 확인**
   - Repository → Actions 탭
   - "Build and Deploy to GitHub Pages" 워크플로우 실행 확인
   - 모든 Job이 성공(✅)하는지 확인

4. **배포 완료 확인**
   - 워크플로우 완료 후 1-2분 대기
   - https://kwang-min13.github.io/calculator/ 접속
   - 계산기 앱 로드 확인

---

## 🔧 문제 해결

### GitHub Actions 실패 시

**원인**: Node.js 의존성 설치 실패
**해결**: 
- `package.json`이 올바른지 확인
- GitHub Actions 로그 확인

**원인**: 빌드 실패
**해결**:
- 로컬에서 `npm run build` 실행하여 에러 확인
- 에러 수정 후 다시 push

### GitHub Pages 404 에러

**원인**: GitHub Pages가 활성화되지 않음
**해결**:
- Settings → Pages → Source: GitHub Actions 선택

**원인**: base 경로 설정 오류
**해결**:
- `vite.config.js`의 `base: '/calculator/'` 확인

---

## 📊 배포 후 확인사항

### 기능 테스트
- [ ] 기본 계산 (2 + 3 = 5)
- [ ] 연산자 우선순위 (2 + 3 × 4 = 14)
- [ ] 공학 함수 (sin(30) ≈ 0.5 in DEG)
- [ ] 에러 처리 (10 ÷ 0 = Math Error)
- [ ] 키보드 입력
- [ ] 다크모드 전환

### 성능 확인
- [ ] 페이지 로드 시간 < 3초
- [ ] 버튼 반응 즉각적
- [ ] 모바일에서 정상 동작

### 접근성 확인
- [ ] 키보드 네비게이션 (Tab, Enter, Space)
- [ ] ARIA 속성 동작
- [ ] 스크린 리더 호환성 (선택사항)

---

## 🎯 배포 URL

**프로덕션**: https://kwang-min13.github.io/calculator/

---

## 📝 추가 개선사항 (선택)

### Phase 6: Post-MVP 기능
- 계산 히스토리 저장 및 재사용
- 추가 공학 함수 (arcsin, arccos, arctan, sinh, cosh, tanh)
- 메모리 기능 (M+, M-, MR, MC)
- 설정 기능 (소수점 자릿수, 천 단위 구분)

### 성능 최적화
- Lighthouse 점수 측정 및 개선
- 번들 크기 최적화
- 로딩 시간 단축

---

**배포 준비 완료일**: 2025-12-23  
**Repository**: https://github.com/kwang-min13/calculator  
**Live Demo**: https://kwang-min13.github.io/calculator/
