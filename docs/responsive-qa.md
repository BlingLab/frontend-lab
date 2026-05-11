# 반응형 검증 기준

컴포넌트 시스템은 특정 앱 화면 하나가 아니라 여러 React 프로젝트의 기본 레이아웃으로 쓰이기 때문에 viewport별 검증 기준을 고정합니다.

## 기준 viewport

- 모바일
- 태블릿
- 데스크톱

## 구현 기준

- page width는 `--ds-container-*`, gutter는 `--ds-page-gutter`를 사용합니다.
- form control은 좁은 화면에서 `width="full"`을 우선 사용합니다.
- 고정 형식 UI는 `minmax(0, 1fr)`, `overflow-x: auto`, stable min-height를 사용해 text overflow와 layout shift를 줄입니다.
- 문서 앱의 `반응형 시스템

## 검증 명령

```bash
npm run typecheck
npm --workspace @workspace/docs run build
npm run test:docs-smoke
```

## 문서 앱 브라우저 스모크

- `npm run test:docs-smoke`는 문서 앱 로컬 서버를 띄우고 mobile/tablet/desktop viewport를 Playwright로 확인합니다.
- header, theme controls, responsive matrix, component preview가 viewport 밖으로 밀리거나 sibling overlap을 만들면 실패합니다.
- DARK/NORMAL 테마 전환이 `data-ds-theme`와 계산된 배경을 바꾸는지 확인합니다.
- 첫 Tab focus 흐름이 보이지 않는 요소나 viewport 밖 요소로 이동하지 않는지 최소 검증합니다.
- body에서 첫 Tab은 visible skip link로 진입하고 Enter는 main content focus로 이동해야 합니다. hash route에서는 target section을 focus anchor로 잡고 다음 Tab이 visible focus로 이동해야 합니다.
