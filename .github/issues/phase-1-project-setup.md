## 작업 배경

공학용 계산기 웹앱 프로젝트의 초기 개발 환경을 구축합니다. 이 단계에서는 Git 저장소 설정, 프로젝트 구조 생성, 빌드 도구 및 테스트 환경 설정, CI/CD 파이프라인 구축을 완료하여 본격적인 개발을 시작할 수 있는 기반을 마련합니다.

## 작업 내용

### 1.1 Git 저장소 설정
- [ ] Git 저장소 초기화 (`git init`)
- [ ] GitHub 원격 저장소 연결 (`https://github.com/kwang-min13/calculator.git`)
- [ ] 초기 커밋 (문서 파일들)
- [ ] main 브랜치 보호 설정 (GitHub Settings)

### 1.2 프로젝트 구조 생성
- [ ] `src/` 디렉토리 및 하위 폴더 생성
  - [ ] `src/core/` - 계산 엔진
  - [ ] `src/utils/` - 유틸리티 함수
  - [ ] `src/components/` - UI 컴포넌트
  - [ ] `src/assets/styles/` - CSS 파일
- [ ] `tests/` 디렉토리 생성
  - [ ] `tests/unit/` - 단위 테스트 (코어 로직만)
- [ ] `public/` 디렉토리 생성

### 1.3 빌드 도구 설정
- [ ] `package.json` 생성 및 기본 정보 입력
- [ ] Vite 설치 및 설정
  - [ ] `npm install -D vite` 실행
  - [ ] `vite.config.js` 생성 (base: '/calculator/')
  - [ ] HTML 진입점 설정
- [ ] Tailwind CSS 설치 및 설정
  - [ ] `npm install -D tailwindcss postcss autoprefixer` 실행
  - [ ] `npx tailwindcss init -p` 실행
  - [ ] `tailwind.config.js` 커스터마이징 (컬러, 폰트 등)
  - [ ] `src/assets/styles/main.css` 생성 및 Tailwind directives 추가
- [ ] 개발 서버 실행 테스트 (`npm run dev`)

### 1.4 테스트 환경 설정
- [ ] Vitest 설치 및 설정
  - [ ] `npm install -D vitest` 실행
  - [ ] `vitest.config.js` 생성 (필요시)
  - [ ] package.json에 테스트 스크립트 추가
  - [ ] 코어 로직 테스트 디렉토리 확인 (`tests/unit/`)

### 1.5 코드 품질 도구 설정
- [ ] ESLint 설치 및 설정
  - [ ] `npm install -D eslint` 실행
  - [ ] `.eslintrc.json` 생성
  - [ ] ES2022+ 규칙 설정
- [ ] Prettier 설치 및 설정
  - [ ] `npm install -D prettier` 실행
  - [ ] `.prettierrc` 생성
  - [ ] 포맷팅 규칙 설정 (single quotes, 2 spaces 등)
- [ ] 린트 스크립트 테스트 (`npm run lint`)

### 1.6 GitHub Actions 설정
- [ ] `.github/workflows/` 디렉토리 생성
- [ ] `deploy.yml` 워크플로우 파일 작성
  - [ ] 워크플로우 트리거 설정 (push, pull_request)
  - [ ] 권한 설정 (pages: write, id-token: write)
  - [ ] 빌드 Job 설정 (Node.js 20, npm ci, lint, test, build)
  - [ ] 배포 Job 설정 (GitHub Pages, main 브랜치만)
- [ ] GitHub Pages 활성화 (Settings → Pages → Source: GitHub Actions)
- [ ] 워크플로우 테스트 (빈 커밋 push 후 Actions 탭 확인)

## 인수 조건 (Acceptance Criteria)

### 필수 조건
- [ ] Git 저장소가 GitHub에 연결되어 있고, 초기 커밋이 완료됨
- [ ] 프로젝트 디렉토리 구조가 정의된 대로 생성됨 (`src/`, `tests/`, `public/`)
- [ ] `npm run dev` 실행 시 개발 서버가 정상 작동함 (http://localhost:5173)
- [ ] `npm run test` 실행 시 Vitest가 정상 실행됨 (테스트 없어도 OK)
- [ ] `npm run lint` 실행 시 ESLint가 정상 실행됨 (에러 없음)
- [ ] `npm run build` 실행 시 빌드가 성공하고 `dist/` 폴더가 생성됨
- [ ] GitHub Actions 워크플로우가 main 브랜치 push 시 자동 실행됨
- [ ] GitHub Pages가 활성화되어 있고, 배포 URL이 접근 가능함

### 검증 방법
1. **로컬 개발 환경 확인**
   ```bash
   npm install
   npm run dev
   # 브라우저에서 http://localhost:5173 접속 확인
   ```

2. **빌드 확인**
   ```bash
   npm run build
   npm run preview
   # 브라우저에서 http://localhost:4173/calculator/ 접속 확인
   ```

3. **테스트 및 린트 확인**
   ```bash
   npm run test
   npm run lint
   # 에러 없이 실행되는지 확인
   ```

4. **GitHub Actions 확인**
   - GitHub Repository → Actions 탭 이동
   - 최신 워크플로우 실행 결과 확인 (✅ 모든 Job 성공)

5. **GitHub Pages 확인**
   - https://kwang-min13.github.io/calculator/ 접속
   - 페이지 로드 성공 확인 (404 에러 없음)

## 참고 문서
- [TECH_SPEC.md](../TECH_SPEC.md) - 섹션 9: 빌드 및 배포 설정
- [PRD.md](../PRD.md) - 섹션 4: 기술 스택

## 예상 소요 시간
**1-2일**

## 라벨
`phase-1` `setup` `infrastructure` `priority-high`
