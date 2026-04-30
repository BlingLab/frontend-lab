# 변경 흐름 / Change Workflow

이 저장소는 변경 위험도에 따라 `즉시 처리`, `가벼운 점검`, `정식 이슈급` 세 단계로 운영합니다.
This repository uses three change paths based on risk: Fast Track, Light Review, and Full Issue.

## 1. 즉시 처리 / Fast Track

즉시 처리는 영향 범위가 작고 되돌리기 쉬운 작업입니다.
Fast Track is for changes with a small blast radius and easy rollback.

### 기준 / Criteria

- 오탈자, 문장 보강, 링크 수정처럼 동작에 영향이 없습니다. / No behavior impact, such as typos, wording, or link fixes.
- 문서만 바꾸거나, 명확한 단일 CSS/텍스트 수정입니다. / Docs-only or a clear single CSS/text adjustment.
- public API, build output, token contract, 접근성 동작을 바꾸지 않습니다. / Does not change public API, build output, token contract, or accessibility behavior.

### 확인 / Checks

- 필요한 경우 관련 script만 실행합니다. / Run only the relevant script when needed.
- GitHub label은 `fast-track` 또는 `flow:direct`를 사용합니다. / Use the `fast-track` or `flow:direct` GitHub label.
- main branch protection이 켜진 경우 즉시 처리도 짧은 PR로 기록합니다. / When main branch protection is enabled, even Fast Track changes are recorded through a short PR.

## 2. 가벼운 점검 / Light Review

가벼운 점검은 회귀 가능성이 있지만 구조 결정이나 별도 이슈까지는 필요하지 않은 작업입니다.
Light Review is for changes with regression risk that do not require a separate issue or structural decision.

### 기준 / Criteria

- props, 상태 처리, 접근성, 반응형 동작, 여러 파일에 걸친 작은 변경입니다. / Changes props, state handling, accessibility, responsive behavior, or a small set of related files.
- package export, docs app, token hook, validation script를 가볍게 바꿉니다. / Lightly changes package exports, the docs app, token hooks, or validation scripts.
- 작업 전 짧은 체크리스트와 관련 검증이 필요합니다. / Needs a short checklist and relevant verification before completion.

### 확인 / Checks

- PR description은 `.github/pull_request_template.md`를 따릅니다. / PR description follows `.github/pull_request_template.md`.
- 작성자는 Changes 탭에서 self-review를 진행하고, 의심되는 줄에는 comment를 남깁니다. / The author self-reviews the Changes tab and comments on suspicious lines.
- 관련 검증은 변경 범위에 맞게 고르고 결과를 PR 또는 작업 요약에 남깁니다. / Choose verification based on the change scope and record the result in the PR or work summary.
- GitHub label은 `light-review` 또는 `flow:pr`를 사용합니다. / Use the `light-review` or `flow:pr` GitHub label.

## 3. 정식 이슈급 / Full Issue

정식 이슈급은 공통 API, 디자인 시스템, 릴리즈, 검증 체계에 영향을 주는 작업입니다.
Full Issue work affects shared APIs, the design system, release behavior, or validation systems.

### 기준 / Criteria

- public API breaking change, token rename, theme contract change가 있습니다. / Includes public API breaking changes, token renames, or theme contract changes.
- 릴리즈, 패키지 배포, dependency, CI required check를 바꿉니다. / Changes release, package publishing, dependencies, or required CI checks.
- accessibility, focus management, keyboard behavior에 regression 위험이 큽니다. / Has high regression risk for accessibility, focus management, or keyboard behavior.
- 공통 컴포넌트 API, 디자인 시스템, 문서 재생성, 구조 변경에 영향을 줍니다. / Affects shared component APIs, the design system, regenerated docs, or structural changes.

### 필수 체크리스트 / Required Checklist

- [ ] 영향받는 컴포넌트와 소비자 import path를 적었습니다. / Listed affected components and consumer import paths.
- [ ] migration 또는 rollback 방법을 적었습니다. / Documented migration or rollback path.
- [ ] `npm run test`를 통과했습니다. / `npm run test` passed.
- [ ] `npm run typecheck`를 통과했습니다. / `npm run typecheck` passed.
- [ ] `npm --workspace @workspace/docs run build`를 통과했습니다. / `npm --workspace @workspace/docs run build` passed.
- [ ] docs, README, component spec가 함께 업데이트되었습니다. / Docs, README, and component specs were updated together.

GitHub label은 `full-issue` 또는 `flow:risk`를 사용합니다.
Use the `full-issue` or `flow:risk` label.

## 결정 기준 / Decision Guide

| 질문 / Question | 답 / Answer | 흐름 / Flow |
| --- | --- | --- |
| 동작, API, 빌드에 영향이 없습니까? / No behavior, API, or build impact? | 예 / Yes | 즉시 처리 / Fast Track |
| 작지만 props, 상태, 접근성, 반응형, 검증 흐름에 영향이 있습니까? / Small but affects props, state, accessibility, responsive behavior, or validation flow? | 예 / Yes | 가벼운 점검 / Light Review |
| breaking change, rollback, 공통 API, release 위험이 있습니까? / Has breaking change, rollback, shared API, or release risk? | 예 / Yes | 정식 이슈급 / Full Issue |
