# 릴리즈 체크리스트

`@bling-lab/ui`를 다른 프로젝트에서 안정적으로 사용할 수 있도록 릴리즈 전에 아래 항목을 확인합니다.

## 필수 검증

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
npm pack --workspace @bling-lab/ui --dry-run
```

- component folder마다 `{slug}.tsx`, `index.ts`, `README.md`, `spec.md`가 있어야 합니다.
- `lint`는 TypeScript/TSX/MJS, CSS, Markdown, JSON/YAML의 기본 format 회귀를 확인해야 합니다.
- `packages/ui/src/index.ts`는 public export만 담당해야 합니다.
- `packages/ui/src/components.tsx` 같은 중앙 구현 파일은 만들지 않습니다.
- build는 `packages/ui/dist`를 먼저 정리해 stale output이 tarball에 들어가지 않아야 합니다.
- UI CSS에는 raw color 값을 직접 쓰지 않습니다.
- `test:a11y`는 핵심 accessible markup을 server render 기준으로 확인해야 합니다.
- `test:interaction`은 keyboard, focus return, highlighted option 같은 상호작용 접근성 흐름을 확인해야 합니다.
- `test:consumer`는 소스 alias 없이 `@bling-lab/ui` 루트 export, 개별 컴포넌트 export, `styles.css`, token CSS import를 fixture 앱에서 확인해야 합니다.
- `test:tokens`는 token contract의 필수 semantic token과 NORMAL/DARK theme 차이를 확인해야 합니다.
- `test:types`는 public prop API의 허용/비허용 TypeScript 예제를 확인해야 합니다.
- `test:visual`은 문서 앱 home, 테마 비교, DataGrid 스크린샷과 가로 넘침를 확인해야 합니다.
- `test:exports`는 루트 export와 개별 컴포넌트 export가 실제 `dist` 파일과 맞는지 확인해야 합니다.
- `release:verify`는 release script, dist 산출물, peer dependency, changelog 상태를 확인해야 합니다.
- 실제 publish 전에는 `release:publish-verify`가 package name, private flag, publish token 조건을 확인해야 합니다.
- React는 dependency가 아니라 peer dependency로 유지합니다.

## 산출물 확인

```text
packages/ui/dist/index.js
packages/ui/dist/index.d.ts
packages/ui/dist/styles.css
```

`dist/components/**/index.js`와 `dist/components/**/*.d.ts`가 생성되어야 합니다.

`packages/ui/package.json`의 `exports` 경로와 실제 산출물은 `npm run test:exports`로 확인합니다.

## 문서 확인

- 루트 README가 설치, 개발, 사용, 빌드 흐름을 설명합니다.
- `packages/ui/README.md`가 패키지 소비 방법과 component folder 규칙을 설명합니다.
- 각 컴포넌트 README와 spec가 한글로 작성되어 있습니다.
- `docs/package-consumption.md`가 외부 프로젝트 사용 방법을 설명합니다.
- `docs/responsive-qa.md`와 문서 앱의 반응형 section이 viewport 기준을 설명합니다.
- `docs/release-policy.md`가 package scope, registry, versioning, changelog 기준을 설명합니다.
- `CHANGELOG.md`의 `Unreleased`가 PR 변경 범위와 맞습니다.

## 배포 전 판단

이 레포는 현재 workspace 기반 베이스입니다. 실제 npm 또는 GitHub Packages 배포는 [릴리즈 정책](./release-policy.md)을 기준으로 별도 위험 변경 PR에서 결정합니다.

## 실제 publish 전 확인

- `npm-release` environment reviewer를 지정합니다.
- `NPM_TOKEN` secret은 automation 권한만 가진 npm automation token으로 등록합니다.
- `mode=publish` 실행 전 package name이 `@bling-lab/ui`이고 `private=false`, `publishConfig.registry=https://registry.npmjs.org/`, `publishConfig.access=public`, `publishConfig.provenance=true`인지 확인합니다.
- npm `bling-lab` organization 또는 scope 소유권과 automation token publish 권한을 npm settings에서 확인합니다.
- `confirm`에는 `publish @bling-lab/ui`를 정확히 입력합니다.
