# 변경 흐름 / Change Workflow

이 저장소는 변경 위험도에 따라 `바로 push`, `PR 셀프 리뷰`, `체크리스트 기반 merge` 세 단계로 운영합니다.
This repository uses three change paths based on risk: direct push, PR self-review, and checklist-based merge.

## 1. 작은 수정 / Small Change

작은 수정은 `main`에 바로 push할 수 있습니다.
Small changes can be pushed directly to `main`.

### 기준 / Criteria

- 오탈자, 문장 보강, 링크 수정처럼 동작에 영향이 없습니다. / No behavior impact, such as typos, wording, or link fixes.
- 문서만 바꾸거나, 명확한 단일 CSS/텍스트 수정입니다. / Docs-only or a clear single CSS/text adjustment.
- public API, build output, token contract, 접근성 동작을 바꾸지 않습니다. / Does not change public API, build output, token contract, or accessibility behavior.

### 확인 / Checks

- 필요한 경우 `npm run test` 또는 관련 build만 실행합니다. / Run `npm run test` or the relevant build only when needed.
- GitHub label은 `flow:direct`를 사용합니다. / Use the `flow:direct` GitHub label.

## 2. 기능 또는 구조 변경 / Feature Or Structure Change

기능 추가, prop 변경, 폴더 구조, build/test 흐름 변경은 PR을 올리고 Changes 탭에서 셀프 리뷰합니다.
Feature additions, prop changes, folder structure changes, and build/test flow changes use a PR with self-review in the Changes tab.

### 기준 / Criteria

- 새 컴포넌트, 새 prop, 상태 동작, keyboard interaction이 추가됩니다. / Adds a new component, prop, state behavior, or keyboard interaction.
- package export, docs app, token hook, validation script가 바뀝니다. / Changes package exports, docs app, token hooks, or validation scripts.
- 여러 파일을 함께 바꾸며 리뷰 맥락이 필요합니다. / Changes multiple files and needs review context.

### 확인 / Checks

- PR description은 `.github/pull_request_template.md`를 따릅니다. / PR description follows `.github/pull_request_template.md`.
- 작성자는 Changes 탭에서 self-review를 진행하고, 의심되는 줄에는 comment를 남깁니다. / The author self-reviews the Changes tab and comments on suspicious lines.
- 기본 검증은 `npm run test`, `npm run typecheck`, `npm --workspace @workspace/docs run build`입니다. / Base verification is `npm run test`, `npm run typecheck`, and `npm --workspace @workspace/docs run build`.
- GitHub label은 `flow:pr`를 사용합니다. / Use the `flow:pr` GitHub label.

## 3. 위험한 변경 / Risky Change

위험한 변경은 PR 설명에 체크리스트를 적고 확인 후 merge합니다.
Risky changes include a checklist in the PR description and are merged only after confirmation.

### 기준 / Criteria

- public API breaking change, token rename, theme contract change가 있습니다. / Includes public API breaking changes, token renames, or theme contract changes.
- 릴리즈, 패키지 배포, dependency, CI required check를 바꿉니다. / Changes release, package publishing, dependencies, or required CI checks.
- accessibility, focus management, keyboard behavior에 regression 위험이 큽니다. / Has high regression risk for accessibility, focus management, or keyboard behavior.

### 필수 체크리스트 / Required Checklist

- [ ] 영향받는 컴포넌트와 소비자 import path를 적었습니다. / Listed affected components and consumer import paths.
- [ ] migration 또는 rollback 방법을 적었습니다. / Documented migration or rollback path.
- [ ] `npm run test`를 통과했습니다. / `npm run test` passed.
- [ ] `npm run typecheck`를 통과했습니다. / `npm run typecheck` passed.
- [ ] `npm --workspace @workspace/docs run build`를 통과했습니다. / `npm --workspace @workspace/docs run build` passed.
- [ ] docs, README, component spec가 함께 업데이트되었습니다. / Docs, README, and component specs were updated together.

GitHub label은 `flow:risk`를 사용합니다.
Use the `flow:risk` GitHub label.

## 결정 기준 / Decision Guide

| 질문 / Question | 답 / Answer | 흐름 / Flow |
| --- | --- | --- |
| 동작, API, 빌드에 영향이 없습니까? / No behavior, API, or build impact? | 예 / Yes | 바로 push / Direct push |
| 기능, 구조, prop, 검증 흐름을 바꿉니까? / Changes feature, structure, prop, or validation flow? | 예 / Yes | PR 셀프 리뷰 / PR self-review |
| breaking change 또는 rollback이 필요할 수 있습니까? / Could require breaking change handling or rollback? | 예 / Yes | 위험 변경 체크리스트 / Risk checklist |
