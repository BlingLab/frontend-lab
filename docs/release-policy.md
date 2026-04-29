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

## 버전 정책 / Versioning Policy

- `0.x` 단계에서는 feature는 minor, fix/docs는 patch로 올립니다. / During `0.x`, ship features as minor versions and fixes/docs as patch versions.
- `1.0.0` 이후에는 SemVer를 엄격히 적용합니다. / After `1.0.0`, apply SemVer strictly.
- public prop, export path, token name 삭제나 rename은 breaking change로 간주합니다. / Removing or renaming public props, export paths, or token names is considered a breaking change.

## 변경 기록 / Changelog

- 모든 릴리즈 후보는 `CHANGELOG.md`의 `Unreleased` 아래에 기록합니다. / Record every release candidate under `Unreleased` in `CHANGELOG.md`.
- 항목은 Added, Changed, Fixed, Docs로 묶습니다. / Group entries under Added, Changed, Fixed, and Docs.
- PR description의 verification 결과를 changelog entry와 맞춥니다. / Align PR verification results with the changelog entry.

## 배포 전 게이트 / Pre-Publish Gate

```bash
npm run test
npm run typecheck
npm --workspace @workspace/docs run build
npm pack --workspace @workspace/ui --dry-run
```

- dry run 산출물에 `dist`, `README.md`, package metadata가 포함되어야 합니다. / The dry-run output must include `dist`, `README.md`, and package metadata.
- dry run 산출물에 오래된 `dist/src` 같은 중복 build output이 포함되면 build cleanup을 먼저 수정합니다. / If the dry-run output includes stale duplicate build output such as `dist/src`, fix build cleanup first.
- package export는 `npm run test:exports` 결과와 일치해야 합니다. / Package exports must match the result of `npm run test:exports`.
