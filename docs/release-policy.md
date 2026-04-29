# 릴리즈 정책 / Release Policy

이 정책은 `@workspace/ui`를 다른 프로젝트에서 재사용 가능한 React component package로 운영하기 위한 기본 기준입니다.
This policy defines the baseline for operating `@workspace/ui` as a reusable React component package for other projects.

## 패키지 범위 / Package Scope

- 현재 개발명은 `@workspace/ui`를 유지합니다. / Keep `@workspace/ui` as the current development package name.
- 외부 배포가 확정되면 별도 위험 변경 PR에서 package name을 `@bling-lab/ui` 또는 조직 registry 기준 이름으로 바꿉니다. / When external publishing is confirmed, change the package name to `@bling-lab/ui` or an organization registry name in a separate risky-change PR.
- React와 React DOM은 bundled dependency가 아니라 peer dependency로 유지합니다. / Keep React and React DOM as peer dependencies rather than bundled dependencies.

## Registry 기준 / Registry Criteria

- 공개 OSS 또는 외부 프로젝트 소비가 목표라면 npm public registry를 기본값으로 둡니다. / Use the npm public registry by default for OSS or external project consumption.
- 사내/비공개 소비가 목표라면 GitHub Packages를 사용하되 `.npmrc`와 token 운영 문서를 별도 PR로 추가합니다. / Use GitHub Packages for internal/private consumption, adding `.npmrc` and token operation docs in a separate PR.
- 현재 자동화의 registry 대상은 npm public입니다. 실제 publish 전에는 package name을 조직 scope로 바꾸고 `private` flag를 해제하는 별도 위험 변경 PR이 필요합니다. / The current automation targets the npm public registry. Before real publishing, a separate risky-change PR must change the package name to an organization scope and remove the `private` flag.

## 버전 정책 / Versioning Policy

- `0.x` 단계에서는 feature는 minor, fix/docs는 patch로 올립니다. / During `0.x`, ship features as minor versions and fixes/docs as patch versions.
- `1.0.0` 이후에는 SemVer를 엄격히 적용합니다. / After `1.0.0`, apply SemVer strictly.
- public prop, export path, token name 삭제나 rename은 breaking change로 간주합니다. / Removing or renaming public props, export paths, or token names is considered a breaking change.

## 변경 기록 / Changelog

- 모든 릴리즈 후보는 `CHANGELOG.md`의 `Unreleased` 아래에 기록합니다. / Record every release candidate under `Unreleased` in `CHANGELOG.md`.
- 항목은 Added, Changed, Fixed, Docs로 묶습니다. / Group entries under Added, Changed, Fixed, and Docs.
- PR description의 verification 결과를 changelog entry와 맞춥니다. / Align PR verification results with the changelog entry.

## 버전 준비 / Version Preparation

릴리즈 버전을 만들 때는 아래 script로 `packages/ui/package.json` version과 `CHANGELOG.md` release heading을 함께 준비합니다.
When preparing a release version, use the script below to update the `packages/ui/package.json` version and the `CHANGELOG.md` release heading together.

```bash
npm run release:prepare -- 0.2.0
npm install --package-lock-only
```

- `release:prepare`는 `CHANGELOG.md`의 기존 `Unreleased` 내용을 `버전 - 날짜` heading 아래로 이동합니다. / `release:prepare` moves the existing `Unreleased` content under a `version - date` heading.
- lockfile은 npm workspace metadata를 포함하므로 version 준비 후 `npm install --package-lock-only`로 갱신합니다. / The lockfile contains npm workspace metadata, so update it with `npm install --package-lock-only` after preparing the version.

## 배포 전 게이트 / Pre-Publish Gate

```bash
npm run release:dry-run
```

- dry run 산출물에 `dist`, `README.md`, package metadata가 포함되어야 합니다. / The dry-run output must include `dist`, `README.md`, and package metadata.
- dry run 산출물에 오래된 `dist/src` 같은 중복 build output이 포함되면 build cleanup을 먼저 수정합니다. / If the dry-run output includes stale duplicate build output such as `dist/src`, fix build cleanup first.
- package export는 `npm run test:exports` 결과와 일치해야 합니다. / Package exports must match the result of `npm run test:exports`.

## Publish Workflow / Publish Workflow

`.github/workflows/release.yml`은 수동 실행만 허용합니다.
`.github/workflows/release.yml` only allows manual execution.

- `mode=dry-run`은 검증과 `npm pack --dry-run`만 실행합니다. / `mode=dry-run` only runs validation and `npm pack --dry-run`.
- `mode=publish`는 `confirm` 값이 `publish @workspace/ui`일 때만 `npm publish --workspace @workspace/ui --access public --provenance`를 실행합니다. / `mode=publish` runs `npm publish --workspace @workspace/ui --access public --provenance` only when `confirm` is `publish @workspace/ui`.
- GitHub environment는 `npm-release`, secret은 `NPM_TOKEN`을 사용합니다. / The GitHub environment is `npm-release`, and the secret is `NPM_TOKEN`.
- 실제 publish 전에 npm package name, `private` flag, npm organization permission을 확인합니다. / Before real publishing, verify the npm package name, `private` flag, and npm organization permissions.

## Rollback / Rollback

- 잘못된 release는 같은 major/minor에서 patch version을 올려 수정 배포합니다. / Fix an incorrect release by publishing a patch version in the same major/minor line.
- npm unpublish는 소비자 영향을 만들 수 있으므로 보안 사고나 잘못된 secret 노출 같은 긴급 상황에서만 사용합니다. / Use npm unpublish only for emergencies such as security incidents or leaked secrets because it can affect consumers.
- rollback PR에는 영향받는 package version, 원인, 수정 commit, 소비자 조치가 포함되어야 합니다. / A rollback PR must include the affected package version, cause, fix commit, and consumer action.
