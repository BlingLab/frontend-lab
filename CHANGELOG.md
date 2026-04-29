# 변경 기록 / Changelog

모든 주목할 변경은 이 파일에 기록합니다.
All notable changes are documented in this file.

## Unreleased

### Added

- DataGrid row keyboard navigation과 column resize API를 추가했습니다. / Added DataGrid row keyboard navigation and column resize APIs.
- 시각 회귀, 릴리즈 정책, 브랜치 보호 기준 문서를 추가했습니다. / Added visual regression, release policy, and branch protection criteria docs.
- UI package build 전에 stale `dist`를 정리하는 스크립트를 추가했습니다. / Added a script that cleans stale `dist` output before building the UI package.
- Playwright 기반 docs app screenshot 검증을 추가했습니다. / Added Playwright-based docs app screenshot validation.
- 상호작용 접근성 검증 범위를 Select, DatePicker, FileUploader, Tabs, Stepper, NavigationRail, SideNav로 확장했습니다. / Expanded interaction accessibility validation to Select, DatePicker, FileUploader, Tabs, Stepper, NavigationRail, and SideNav.
- 외부 소비자 fixture 앱과 `test:consumer` 검증을 추가했습니다. / Added an external consumer fixture app and `test:consumer` validation.
- DataGrid column resize keyboard 조작과 ARIA value 상태를 추가했습니다. / Added DataGrid column resize keyboard controls and ARIA value state.
- theme/token 회귀 검증 스크립트 `test:tokens`를 추가했습니다. / Added the `test:tokens` theme/token regression script.
- public prop API 타입 회귀 검증 스크립트 `test:types`를 추가했습니다. / Added the `test:types` public prop API type regression script.
- release prepare, dry-run, publish workflow 자동화를 추가했습니다. / Added release prepare, dry-run, and publish workflow automation.
- lint/format 최소 품질 게이트 `npm run lint`를 추가했습니다. / Added the minimal lint/format quality gate `npm run lint`.
- docs app responsive, theme switch, Tab focus browser smoke 검증 `test:docs-smoke`를 추가했습니다. / Added `test:docs-smoke` browser smoke validation for docs app responsive layout, theme switching, and Tab focus.
- prop-heavy component README/spec용 prop table metadata와 검증을 추가했습니다. / Added prop table metadata and validation for prop-heavy component README/spec docs.
- repo 내부 Markdown 상대 링크 검증 `docs:links`를 추가했습니다. / Added `docs:links` validation for repo-internal Markdown relative links.
- docs app skip link와 자연 Tab 진입 browser smoke 검증을 추가했습니다. / Added docs app skip link and natural Tab entry browser smoke validation.

### Changed

- review/issue 운영 문서에 priority SLA, milestone 기준, follow-up 연결 규칙을 보강했습니다. / Strengthened review and issue operations docs with priority SLA, milestone criteria, and follow-up linking rules.
- DataGrid 문서와 catalog prop 목록을 실제 상호작용 API에 맞췄습니다. / Aligned DataGrid docs and catalog prop lists with the actual interaction APIs.
- scaffold가 기존 README/spec를 기본적으로 보존하고 `--force-docs`에서만 문서를 재생성하도록 바꿨습니다. / Changed scaffold behavior so existing README/spec files are preserved by default and regenerated only with `--force-docs`.
- DataGrid virtual scroll을 v0.1 non-goal로 정하고 row count, 성능, 접근성 검토 기준을 문서화했습니다. / Defined DataGrid virtual scroll as a v0.1 non-goal and documented row-count, performance, and accessibility criteria.
- CommandPalette input focus가 닫힌 dialog에서 초기 page focus를 훔치지 않도록 조정했습니다. / Adjusted CommandPalette input focus so a closed dialog does not steal initial page focus.
- overlay focus return이 실제로 기억한 focus가 있을 때만 복원되도록 수정했습니다. / Fixed overlay focus return so it restores focus only when remembered focus exists.
