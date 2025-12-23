# 디자인 파일

이 디렉토리는 공학용 계산기 웹앱의 디자인 레퍼런스 파일들을 포함합니다.

## 파일 목록

### [screen.png](./screen.png)
계산기 UI의 최종 디자인 스크린샷입니다.

**주요 디자인 요소:**
- 다크모드 지원 UI
- 4×7 버튼 그리드 레이아웃
- DEG/RAD 모드 토글
- 계산 히스토리 및 결과 디스플레이
- 모던한 glassmorphism 스타일

### [code.html](./code.html)
디자인을 구현한 HTML/Tailwind CSS 코드입니다.

**포함된 내용:**
- 완전한 HTML 구조
- Tailwind CSS 클래스 사용 예시
- 컬러 팔레트 정의
- 폰트 설정 (Space Grotesk, Noto Sans)
- 다크모드 전환 로직

## 디자인 시스템 참조

이 디자인 파일들은 다음 문서들의 기반이 되었습니다:
- [PRD.md](../../PRD.md) - 섹션 3: UI/UX 디자인 사양
- [TECH_SPEC.md](../../TECH_SPEC.md) - 섹션 4: UI 컴포넌트 설계

## 사용 방법

1. **디자인 확인**: `screen.png`를 열어 최종 UI 확인
2. **코드 참조**: `code.html`에서 Tailwind 클래스 및 구조 참조
3. **구현**: Tech Spec의 컴포넌트 설계를 따라 실제 구현

---

**출처**: Stitch Design System  
**최종 수정일**: 2025-12-23
