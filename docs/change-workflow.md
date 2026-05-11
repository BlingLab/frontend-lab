# 변경 흐름

이 저장소는 변경 위험도에 따라 `즉시 처리`, `가벼운 점검`, `정식 이슈급` 세 단계로 운영합니다.

## 1. 즉시 처리

즉시 처리는 영향 범위가 작고 되돌리기 쉬운 작업입니다.

### 기준

- 오탈자, 문장 보강, 링크 수정처럼 동작에 영향이 없습니다.
- 문서만 바꾸거나, 명확한 단일 CSS/텍스트 수정입니다.
- public API, build output, token contract, 접근성 동작을 바꾸지 않습니다.

### 확인

- 필요한 경우 관련 script만 실행합니다.
- GitHub label은 `fast-track` 또는 `flow:direct`를 사용합니다.
- main branch protection이 켜진 경우 즉시 처리도 짧은 PR로 기록합니다.

## 2. 가벼운 점검

가벼운 점검은 회귀 가능성이 있지만 구조 결정이나 별도 이슈까지는 필요하지 않은 작업입니다.

### 기준

- props, 상태 처리, 접근성, 반응형 동작, 여러 파일에 걸친 작은 변경입니다.
- package export, 문서 앱, token hook, validation script를 가볍게 바꿉니다.
- 작업 전 짧은 체크리스트와 관련 검증이 필요합니다.

### 확인

- PR description은 `.github/pull_request_template.md`를 따릅니다.
- 작성자는 Changes 탭에서 self-review를 진행하고, 의심되는 줄에는 comment를 남깁니다.
- 관련 검증은 변경 범위에 맞게 고르고 결과를 PR 또는 작업 요약에 남깁니다.
- GitHub label은 `light-review` 또는 `flow:pr`를 사용합니다.

## 3. 정식 이슈급

정식 이슈급은 공통 API, 디자인 시스템, 릴리즈, 검증 체계에 영향을 주는 작업입니다.

### 기준

- public API breaking change, token rename, theme contract change가 있습니다.
- 릴리즈, 패키지 배포, dependency, CI required check를 바꿉니다.
- accessibility, focus management, keyboard behavior에 regression 위험이 큽니다.
- 공통 컴포넌트 API, 디자인 시스템, 문서 재생성, 구조 변경에 영향을 줍니다.

### 필수 체크리스트

- [ ] 영향받는 컴포넌트와 소비자 import path를 적었습니다.
- [ ] migration 또는 rollback 방법을 적었습니다.
- [ ] `npm run test`를 통과했습니다.
- [ ] `npm run typecheck`를 통과했습니다.
- [ ] `npm --workspace @workspace/docs run build`를 통과했습니다.
- [ ] docs, README, component spec가 함께 업데이트되었습니다.

GitHub label은 `full-issue` 또는 `flow:risk`를 사용합니다.

## 결정 기준

| 질문| 답| 흐름|
| --- | --- | --- |
| 동작, API, 빌드에 영향이 없습니까?| 예| 즉시 처리|
| 작지만 props, 상태, 접근성, 반응형, 검증 흐름에 영향이 있습니까?| 예| 가벼운 점검|
| breaking change, rollback, 공통 API, release 위험이 있습니까?| 예| 정식 이슈급|
