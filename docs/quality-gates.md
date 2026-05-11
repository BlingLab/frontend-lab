# 품질 게이트

이 문서는 CI에서 실행하는 lint/format 최소 기준을 설명합니다.

## 현재 범위

`npm run lint`는 `scripts/verify-quality-gates.mjs`를 실행합니다.

- TypeScript/TSX/MJS/JS: CRLF, trailing whitespace, tab indentation, merge conflict marker, missing final newline을 검사합니다.
- CSS: CRLF, trailing whitespace, tab indentation, merge conflict marker, missing final newline을 검사합니다.
- Markdown: CRLF, trailing whitespace, merge conflict marker, missing final newline을 검사합니다.
- JSON/YAML: CRLF, trailing whitespace, tab indentation, merge conflict marker, missing final newline을 검사합니다.
- `npm run docs:links`: repo 내부 Markdown 상대 링크 대상이 실제로 존재하는지 검사합니다.

## 실패 메시지

실패 메시지는 `파일:줄: 한글 설명

```bash
npm run lint
npm run docs:links
```

## 단계적 확장

기존 파일 전체 rewrite를 피하기 위해 Prettier/ESLint 전면 도입은 별도 PR에서 처리합니다.

- 1단계: 현재 최소 whitespace/conflict marker gate를 유지합니다.
- 2단계: import 정렬과 TypeScript lint rule을 추가합니다.
- 3단계: Markdown formatter 또는 Prettier check를 적용합니다.
