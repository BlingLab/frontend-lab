# 기여 가이드 / Contributing

이 저장소는 디자인 시스템의 컴포넌트, 토큰, 문서 기준을 함께 관리합니다.
This repository manages design system components, tokens, and documentation standards together.

변경은 작은 단위로 만들고, 컴포넌트 계약을 문서에 먼저 남긴 뒤 구현으로 이어가는 방식을 기본으로 합니다.
Keep changes small, document the component contract first, and then move into implementation.

## 언어 체크리스트 / Language Checklist

- 모든 문서와 주석은 한글을 먼저 쓰고 영문을 이어 씁니다. / Write Korean first and English second in all docs and comments.
- 제목은 `한글 / English` 형식을 사용합니다. / Use the `Korean / English` format for headings.
- 코드 식별자, prop, token 이름은 번역하지 않습니다. / Do not translate code identifiers, props, or token names.

## 컴포넌트 체크리스트 / Component Checklist

- 새 컴포넌트는 `packages/ui/src/components/catalog.ts`에 먼저 등록합니다. / Register new components in `packages/ui/src/components/catalog.ts` first.
- 컴포넌트 폴더는 `packages/ui/src/components/{category}/{component-slug}` 형식을 사용합니다. / Use `packages/ui/src/components/{category}/{component-slug}` for component folders.
- 모든 컴포넌트 폴더에는 `README.md`와 `spec.md`가 있어야 합니다. / Every component folder must include `README.md` and `spec.md`.
- 구현을 시작하면 source, style, examples, test를 같은 폴더에 둡니다. / When implementation starts, keep source, style, examples, and tests in the same folder.
- 색상, 간격, radius, z-index, motion 값은 `--ds-*` 토큰을 사용합니다. / Use `--ds-*` tokens for color, spacing, radius, z-index, and motion values.
- interactive 컴포넌트는 keyboard, focus, accessible name, disabled/invalid 상태를 문서화합니다. / Interactive components must document keyboard behavior, focus, accessible names, and disabled/invalid states.

## 문서 체크리스트 / Documentation Checklist

- 해결하는 UI 문제를 한 문장으로 설명합니다. / Describe the UI problem being solved in one sentence.
- public API 초안과 상태 모델을 적습니다. / Write the public API draft and state model.
- 접근성 기준과 참고 패턴을 명시합니다. / Specify accessibility requirements and reference patterns.
- 사용하면 안 되는 패턴이나 open question을 남깁니다. / Record disallowed patterns and open questions.
- 로드맵이나 규약이 바뀌면 `docs/` 문서를 함께 수정합니다. / Update `docs/` when the roadmap or conventions change.

## 로컬 확인 / Local Check

```bash
npm install
npm run test
npm run typecheck
npm --workspace @workspace/docs run build
```

## 리뷰와 이슈 / Review And Issues

- GitHub 이슈는 `.github/ISSUE_TEMPLATE`의 목적별 template을 사용합니다. / GitHub issues use purpose-specific templates in `.github/ISSUE_TEMPLATE`.
- PR은 `.github/pull_request_template.md` 체크리스트를 기준으로 작성합니다. / Pull requests follow the checklist in `.github/pull_request_template.md`.
- 리뷰/이슈/PR 후보는 [리뷰와 이슈 보드](./docs/review-and-issue-board.md)에 먼저 정리합니다. / Review, issue, and PR candidates are first organized in the [Review And Issue Board](./docs/review-and-issue-board.md).
- 하나의 PR은 가능한 한 하나의 이슈를 닫는 범위로 유지합니다. / Keep one PR scoped to close one issue whenever possible.

## 커밋 범위 / Commit Scope

- 패키지 매니저는 npm을 기준으로 유지합니다. / Keep npm as the package manager.
- `package-lock.json`은 `package.json` 변경과 함께 갱신합니다. / Update `package-lock.json` together with `package.json` changes.
- `.idea`, `.vscode`, `.DS_Store`, `node_modules` 같은 로컬 파일은 커밋하지 않습니다. / Do not commit local files such as `.idea`, `.vscode`, `.DS_Store`, or `node_modules`.
