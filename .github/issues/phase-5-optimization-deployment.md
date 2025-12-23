## 작업 배경

Phase 4까지 완성된 계산기 앱을 프로덕션 배포하기 전에 성능 최적화, 코드 품질 검토, 문서 업데이트를 수행합니다. 이 단계에서는 Lighthouse 점수 90점 이상 달성, 번들 크기 최적화, GitHub Pages 배포를 완료하여 사용자에게 최상의 경험을 제공합니다.

## 작업 내용

### 5.1 성능 최적화
**Lighthouse 점수 측정 및 개선**
- [ ] 초기 Lighthouse 점수 측정 (Chrome DevTools)
  - [ ] Performance 점수 기록
  - [ ] Accessibility 점수 기록
  - [ ] Best Practices 점수 기록
  - [ ] SEO 점수 기록
- [ ] Performance 90+ 달성
  - [ ] FCP (First Contentful Paint) 개선
  - [ ] LCP (Largest Contentful Paint) 개선
  - [ ] TBT (Total Blocking Time) 개선
- [ ] Accessibility 90+ 달성
  - [ ] 색상 대비 확인 (최소 4.5:1)
  - [ ] ARIA 속성 검증
  - [ ] 키보드 네비게이션 검증
- [ ] Best Practices 90+ 달성
  - [ ] HTTPS 사용 (GitHub Pages 자동 제공)
  - [ ] 콘솔 에러 제거
  - [ ] 보안 헤더 확인

**번들 크기 최적화**
- [ ] Tree shaking 확인
  - [ ] 미사용 import 제거
  - [ ] `npm run build` 후 번들 크기 확인 (목표: < 100KB gzipped)
- [ ] Tailwind CSS purge 확인
  - [ ] `tailwind.config.js`의 content 경로 확인
  - [ ] 미사용 CSS 클래스 제거 확인
- [ ] 미사용 코드 제거
  - [ ] 주석 처리된 코드 삭제
  - [ ] console.log 제거 (프로덕션 빌드)

**로딩 시간 최적화**
- [ ] Font display swap 설정
  - [ ] Google Fonts URL에 `&display=swap` 추가
- [ ] Preconnect 설정
  - [ ] `<link rel="preconnect" href="https://fonts.googleapis.com">`
  - [ ] `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`

### 5.2 코드 품질 검토
- [ ] ESLint 에러 0개 확인
  - [ ] `npm run lint` 실행
  - [ ] 모든 에러 및 경고 수정
- [ ] Prettier 포맷팅 적용
  - [ ] `npm run format` 실행
  - [ ] 모든 파일 포맷팅 확인
- [ ] 테스트 커버리지 확인
  - [ ] `npm run test -- --coverage` 실행
  - [ ] 코어 로직 90% 이상 확인
  - [ ] 커버리지 보고서 스크린샷 저장
- [ ] SOLID 원칙 준수 검토
  - [ ] 각 클래스의 단일 책임 확인 (SRP)
  - [ ] 의존성 역전 확인 (DIP)
  - [ ] 리팩토링 필요 시 수행

### 5.3 문서 업데이트
**README.md 최종 업데이트**
- [ ] 배포 URL 추가
  - [ ] `https://kwang-min13.github.io/calculator/` 링크 추가
  - [ ] 데모 배지 추가
- [ ] 스크린샷 추가
  - [ ] 라이트 모드 스크린샷
  - [ ] 다크 모드 스크린샷
  - [ ] 모바일 뷰 스크린샷
- [ ] 사용법 업데이트
  - [ ] 기능 목록 최신화
  - [ ] 키보드 단축키 문서화

**CHANGELOG.md 작성**
- [ ] v1.0.0 릴리스 노트 작성
  - [ ] 주요 기능 목록
  - [ ] 기술 스택
  - [ ] 알려진 이슈 (있는 경우)

**주석 및 JSDoc 추가**
- [ ] 모든 public 메서드에 JSDoc 추가
- [ ] 복잡한 로직에 주석 추가
- [ ] 타입 정보 명시 (@param, @returns)

### 5.4 GitHub Pages 배포
- [ ] 빌드 테스트
  - [ ] `npm run build` 실행
  - [ ] `dist/` 폴더 생성 확인
  - [ ] `dist/index.html` 존재 확인
- [ ] 로컬 프리뷰 테스트
  - [ ] `npm run preview` 실행
  - [ ] http://localhost:4173/calculator/ 접속
  - [ ] 모든 기능 동작 확인
- [ ] main 브랜치 push
  - [ ] 모든 변경사항 커밋
  - [ ] `git push origin main`
- [ ] GitHub Actions 워크플로우 실행 확인
  - [ ] GitHub Repository → Actions 탭 이동
  - [ ] 최신 워크플로우 실행 상태 확인
  - [ ] 빌드 Job 성공 확인
  - [ ] 배포 Job 성공 확인
- [ ] 배포 완료 확인
  - [ ] GitHub Pages 배포 완료 대기 (1-2분)
  - [ ] Settings → Pages에서 배포 상태 확인
- [ ] 실제 URL 접속 테스트
  - [ ] https://kwang-min13.github.io/calculator/ 접속
  - [ ] 페이지 로드 성공 확인
  - [ ] 모든 기능 동작 확인
  - [ ] 콘솔 에러 없음 확인

### 5.5 최종 검증
- [ ] 모든 기능 동작 확인
  - [ ] 사칙연산
  - [ ] 공학 함수
  - [ ] DEG/RAD 모드
  - [ ] 에러 처리
- [ ] 에러 없이 실행 확인
  - [ ] 콘솔 에러 0개
  - [ ] 네트워크 에러 0개
- [ ] 다크모드 전환 확인
  - [ ] 시스템 설정 변경 시 자동 전환
- [ ] 모바일 반응형 확인
  - [ ] 실제 모바일 디바이스에서 테스트 (가능한 경우)
- [ ] 성능 지표 확인
  - [ ] Lighthouse 점수 재측정
  - [ ] 모든 항목 90점 이상 확인

## 인수 조건 (Acceptance Criteria)

### 필수 조건
- [ ] Lighthouse 점수가 모두 90점 이상임
  - Performance: 90+
  - Accessibility: 90+
  - Best Practices: 90+
  - SEO: 90+ (선택사항)
- [ ] 번들 크기가 100KB (gzipped) 이하임
- [ ] ESLint 에러가 0개임
- [ ] 테스트 커버리지가 90% 이상임
- [ ] GitHub Pages에 성공적으로 배포됨
- [ ] 배포된 URL에서 모든 기능이 정상 동작함
- [ ] README.md에 배포 URL과 스크린샷이 포함됨
- [ ] CHANGELOG.md가 작성됨

### 검증 방법
1. **Lighthouse 점수 측정**
   ```bash
   # Chrome DevTools 열기 (F12)
   # Lighthouse 탭 선택
   # "Generate report" 클릭
   # Performance, Accessibility, Best Practices 모두 90+ 확인
   ```

2. **번들 크기 확인**
   ```bash
   npm run build
   # dist/ 폴더 크기 확인
   # gzip 압축 후 크기 확인 (< 100KB)
   ```

3. **배포 확인**
   ```bash
   # GitHub Actions 워크플로우 성공 확인
   # https://kwang-min13.github.io/calculator/ 접속
   # 모든 기능 테스트
   ```

4. **최종 품질 확인**
   ```bash
   npm run lint    # 에러 0개
   npm run test -- --coverage  # 커버리지 90%+
   npm run build   # 빌드 성공
   ```

### 성능 목표
- **FCP (First Contentful Paint)**: < 1.8s
- **LCP (Largest Contentful Paint)**: < 2.5s
- **TBT (Total Blocking Time)**: < 200ms
- **CLS (Cumulative Layout Shift)**: < 0.1
- **번들 크기**: < 100KB (gzipped)

## 참고 문서
- [TECH_SPEC.md](../TECH_SPEC.md) - 섹션 10: 성능 최적화
- [PRD.md](../PRD.md) - 섹션 7: 성능 요구사항

## 예상 소요 시간
**1-2일**

## 라벨
`phase-5` `optimization` `deployment` `priority-high`
