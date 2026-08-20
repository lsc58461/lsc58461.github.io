---
title: 팝언더 광고 차단 확장
tagline: 회전 도메인 팝언더를 잡는 MV3 크롬 확장
category: web
year: "2026"
role: 개발 (개인 프로젝트)
client: 개인 프로젝트
status: 개발 완료
featured: false
order: 13
stack: ["Chrome Extension MV3", "declarativeNetRequest", "MAIN world 스크립트", "Playwright(검증)"]
highlights:
  - "매번 랜덤 도메인으로 회전하는 팝언더 광고의 실제 메커니즘을 실측으로 규명"
  - "도메인 블랙리스트가 무의미함을 확인 → 2레이어 차단 구조로 설계"
  - "MAIN world에서 window.open/appendChild 가로채기 + dNR로 서드파티 script/iframe/새탭 전면 차단"
  - "Playwright launchPersistentContext로 ON/OFF 대조 클릭 테스트 검증"
metrics:
  - { label: "구조", value: "2레이어" }
  - { label: "대상", value: "회전 도메인" }
  - { label: "검증", value: "ON/OFF 대조" }
---

## 무엇을 만들었나

한 영상 다운로더 사이트의 팝언더 광고를 막는 MV3 크롬 확장입니다. 이 사이트는 첫 클릭을 가로채 `window.open`으로 광고를 띄우는데, **랜딩 도메인이 매번 랜덤으로 회전**해서 확장을 끄면 정작 영상 페이지가 안 열리는 게 정상 증상이었습니다.

## 왜 도메인 차단이 안 되나

로더 스크립트가 CDN에서 주입되고 랜딩 도메인이 회전하므로, 도메인 블랙리스트는 근본적으로 무의미합니다. 그래서 두 레이어로 막았습니다:

1. **MAIN world 스크립트**로 페이지의 `window.open`/`appendChild`를 가로채 광고 진입 자체를 차단.
2. **declarativeNetRequest**로 서드파티 script·iframe·새 탭 문서를 엄격 모드로 전면 차단.

검증은 Playwright `launchPersistentContext(--load-extension)`로 확장 ON/OFF를 대조하며 같은 클릭 테스트를 돌려, 켰을 때만 영상 페이지가 정상적으로 열리는 것을 확인했습니다.
