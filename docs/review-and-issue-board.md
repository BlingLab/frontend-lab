# 리뷰와 이슈 보드

이 문서는 GitHub Issue로 옮길 항목을 정리하는 lightweight backlog입니다.

## 코드 리뷰 기준

- public API는 `docs/prop-api-guidelines.md`의 prop 축과 controlled/uncontrolled 규칙을 따라야 합니다.
- 컴포넌트 구현은 각 폴더의 `{slug}.tsx`에 있고 root barrel은 export만 담당해야 합니다.
- keyboard, focus-visible, disabled, invalid, selected, open 상태는 DOM state와 ARIA state가 함께 맞아야 합니다.
- CSS는 semantic/component token을 사용하고 raw color, 임의 spacing, theme name 분기를 피해야 합니다.
- 문서 앱 예시는 실제 `@bling-lab/ui` export를 렌더링해야 합니다.

## 현재 이슈 후보

이 표는 생성 당시의 후보와 완료 기준을 남기는 기록입니다. 새 실행 순서는 아래 `우선순위와 SLA`, `마일스톤 운영`, `다음 작업 묶음 기준`을 기준으로 정합니다.

| Issue | 우선순위| 제목| 유형| 기준|
| --- | --- | --- | --- | --- |
| [#1](https://github.com/BlingLab/frontend-lab/issues/1) | P0 | CI workflow 추가| infra | 필요한 경우 수동 workflow로 검증합니다.|
| [#2](https://github.com/BlingLab/frontend-lab/issues/2) | Done | 접근성 회귀 테스트 확장| quality | `Dialog`, `CommandPalette`, `Combobox`, `DataGrid` keyboard 흐름과 주요 interactive component 흐름을 자동화했습니다.|
| [#3](https://github.com/BlingLab/frontend-lab/issues/3) | Done | main 직접 반영 운영 기준| review | `docs/branch-protection.md`에 보호 정책을 끄고 main 직접 반영하는 기준을 기록했습니다.|
| [#4](https://github.com/BlingLab/frontend-lab/issues/4) | P1 | 시각 회귀 기준 추가| quality | NORMAL/DARK, mobile/tablet/desktop 기준은 `docs/visual-regression.md`로 정의합니다.|
| [#5](https://github.com/BlingLab/frontend-lab/issues/5) | P1 | 패키지 릴리즈 정책 확정| release | package scope, registry, versioning, changelog 기준은 `docs/release-policy.md`로 관리합니다.|
| [#6](https://github.com/BlingLab/frontend-lab/issues/6) | Done | DataGrid 고급 상호작용 설계| component | row 키보드 이동과 column resize를 구현했고 virtual scroll은 별도 이슈 후보로 분리했습니다.|
| [#7](https://github.com/BlingLab/frontend-lab/issues/7) | Done | React 컴포넌트 시스템 하드닝 완료 기록| tracking | 완료된 component hardening 작업을 closed issue로 기록했습니다.|
| [#8](https://github.com/BlingLab/frontend-lab/issues/8) | Done | Button ref 전달 구조 개선| component | overlay focus return이 explicit trigger ref 기반으로 동작합니다.|
| [#9](https://github.com/BlingLab/frontend-lab/issues/9) | Done | Listbox highlight hook 공통화| component | Combobox와 CommandPalette가 disabled option guard를 포함한 shared highlight hook을 사용합니다.|
| [#10](https://github.com/BlingLab/frontend-lab/issues/10) | Done | Overlay dismiss와 focus hook 공통화| component | Escape, outside pointer, focus return 로직이 shared hook으로 정리되었습니다.|
| [#12](https://github.com/BlingLab/frontend-lab/issues/12) | Done | DataGrid virtual scroll 범위 결정| component | 대량 데이터셋 기준과 ARIA 영향을 별도 후속으로 분리했습니다.|
| [#46](https://github.com/BlingLab/frontend-lab/issues/46) | Done | DataGrid virtual scroll ARIA 검증 프로토타입| component | `test:datagrid-virtual`이 대량 데이터셋, 키보드 이동, selection, row count/index 전략을 검증합니다.|
| [#47](https://github.com/BlingLab/frontend-lab/issues/47) | Done | 컴포넌트 문서 재생성 전 수동 변경 감지| documentation | scaffold dry-run, manual marker, prop table drift check를 추가했습니다.|
| [#48](https://github.com/BlingLab/frontend-lab/issues/48) | Done | pixel baseline comparison 도입| quality | `test:visual`이 스크린샷 artifact와 baseline pixel comparison을 함께 검증합니다.|
| [#49](https://github.com/BlingLab/frontend-lab/issues/49) | Done | 실제 npm publish scope와 권한 확정| release | package scope를 `@bling-lab/ui`로 확정하고 `private=false`, npm public `publishConfig`, publish 검증을 추가했습니다.|

## 우선순위와 SLA

| 우선순위| 기준| 기대 처리|
| --- | --- | --- |
| P0 | `main`, release, 보안, package install, 핵심 접근성 회귀를 막는 항목입니다.| 가장 먼저 처리하고 낮은 우선순위 뒤로 묶지 않습니다. 가능한 당일 또는 다음 영업일 안에 main에 반영하고 검증합니다.|
| P1 | release readiness, public API, 반복 사용 컴포넌트 품질, 검증 신뢰도처럼 제품화 기준에 직접 영향을 주는 항목입니다.| 새 P2 작업보다 먼저 처리합니다. 같은 작업 묶음 안에서 끝낼 수 있도록 commit 범위를 좁힙니다.|
| P2 | 사용성, 문서, 후속 설계, 장기 확장성처럼 즉시 차단하지 않는 개선 항목입니다.| 관련 영역을 만질 때 함께 처리하거나 P0/P1이 비어 있을 때 순차 처리합니다.|

## 마일스톤 운영

- 현재는 GitHub Milestone을 기본 계획 단위로 사용합니다. Project board는 동시에 여러 owner가 병렬로 운영하거나 issue 수가 20개를 넘을 때 도입합니다.
- `M0 Foundation Hardening`은 수동 검증 workflow, main 운영 기준, core component refactor처럼 기반 안정화 항목을 담습니다.
- `M1 Release Readiness`는 package publish, changelog, public API contract, consumer fixture처럼 배포 가능성을 증명하는 항목을 담습니다.
- `M2 Docs And Scale Follow-up`은 문서 앱 smoke, prop 표 자동화, virtual scroll decision처럼 문서화와 확장성 후속 항목을 담습니다.
- milestone은 완료 목표가 아니라 다음 작업 묶음의 경계입니다. 범위가 커지면 새 issue로 분리하고 milestone 안에서 우선순위를 다시 정렬합니다.

## 다음 작업 묶음 기준

- P0와 P1이 남아 있으면 새 P2를 시작하지 않습니다. 단, P2가 현재 작업의 문서 보강이나 검증 누락을 직접 해결하는 경우에는 같은 commit 묶음에 포함할 수 있습니다.
- 같은 label 묶음인 `ci`, `release`, `accessibility`, `component`, `documentation`을 우선 함께 검토합니다. 구현 파일이 겹치지 않으면 commit을 분리합니다.
- 하나의 작업은 기본적으로 하나의 issue를 닫습니다. 같은 root cause와 같은 검증 명령이면 연결 issue를 함께 닫을 수 있습니다.
- 즉시 처리와 일반 기능 변경은 `fast-track` 또는 `flow:direct`로 main에 직접 반영합니다.
- 위험한 변경은 `flow:risk`로 표시하고 작업 요약에 체크리스트, rollback 기준, 추가 검증을 적습니다.

## 닫힌 이슈와 후속 연결

- commit 메시지나 작업 요약에는 닫을 issue를 `Closes #번호`로 명시합니다.
- 작업 중 새 범위가 발견되면 기존 issue 범위를 늘리지 말고 새 issue를 만들고 원본 issue에 `Follow-up: #번호`로 연결합니다.
- 닫힌 issue는 완료 기준이 실패한 경우에만 다시 엽니다. 새 요구사항이나 개선은 follow-up issue로 분리합니다.
- follow-up issue는 출처 issue, priority label, flow label, 최소 완료 기준을 포함해야 합니다.
- main 반영 후 issue comment에는 실제 검증 명령과 남은 위험을 짧게 남깁니다.

## 작업 후보

### 1. CI와 검증 자동화

- 수동 실행이 필요한 workflow만 유지합니다.
- 검증 명령과 결과를 이슈 코멘트에 남깁니다.

### 2. 접근성 상호작용 테스트

- keyboard, focus, ARIA 회귀 가능성이 있는 컴포넌트부터 처리합니다.
- 관련 테스트가 있으면 함께 갱신합니다.

### 3. main 직접 반영 운영 기준

- 브랜치 보호 설정과 저장소 규칙은 사용하지 않습니다.
- 위험 변경만 별도 확인 후 main에 반영합니다.

### 4. 릴리즈 준비

- package metadata, changelog, dry run 결과를 같은 이슈에서 확인합니다.
- publish는 수동 workflow로만 실행합니다.

### 5. DataGrid 성숙도 향상

- virtual scroll, row selection, resize처럼 영향 범위가 큰 동작은 별도 이슈로 나눕니다.
- 완료 기준과 검증 명령을 이슈에 남깁니다.

### 6. 상호작용 리팩토링

- overlay, listbox, focus hook처럼 공통 동작은 작은 commit으로 나눕니다.
- 회귀 가능성이 있는 컴포넌트를 명시합니다.

### 7. 문서 자동화 후속

- component scaffold, prop table, 문서 링크 검증을 같이 확인합니다.
- 수동 변경이 있는 문서는 덮어쓰지 않습니다.

### 8. 시각 회귀 기준 후속

- baseline 갱신 사유와 화면 범위를 commit과 이슈 코멘트에 남깁니다.
- 필요한 경우에만 `npm run test:visual`을 수동 실행합니다.

## 운영 방식

1. 이 문서의 후보를 GitHub Issue로 만들고 template의 완료 기준을 채웁니다.
2. 작업은 하나의 이슈 또는 강하게 연결된 이슈 묶음만 닫도록 작게 유지합니다.
3. commit 메시지와 이슈 코멘트에는 닫는 이슈, 변경 범위, 검증 결과를 남깁니다.
4. main 반영 전에는 변경 범위에 맞는 최소 검증을 직접 선택합니다.
