# 릴리즈 체크리스트 / Release Checklist

`@workspace/ui`를 다른 프로젝트에서 안정적으로 사용할 수 있도록 릴리즈 전에 아래 항목을 확인합니다.
Check the items below before releasing `@workspace/ui` for use in other projects.

## 필수 검증 / Required Validation

```bash
npm run components:validate
npm run lint
npm run test
npm run typecheck
npm run build
npm --workspace @workspace/docs run build
npm run test:consumer
npm run test:tokens
npm run test:types
npm run test:visual
npm run release:verify
npm pack --workspace @workspace/ui --dry-run
```

- component folder마다 `{slug}.tsx`, `index.ts`, `README.md`, `spec.md`가 있어야 합니다. / Each component folder must have `{slug}.tsx`, `index.ts`, `README.md`, and `spec.md`.
- `lint`는 TypeScript/TSX/MJS, CSS, Markdown, JSON/YAML의 기본 format 회귀를 확인해야 합니다. / `lint` must verify basic format regressions across TypeScript/TSX/MJS, CSS, Markdown, and JSON/YAML.
- `packages/ui/src/index.ts`는 public export만 담당해야 합니다. / `packages/ui/src/index.ts` should only manage public exports.
- `packages/ui/src/components.tsx` 같은 중앙 구현 파일은 만들지 않습니다. / Do not create central implementation files such as `packages/ui/src/components.tsx`.
- build는 `packages/ui/dist`를 먼저 정리해 stale output이 tarball에 들어가지 않아야 합니다. / Build must clean `packages/ui/dist` first so stale output does not enter the tarball.
- UI CSS에는 raw color 값을 직접 쓰지 않습니다. / UI CSS must not contain raw color values.
- `test:a11y`는 핵심 accessible markup을 server render 기준으로 확인해야 합니다. / `test:a11y` must verify core accessible markup through server rendering.
- `test:interaction`은 keyboard, focus return, highlighted option 같은 상호작용 접근성 흐름을 확인해야 합니다. / `test:interaction` must verify interaction accessibility flows such as keyboard, focus return, and highlighted options.
- `test:consumer`는 source alias 없이 `@workspace/ui` root export, per-component export, `styles.css`, token CSS import를 fixture 앱에서 확인해야 합니다. / `test:consumer` must verify `@workspace/ui` root exports, per-component exports, `styles.css`, and token CSS imports in the fixture app without source aliases.
- `test:tokens`는 token contract의 필수 semantic token과 NORMAL/DARK theme 차이를 확인해야 합니다. / `test:tokens` must verify required semantic tokens from the token contract and NORMAL/DARK theme differences.
- `test:types`는 public prop API의 허용/비허용 TypeScript 예제를 확인해야 합니다. / `test:types` must verify allowed and disallowed TypeScript examples for public prop APIs.
- `test:visual`은 docs app home, theme compare, DataGrid screenshot과 horizontal overflow를 확인해야 합니다. / `test:visual` must verify docs app home, theme compare, DataGrid screenshots, and horizontal overflow.
- `test:exports`는 root export와 per-component export가 실제 `dist` 파일과 맞는지 확인해야 합니다. / `test:exports` must verify that root and per-component exports match real `dist` files.
- `release:verify`는 release script, dist 산출물, peer dependency, changelog 상태를 확인해야 합니다. / `release:verify` must verify release scripts, dist output, peer dependencies, and changelog status.
- React는 dependency가 아니라 peer dependency로 유지합니다. / React must remain a peer dependency, not a bundled dependency.

## 산출물 확인 / Output Check

```text
packages/ui/dist/index.js
packages/ui/dist/index.d.ts
packages/ui/dist/styles.css
```

`dist/components/**/index.js`와 `dist/components/**/*.d.ts`가 생성되어야 합니다.
`dist/components/**/index.js` and `dist/components/**/*.d.ts` must be generated.

`packages/ui/package.json`의 `exports` 경로와 실제 산출물은 `npm run test:exports`로 확인합니다.
Verify `packages/ui/package.json` export paths against real output with `npm run test:exports`.

## 문서 확인 / Documentation Check

- 루트 README가 설치, 개발, 사용, 빌드 흐름을 설명합니다. / Root README explains install, development, usage, and build flow.
- `packages/ui/README.md`가 패키지 소비 방법과 component folder 규칙을 설명합니다. / `packages/ui/README.md` explains package consumption and component folder rules.
- 각 컴포넌트 README와 spec가 한글 우선, 영문 병기로 작성되어 있습니다. / Each component README and spec is Korean-first with paired English.
- `docs/package-consumption.md`가 외부 프로젝트 사용 방법을 설명합니다. / `docs/package-consumption.md` explains external project usage.
- `docs/responsive-qa.md`와 docs app의 반응형 section이 viewport 기준을 설명합니다. / `docs/responsive-qa.md` and the docs app responsive section explain viewport criteria.
- `docs/release-policy.md`가 package scope, registry, versioning, changelog 기준을 설명합니다. / `docs/release-policy.md` explains package scope, registry, versioning, and changelog criteria.
- `CHANGELOG.md`의 `Unreleased`가 PR 변경 범위와 맞습니다. / `Unreleased` in `CHANGELOG.md` matches the PR change scope.

## 배포 전 판단 / Pre-Release Decision

이 레포는 현재 workspace 기반 베이스입니다. 실제 npm 또는 GitHub Packages 배포는 [릴리즈 정책](./release-policy.md)을 기준으로 별도 위험 변경 PR에서 결정합니다.
This repo is currently a workspace-based foundation. Publishing to npm or GitHub Packages should be decided in a separate risky-change PR using [Release Policy](./release-policy.md).

## 실제 publish 전 확인 / Before Real Publish

- `npm-release` environment reviewer를 지정합니다. / Configure reviewers for the `npm-release` environment.
- `NPM_TOKEN` secret은 automation 권한만 가진 npm automation token으로 등록합니다. / Register `NPM_TOKEN` as an npm automation token with only the required publish permission.
- `mode=publish` 실행 전 package name과 `private` flag가 npm public publish 기준과 맞는지 확인합니다. / Before running `mode=publish`, confirm that the package name and `private` flag match npm public publish requirements.
- `confirm`에는 `publish @workspace/ui`를 정확히 입력합니다. / Enter exactly `publish @workspace/ui` in `confirm`.
