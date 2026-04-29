# 품질 게이트 / Quality Gates

이 문서는 CI에서 실행하는 lint/format 최소 기준을 설명합니다.
This document explains the minimum lint/format criteria used in CI.

## 현재 범위 / Current Scope

`npm run lint`는 `scripts/verify-quality-gates.mjs`를 실행합니다.
`npm run lint` runs `scripts/verify-quality-gates.mjs`.

- TypeScript/TSX/MJS/JS: CRLF, trailing whitespace, tab indentation, merge conflict marker, missing final newline을 검사합니다. / TypeScript/TSX/MJS/JS checks CRLF, trailing whitespace, tab indentation, merge conflict markers, and missing final newlines.
- CSS: CRLF, trailing whitespace, tab indentation, merge conflict marker, missing final newline을 검사합니다. / CSS checks CRLF, trailing whitespace, tab indentation, merge conflict markers, and missing final newlines.
- Markdown: CRLF, trailing whitespace, merge conflict marker, missing final newline을 검사합니다. / Markdown checks CRLF, trailing whitespace, merge conflict markers, and missing final newlines.
- JSON/YAML: CRLF, trailing whitespace, tab indentation, merge conflict marker, missing final newline을 검사합니다. / JSON/YAML checks CRLF, trailing whitespace, tab indentation, merge conflict markers, and missing final newlines.
- `npm run docs:links`: repo 내부 Markdown 상대 링크 대상이 실제로 존재하는지 검사합니다. / `npm run docs:links` checks that repo-internal Markdown relative link targets actually exist.

## 실패 메시지 / Failure Messages

실패 메시지는 `파일:줄: 한글 설명 / English explanation` 형식으로 출력됩니다.
Failure messages are printed as `file:line: Korean explanation / English explanation`.

```bash
npm run lint
npm run docs:links
```

## 단계적 확장 / Phased Expansion

기존 파일 전체 rewrite를 피하기 위해 Prettier/ESLint 전면 도입은 별도 PR에서 처리합니다.
To avoid rewriting the whole repository at once, full Prettier/ESLint adoption should happen in a separate PR.

- 1단계: 현재 최소 whitespace/conflict marker gate를 유지합니다. / Phase 1: Keep the current minimal whitespace/conflict marker gate.
- 2단계: import 정렬과 TypeScript lint rule을 추가합니다. / Phase 2: Add import ordering and TypeScript lint rules.
- 3단계: Markdown formatter 또는 Prettier check를 적용합니다. / Phase 3: Add Markdown formatting or Prettier checks.
