# @workspace/ui

제품 UI에 재사용할 컴포넌트를 배치하는 패키지입니다.

현재 단계에서는 컴포넌트 구현보다 먼저 카탈로그, 폴더 구조, 문서 골조, 작성 규약을 고정합니다. 구현이 시작되면 각 컴포넌트 폴더 안에 실제 소스, 스타일, 테스트, 예시를 추가하고 `apps/docs`에서 실제 export를 import해 검증하는 구조로 확장합니다.

## 구조

```text
src/
├── index.js
└── components/
    ├── catalog.js
    ├── README.md
    └── {category}/{component-slug}/
        ├── README.md
        └── spec.md
```

## 원칙

- 컴포넌트 이름은 `PascalCase`, 폴더명은 `kebab-case`를 사용합니다.
- 시각 변형은 `variant`, 의미 색상은 `tone`, 밀도는 `density`, 크기는 `size`로 표현합니다.
- 상태 스타일은 임의 클래스보다 `data-state`, `data-disabled`, `data-invalid`, `data-orientation` 같은 표준화된 속성을 우선합니다.
- 접근성은 네이티브 HTML을 먼저 사용하고, 커스텀 상호작용이 필요할 때만 WAI-ARIA APG 패턴을 적용합니다.

## 명령어

```bash
npm run components:scaffold
npm run components:validate
```
