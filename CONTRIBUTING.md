# 기여 가이드

이 저장소는 디자인 시스템의 컴포넌트, 토큰, 문서 기준을 함께 관리합니다.

변경은 작은 단위로 만들고, 컴포넌트 계약을 문서에 먼저 남긴 뒤 구현으로 이어가는 방식을 기본으로 합니다.

## 언어 체크리스트

- 모든 문서와 주석은 한글만 사용합니다.
- 제목은 한글만 사용합니다.
- 코드 식별자, prop, token 이름은 번역하지 않습니다.

## 컴포넌트 체크리스트

- 새 컴포넌트는 `packages/ui/src/components/catalog.ts`에 먼저 등록합니다.
- 컴포넌트 폴더는 `packages/ui/src/components/{category}/{component-slug}` 형식을 사용합니다.
- 모든 컴포넌트 폴더에는 `README.md`와 `spec.md`가 있어야 합니다.
- 구현을 시작하면 source, style, examples, test를 같은 폴더에 둡니다.
- 색상, 간격, radius, z-index, motion 값은 `--ds-*` 토큰을 사용합니다.
- interactive 컴포넌트는 keyboard, focus, accessible name, disabled/invalid 상태를 문서화합니다.

## 문서 체크리스트

- 해결하는 UI 문제를 한 문장으로 설명합니다.
- public API 초안과 상태 모델을 적습니다.
- 접근성 기준과 참고 패턴을 명시합니다.
- 사용하면 안 되는 패턴이나 open question을 남깁니다.
- 로드맵이나 규약이 바뀌면 `docs/` 문서를 함께 수정합니다.

## 로컬 확인

```bash
npm install
npm run test
npm run typecheck
npm --workspace @workspace/docs run build
```

## 리뷰와 이슈

- 변경 흐름은 작은 수정, 가벼운 점검, 위험한 변경 세 단계로 나눕니다.
- 작업은 이슈에 연결하고 필요한 변경을 `main`에 바로 반영합니다.
- 작은 수정과 일반 기능 변경은 `flow:direct` 라벨을 사용합니다.
- 위험한 변경은 작업 요약에 위험, rollback, 검증 결과를 남기고 `flow:risk` 라벨을 사용합니다.
- GitHub 이슈는 `.github/ISSUE_TEMPLATE`의 목적별 template을 사용합니다.
- 리뷰/이슈 후보는 [리뷰와 이슈 보드](./docs/review-and-issue-board.md)에 먼저 정리합니다.
- 하나의 작업은 가능한 한 하나의 이슈를 닫는 범위로 유지합니다.
- 세부 기준은 [변경 흐름](./docs/change-workflow.md)을 따릅니다.

## 커밋 범위

- 패키지 매니저는 npm을 기준으로 유지합니다.
- `package-lock.json`은 `package.json` 변경과 함께 갱신합니다.
- `.idea`, `.vscode`, `.DS_Store`, `node_modules` 같은 로컬 파일은 커밋하지 않습니다.
