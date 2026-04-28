# 릴리즈 체크리스트 / Release Checklist

`@workspace/ui`를 다른 프로젝트에서 안정적으로 사용할 수 있도록 릴리즈 전에 아래 항목을 확인합니다.
Check the items below before releasing `@workspace/ui` for use in other projects.

## 필수 검증 / Required Validation

```bash
npm run components:validate
npm run typecheck
npm run build
```

- component folder마다 `{slug}.tsx`, `index.ts`, `README.md`, `spec.md`가 있어야 합니다. / Each component folder must have `{slug}.tsx`, `index.ts`, `README.md`, and `spec.md`.
- `packages/ui/src/index.ts`는 public export만 담당해야 합니다. / `packages/ui/src/index.ts` should only manage public exports.
- `packages/ui/src/components.tsx` 같은 중앙 구현 파일은 만들지 않습니다. / Do not create central implementation files such as `packages/ui/src/components.tsx`.
- UI CSS에는 raw color 값을 직접 쓰지 않습니다. / UI CSS must not contain raw color values.
- React는 dependency가 아니라 peer dependency로 유지합니다. / React must remain a peer dependency, not a bundled dependency.

## 산출물 확인 / Output Check

```text
packages/ui/dist/index.js
packages/ui/dist/index.d.ts
packages/ui/dist/styles.css
```

`dist/components/**/index.js`와 `dist/components/**/*.d.ts`가 생성되어야 합니다.
`dist/components/**/index.js` and `dist/components/**/*.d.ts` must be generated.

## 문서 확인 / Documentation Check

- 루트 README가 설치, 개발, 사용, 빌드 흐름을 설명합니다. / Root README explains install, development, usage, and build flow.
- `packages/ui/README.md`가 패키지 소비 방법과 component folder 규칙을 설명합니다. / `packages/ui/README.md` explains package consumption and component folder rules.
- 각 컴포넌트 README와 spec가 한글 우선, 영문 병기로 작성되어 있습니다. / Each component README and spec is Korean-first with paired English.
- `docs/package-consumption.md`가 외부 프로젝트 사용 방법을 설명합니다. / `docs/package-consumption.md` explains external project usage.

## 배포 전 판단 / Pre-Release Decision

이 레포는 현재 workspace 기반 베이스입니다. 실제 npm 또는 GitHub Packages로 배포하려면 package name, scope, registry, versioning 정책을 먼저 확정합니다.
This repo is currently a workspace-based foundation. Before publishing to npm or GitHub Packages, confirm package name, scope, registry, and versioning policy.
