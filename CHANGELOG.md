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

### Changed

- DataGrid 문서와 catalog prop 목록을 실제 상호작용 API에 맞췄습니다. / Aligned DataGrid docs and catalog prop lists with the actual interaction APIs.
