# 프로젝트 개발 규칙

이 디렉토리는 공학용 계산기 웹앱 프로젝트의 개발 규칙을 정의합니다.

## 📋 규칙 목록

### 1. [TDD (Test-Driven Development)](./tdd.md)
**UI를 제외한 모든 코어 로직은 TDD로 구현합니다.**

- **적용 범위**: `src/core/`, `src/utils/`
- **제외 범위**: `src/components/` (UI 컴포넌트)
- **TDD 사이클**: Red → Green → Refactor
- **테스트 커버리지 목표**: 코어 로직 90% 이상

#### 주요 내용
- TDD 사이클 상세 설명
- 테스트 작성 가이드
- 테스트 케이스 작성 원칙
- 테스트 실행 명령어
- 커밋 전 체크리스트

### 2. [SOLID 원칙](./solid.md)
**모든 코어 로직 구현 시 SOLID 원칙을 준수합니다.**

- **S**: Single Responsibility Principle (단일 책임 원칙)
- **O**: Open/Closed Principle (개방/폐쇄 원칙)
- **L**: Liskov Substitution Principle (리스코프 치환 원칙)
- **I**: Interface Segregation Principle (인터페이스 분리 원칙)
- **D**: Dependency Inversion Principle (의존성 역전 원칙)

#### 주요 내용
- 각 원칙별 상세 설명
- Good/Bad 예시 코드
- 적용 체크리스트
- 리팩토링 신호
- 실전 예시

---

## 🎯 개발 워크플로우

### 새 기능 개발 시
1. **테스트 작성** (TDD - Red)
2. **최소 구현** (TDD - Green)
3. **SOLID 원칙 검토**
4. **리팩토링** (TDD - Refactor)
5. **커밋**

### 코드 리뷰 시 확인사항
- [ ] 테스트가 먼저 작성되었는가?
- [ ] 모든 테스트가 통과하는가?
- [ ] 각 클래스가 단일 책임을 가지는가? (SRP)
- [ ] 확장 시 기존 코드 수정이 필요한가? (OCP)
- [ ] 추상화에 의존하는가? (DIP)

---

## 📚 참고 자료

### TDD
- [Test-Driven Development by Kent Beck](https://www.amazon.com/Test-Driven-Development-Kent-Beck/dp/0321146530)
- [Vitest Documentation](https://vitest.dev/)

### SOLID
- [Clean Code by Robert C. Martin](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)
- [SOLID Principles - Refactoring Guru](https://refactoring.guru/design-patterns/solid-principles)

---

## ⚠️ 중요 알림

> [!WARNING]
> **코어 로직 구현 시 필수 준수 사항**
> 
> 1. 테스트 없이 코어 로직을 구현하지 마세요
> 2. SOLID 원칙을 위반하는 코드는 리팩토링 대상입니다
> 3. 코드 리뷰 시 이 규칙들을 기준으로 검토합니다

---

**문서 버전**: 1.0  
**최종 수정일**: 2025-12-23  
**관련 문서**: [PRD.md](../../PRD.md), [TECH_SPEC.md](../../TECH_SPEC.md)
