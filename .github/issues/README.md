# GitHub Issues - 공학용 계산기 웹앱

이 디렉토리는 TASKS.md를 기반으로 생성된 GitHub 이슈 템플릿을 포함합니다.

## 📋 이슈 목록

### Phase 1: 프로젝트 초기 설정 (1-2일)
**파일**: [phase-1-project-setup.md](./phase-1-project-setup.md)

**작업 배경**: Git 저장소, 빌드 도구, 테스트 환경, CI/CD 파이프라인 구축

**주요 작업**:
- Git 저장소 설정 및 GitHub 연결
- 프로젝트 디렉토리 구조 생성
- Vite + Tailwind CSS 설정
- Vitest 테스트 환경 설정
- ESLint + Prettier 코드 품질 도구 설정
- GitHub Actions + GitHub Pages 배포 설정

**라벨**: `phase-1` `setup` `infrastructure` `priority-high`

---

### Phase 2: 코어 로직 구현 - TDD (1주)
**파일**: [phase-2-core-logic-tdd.md](./phase-2-core-logic-tdd.md)

**작업 배경**: TDD 방식으로 계산기 핵심 로직 구현 (테스트 커버리지 90% 이상)

**주요 작업**:
- 상수 및 타입 정의
- Token 클래스 (TDD)
- Tokenizer (TDD)
- Parser - Shunting-yard 알고리즘 (TDD)
- Evaluator - RPN 계산 (TDD)
- Math Functions (TDD)
- Calculator Engine (TDD)
- Error Handler (TDD)
- Storage Manager (TDD)

**라벨**: `phase-2` `core-logic` `tdd` `priority-high`

---

### Phase 3: UI 컴포넌트 구현 (3-4일)
**파일**: [phase-3-ui-components.md](./phase-3-ui-components.md)

**작업 배경**: 디자인 시스템을 따라 UI 컴포넌트 구현 (TDD 적용 안 함)

**주요 작업**:
- 기본 HTML 구조
- CSS 스타일 설정 (Tailwind + 커스텀)
- Theme Manager (다크모드)
- Display Component
- ModeToggle Component
- Button Component
- Keypad Component
- Keyboard Handler
- Main App Integration

**라벨**: `phase-3` `ui` `components` `priority-high`

---

### Phase 4: UI 통합 및 수동 테스트 (2-3일)
**파일**: [phase-4-ui-testing.md](./phase-4-ui-testing.md)

**작업 배경**: 코어 로직과 UI 통합 검증 및 수동 테스트 (자동화 없음)

**주요 작업**:
- 코어 로직 통합 테스트 (자동화)
- UI 수동 테스트 (기본 계산, 공학 함수, 에러 처리, 키보드 입력)
- 접근성 수동 검증 (ARIA, 키보드 네비게이션, 스크린 리더)
- 크로스 브라우저 수동 테스트 (Chrome, Firefox, Safari, Edge, 모바일)
- 반응형 디자인 수동 검증 (모바일, 태블릿, 데스크톱)

**라벨**: `phase-4` `testing` `integration` `manual-testing` `priority-high`

---

### Phase 5: 최적화 및 배포 (1-2일)
**파일**: [phase-5-optimization-deployment.md](./phase-5-optimization-deployment.md)

**작업 배경**: 성능 최적화, 코드 품질 검토, GitHub Pages 배포

**주요 작업**:
- 성능 최적화 (Lighthouse 90+ 달성, 번들 크기 최적화)
- 코드 품질 검토 (ESLint, Prettier, 테스트 커버리지, SOLID 원칙)
- 문서 업데이트 (README, CHANGELOG, JSDoc)
- GitHub Pages 배포
- 최종 검증

**라벨**: `phase-5` `optimization` `deployment` `priority-high`

---

## 🚀 이슈 생성 방법

### 옵션 1: GitHub CLI 사용
```bash
# Phase 1 이슈 생성
gh issue create --title "Phase 1: 프로젝트 초기 설정" \
  --body-file .github/issues/phase-1-project-setup.md \
  --label "phase-1,setup,infrastructure,priority-high"

# Phase 2 이슈 생성
gh issue create --title "Phase 2: 코어 로직 구현 - TDD" \
  --body-file .github/issues/phase-2-core-logic-tdd.md \
  --label "phase-2,core-logic,tdd,priority-high"

# Phase 3 이슈 생성
gh issue create --title "Phase 3: UI 컴포넌트 구현" \
  --body-file .github/issues/phase-3-ui-components.md \
  --label "phase-3,ui,components,priority-high"

# Phase 4 이슈 생성
gh issue create --title "Phase 4: UI 통합 및 수동 테스트" \
  --body-file .github/issues/phase-4-ui-testing.md \
  --label "phase-4,testing,integration,manual-testing,priority-high"

# Phase 5 이슈 생성
gh issue create --title "Phase 5: 최적화 및 배포" \
  --body-file .github/issues/phase-5-optimization-deployment.md \
  --label "phase-5,optimization,deployment,priority-high"
```

### 옵션 2: GitHub 웹 UI 사용
1. GitHub Repository → Issues 탭 이동
2. "New issue" 클릭
3. 제목 입력 (예: "Phase 1: 프로젝트 초기 설정")
4. 해당 Phase의 마크다운 파일 내용 복사 & 붙여넣기
5. 라벨 추가
6. "Submit new issue" 클릭

---

## 📝 이슈 템플릿 구조

각 이슈 템플릿은 다음 섹션을 포함합니다:

1. **작업 배경**: 왜 이 작업이 필요한지 설명
2. **작업 내용**: 구체적인 작업 항목 (체크리스트)
3. **인수 조건 (Acceptance Criteria)**: 완료 기준
4. **참고 문서**: 관련 문서 링크
5. **예상 소요 시간**: 작업 기간 추정
6. **라벨**: GitHub 라벨 제안

---

## 🎯 우선순위 및 의존성

| Phase | 우선순위 | 예상 시간 | 의존성 |
|-------|---------|----------|--------|
| Phase 1 | 🔴 필수 | 1-2일 | 없음 |
| Phase 2 | 🔴 필수 | 1주 | Phase 1 |
| Phase 3 | 🔴 필수 | 3-4일 | Phase 2 |
| Phase 4 | 🔴 필수 | 2-3일 | Phase 3 |
| Phase 5 | 🔴 필수 | 1-2일 | Phase 4 |

**총 예상 시간**: 2-3주 (MVP 완성 기준)

---

**문서 버전**: 1.0  
**최종 수정일**: 2025-12-23  
**관련 문서**: [TASKS.md](../../TASKS.md)
