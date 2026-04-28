# 프로젝트 작업 지침 / Project Work Guidelines

## 언어 기준 / Language Standard

- 모든 문서, 주석, TODO, 개발자-facing 메시지는 한글을 먼저 쓰고 바로 뒤에 영문을 병기합니다.
  - Write Korean first for all documentation, comments, TODOs, and developer-facing messages, followed by English.
- 제목은 `한글 제목 / English Title` 형식을 사용합니다.
  - Use the `Korean Title / English Title` format for headings.
- 본문은 같은 bullet 안에서 `한글 문장 / English sentence` 형식을 우선합니다.
  - Prefer `Korean sentence / English sentence` in the same bullet or paragraph.
- 코드 식별자, 패키지명, prop, CSS class, token 이름은 원문을 유지합니다.
  - Keep code identifiers, package names, props, CSS classes, and token names in their original form.
- 접근성, 명세, 표준 링크처럼 공식 영문 용어가 중요한 경우에도 한글 설명을 먼저 둡니다.
  - Even when official English terms matter, such as accessibility specs and standards links, place the Korean explanation first.
- 새 컴포넌트 문서는 `npm run components:scaffold -- --force`로 재생성하기 전에 사용자가 만든 수동 변경이 없는지 확인합니다.
  - Before regenerating component docs with `npm run components:scaffold -- --force`, check that there are no user-authored manual changes to preserve.
