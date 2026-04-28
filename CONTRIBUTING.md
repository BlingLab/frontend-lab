# Contributing

이 저장소는 디자인 시스템의 컴포넌트, 토큰, 문서 기준을 함께 관리합니다.
변경은 작은 단위로 만들고, 컴포넌트 계약을 문서에 먼저 남긴 뒤 구현으로 이어가는 방식을 기본으로 합니다.

## Component Checklist

- 새 컴포넌트는 `packages/ui/src/components/catalog.js`에 먼저 등록합니다.
- 컴포넌트 폴더는 `packages/ui/src/components/{category}/{component-slug}` 형식을 사용합니다.
- 모든 컴포넌트 폴더에는 `README.md`와 `spec.md`가 있어야 합니다.
- 구현을 시작하면 source, style, examples, test를 같은 폴더에 둡니다.
- 색상, 간격, radius, z-index, motion 값은 `--ds-*` 토큰을 사용합니다.
- interactive 컴포넌트는 keyboard, focus, accessible name, disabled/invalid 상태를 문서화합니다.

## Documentation Checklist

- 해결하는 UI 문제를 한 문장으로 설명합니다.
- public API 초안과 상태 모델을 적습니다.
- 접근성 기준과 참고 패턴을 명시합니다.
- 사용하면 안 되는 패턴이나 open question을 남깁니다.
- 로드맵이나 규약이 바뀌면 `docs/` 문서를 함께 수정합니다.

## Local Check

```bash
npm install
npm run components:validate
node --check apps/docs/main.js
node --check apps/docs/server.mjs
```

## Commit Scope

- 패키지 매니저는 npm을 기준으로 유지합니다.
- `package-lock.json`은 `package.json` 변경과 함께 갱신합니다.
- `.idea`, `.vscode`, `.DS_Store`, `node_modules` 같은 로컬 파일은 커밋하지 않습니다.
