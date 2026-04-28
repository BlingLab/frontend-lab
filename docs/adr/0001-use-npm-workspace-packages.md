# ADR 0001: Use npm Workspaces First

## Status

Accepted

## Context

초기 저장소는 로컬 문서 앱과 `packages/ui`, `packages/tokens`를 중심으로 정리되어 있습니다. 이전 설계안에는 pnpm과 registry-first 구조가 있었지만, 현재 원격 `main`의 실행 경로는 npm 기반입니다.

## Decision

초기 단계에서는 npm workspace를 기준으로 유지합니다.

- `package-lock.json`을 lockfile로 사용합니다.
- `apps/*`, `packages/*`를 workspace로 유지합니다.
- 컴포넌트 구현 전에는 문서 계약과 카탈로그를 먼저 안정화합니다.
- registry-first 배포는 실제 소비 프로젝트 요구가 확인된 뒤 별도 ADR로 다시 결정합니다.

## Consequences

- 새 참여자는 `npm install`과 `npm run dev`만으로 문서 앱을 실행할 수 있습니다.
- 패키지 매니저 혼용으로 인한 lockfile 충돌을 피합니다.
- copy-owned registry 구조로 전환할 수는 있지만, 현재 단계에서는 저장소 구조를 단순하게 유지합니다.
