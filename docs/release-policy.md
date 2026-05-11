# 릴리즈 정책

이 정책은 `@bling-lab/ui`를 다른 프로젝트에서 재사용 가능한 React component package로 운영하기 위한 기본 기준입니다.

## 패키지 범위

- 실제 npm package name은 `@bling-lab/ui`로 확정합니다.
- package는 npm public registry에 `access=public`, provenance enabled 상태로 배포합니다.
- React와 React DOM은 bundled dependency가 아니라 peer dependency로 유지합니다.

## Registry 기준

- 공개 OSS 또는 외부 프로젝트 소비가 목표라면 npm public registry를 기본값으로 둡니다.
- 사내/비공개 소비가 목표라면 GitHub Packages를 사용하되 `.npmrc`와 token 운영 문서를 별도 이슈로 추가합니다.
- 현재 자동화의 registry 대상은 npm public입니다. `packages/ui/package.json`은 `private=false`와 npm public `publishConfig`를 유지해야 합니다.
- `@bling-lab/ui`는 2026-05-06 기준 npm registry에 기존 등록 패키지가 없음을 확인했습니다.

## 버전 정책

- `0.x` 단계에서는 feature는 minor, fix/docs는 patch로 올립니다.
- `1.0.0` 이후에는 SemVer를 엄격히 적용합니다.
- public prop, export path, token name 삭제나 rename은 breaking change로 간주합니다.

## 변경 기록

- 모든 릴리즈 후보는 `CHANGELOG.md`의 `Unreleased` 아래에 기록합니다.
- 항목은 Added, Changed, Fixed, Docs로 묶습니다.
- 작업 요약의 검증 결과를 changelog entry와 맞춥니다.

## 버전 준비

릴리즈 버전을 만들 때는 아래 script로 `packages/ui/package.json` version과 `CHANGELOG.md` release heading을 함께 준비합니다.

```bash
npm run release:prepare -- 0.2.0
npm install --package-lock-only
```

- `release:prepare`는 `CHANGELOG.md`의 기존 `Unreleased` 내용을 `버전 - 날짜` heading 아래로 이동합니다.
- lockfile은 npm workspace metadata를 포함하므로 version 준비 후 `npm install --package-lock-only`로 갱신합니다.

## 배포 전 게이트

```bash
npm run release:dry-run
```

- dry run 산출물에 `dist`, `README.md`, package metadata가 포함되어야 합니다.
- dry run 산출물에 오래된 `dist/src` 같은 중복 build output이 포함되면 build cleanup을 먼저 수정합니다.
- package export는 `npm run test:exports` 결과와 일치해야 합니다.

## 배포 workflow

`.github/workflows/release.yml`은 수동 실행만 허용합니다.

- `mode=dry-run`은 검증과 `npm pack --dry-run`만 실행합니다.
- `mode=publish`는 `confirm` 값이 `publish @bling-lab/ui`이고 `release:publish-verify`가 통과할 때만 `npm publish --workspace @bling-lab/ui --access public --provenance`를 실행합니다.
- GitHub environment는 `npm-release`, secret은 `NPM_TOKEN`을 사용합니다.
- `release:publish-verify`는 `@bling-lab/ui`, `private=false`, npm public `publishConfig`, `NODE_AUTH_TOKEN` 조건을 확인합니다.
- 실제 publish 전에는 npm `bling-lab` organization 또는 scope 소유권, automation token publish 권한, GitHub `npm-release` environment reviewer를 외부 설정에서 확인합니다.

## 되돌리기

- 잘못된 release는 같은 major/minor에서 patch version을 올려 수정 배포합니다.
- npm unpublish는 소비자 영향을 만들 수 있으므로 보안 사고나 잘못된 secret 노출 같은 긴급 상황에서만 사용합니다.
- rollback commit과 이슈 코멘트에는 영향받는 package version, 원인, 수정 commit, 소비자 조치가 포함되어야 합니다.
