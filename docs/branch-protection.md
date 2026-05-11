# 브랜치 보호 기준

main branch 보호는 저장소 운영 정책을 바꾸는 설정이므로 코드 PR과 별도로 확인 후 적용합니다.

## 현재 상태

- 2026-04-29 기준 main branch는 GitHub branch protection이 적용되어 있지 않습니다.
- 변경 흐름 문서는 즉시 처리도 branch protection 상태에 따라 짧은 PR로 기록할 수 있다고 정의합니다.
- PR 리뷰 필수 규칙을 켜면 main direct push 예외를 GitHub label만으로 자동 허용할 수 없습니다.

## 권장 설정

- required status check는 `검증
- 기능/구조 변경과 위험 변경은 PR을 필수로 둡니다.
- 즉시 처리 direct push 정책을 유지하려면 branch protection 적용 전 운영자 결정을 먼저 기록합니다.
- branch protection을 켜는 순간 즉시 처리도 `fast-track` 또는 `flow:direct` label을 붙인 짧은 PR로 처리하는 것이 가장 일관됩니다.

## 적용 체크리스트

- [ ] small change direct push 정책 유지 여부를 결정했습니다.
- [ ] required check 이름을 `검증
- [ ] 최소 1개 PR review requirement를 적용할지 결정했습니다.
- [ ] admin bypass 허용 여부를 결정했습니다.
- [ ] 적용 후 dummy PR로 merge 가능 여부를 확인했습니다.
