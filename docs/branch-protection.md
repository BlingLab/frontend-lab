# 브랜치 보호 기준 / Branch Protection Criteria

main branch 보호는 저장소 운영 정책을 바꾸는 설정이므로 코드 PR과 별도로 확인 후 적용합니다.
Protecting the main branch changes repository operations, so apply it after review separately from code PRs.

## 현재 상태 / Current State

- 2026-04-29 기준 main branch는 GitHub branch protection이 적용되어 있지 않습니다. / As of 2026-04-29, GitHub branch protection is not enabled for the main branch.
- 변경 흐름 문서는 즉시 처리도 branch protection 상태에 따라 짧은 PR로 기록할 수 있다고 정의합니다. / The change workflow defines that even Fast Track changes can be recorded through a short PR depending on branch protection.
- PR 리뷰 필수 규칙을 켜면 main direct push 예외를 GitHub label만으로 자동 허용할 수 없습니다. / If PR review is required, GitHub labels alone cannot automatically allow direct-push exceptions.

## 권장 설정 / Recommended Settings

- required status check는 `검증 / Verify`를 사용합니다. / Use `검증 / Verify` as the required status check.
- 기능/구조 변경과 위험 변경은 PR을 필수로 둡니다. / Require PRs for feature/structure changes and risky changes.
- 즉시 처리 direct push 정책을 유지하려면 branch protection 적용 전 운영자 결정을 먼저 기록합니다. / If keeping direct push for Fast Track changes, record the owner decision before enabling branch protection.
- branch protection을 켜는 순간 즉시 처리도 `fast-track` 또는 `flow:direct` label을 붙인 짧은 PR로 처리하는 것이 가장 일관됩니다. / Once branch protection is enabled, the most consistent path is to handle Fast Track changes through short PRs labeled `fast-track` or `flow:direct`.

## 적용 체크리스트 / Application Checklist

- [ ] small change direct push 정책 유지 여부를 결정했습니다. / Decided whether to keep the small-change direct push policy.
- [ ] required check 이름을 `검증 / Verify`로 확인했습니다. / Confirmed the required check name is `검증 / Verify`.
- [ ] 최소 1개 PR review requirement를 적용할지 결정했습니다. / Decided whether to require at least one PR review.
- [ ] admin bypass 허용 여부를 결정했습니다. / Decided whether to allow admin bypass.
- [ ] 적용 후 dummy PR로 merge 가능 여부를 확인했습니다. / Verified merge behavior with a dummy PR after applying settings.
