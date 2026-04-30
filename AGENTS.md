# 프로젝트 작업 지침 / Project Work Guidelines

## 언어 기준 / Language Standard

- 모든 문서, 주석, TODO, 개발자-facing 메시지는 한글을 먼저 쓰고 바로 뒤에 영문을 병기합니다.
  - Write Korean first for all documentation, comments, TODOs, and developer-facing messages, followed by English.
- 제목은 `한글 제목 / English Title` 형식을 사용합니다.
  - Use the `Korean Title / English Title` format for headings.
- 본문은 같은 bullet 안에서 `한글 문장 / English sentence` 형식을 우선합니다.
  - Prefer `Korean sentence / English sentence` in the same bullet or paragraph.
- 코드 식별자, 패키지명, prop, CSS class, token 이름은 원문을 유지합니다.
  - Keep code identifiers, package names, props, CSS classes, and token names in their original form.
- 접근성, 명세, 표준 링크처럼 공식 영문 용어가 중요한 경우에도 한글 설명을 먼저 둡니다.
  - Even when official English terms matter, such as accessibility specs and standards links, place the Korean explanation first.
- 새 컴포넌트 문서는 `npm run components:scaffold -- --force-docs`로 재생성하기 전에 사용자가 만든 수동 변경이 없는지 확인합니다.
  - Before regenerating component docs with `npm run components:scaffold -- --force-docs`, check that there are no user-authored manual changes to preserve.

## 작업 분류 기준 / Work Triage Standard

- 모든 작업은 시작 전에 `즉시 처리`, `가벼운 점검`, `정식 이슈급` 중 하나로 먼저 분류하고, 분류 이유를 짧게 확인합니다.
  - Before starting any task, classify it as `Fast Track`, `Light Review`, or `Full Issue`, and briefly confirm the reason.
- 사용자에게 설명할 때는 사용자가 별도로 요청하지 않는 한 한글만 사용합니다.
  - When explaining work to the user, use Korean only unless the user explicitly requests another language.

### 즉시 처리 / Fast Track

- 오타, 문구, 작은 스타일 조정, 명확한 단일 파일 수정처럼 영향 범위가 작고 되돌리기 쉬운 작업에 사용합니다.
  - Use this for typos, copy updates, small style tweaks, or obvious single-file changes with low impact and easy rollback.
- 별도 이슈 없이 바로 수정, 최소 검증, 커밋 또는 푸시까지 진행할 수 있습니다.
  - These changes may proceed directly through implementation, minimal verification, commit, or push without a separate issue.
- 판단 기준은 사용자 흐름, 공통 컴포넌트 API, 빌드 설정, 배포 동작에 영향을 주지 않는지입니다.
  - The check is whether the change does not affect user flows, shared component APIs, build configuration, or release behavior.

### 가벼운 점검 / Light Review

- props, 상태 처리, 접근성, 반응형 동작, 여러 파일에 걸친 작은 변경처럼 회귀 가능성이 있는 작업에 사용합니다.
  - Use this for changes with some regression risk, such as props, state handling, accessibility, responsive behavior, or small multi-file updates.
- 작업 전에 짧은 체크리스트를 두고, 관련 테스트 또는 빌드 검증을 실행합니다.
  - Before changing code, keep a short checklist and run the relevant tests or build verification.
- 이슈 생성은 필수가 아니지만, 판단 근거와 검증 결과는 작업 요약에 남깁니다.
  - Creating an issue is optional, but the reasoning and verification result should be included in the work summary.

### 정식 이슈급 / Full Issue

- 공통 컴포넌트 API, 디자인 시스템, 토큰, 문서 재생성, 구조 변경, 배포 위험이 있는 작업에 사용합니다.
  - Use this for shared component APIs, design systems, tokens, regenerated docs, structural changes, or release-risk changes.
- 작업 전에 범위, 영향 파일, 완료 기준, 검증 방법을 명시하고 이슈 또는 동등한 추적 단위를 둡니다.
  - Before implementation, define the scope, affected files, completion criteria, and verification method, and keep an issue or equivalent tracking unit.
- 사용자 결정이 필요한 방향 변경은 구현 전에 확인합니다.
  - Confirm direction changes that require user decisions before implementation.
