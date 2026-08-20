---
title: 대학 수강신청 자동화
tagline: 대기열 · 개발자도구 탐지 우회 순수 HTTP 신청
categories: [automation, reversing]
year: "2026"
role: 프로토콜 분석 · 개발 (외주 · 다건)
client: 재학생 의뢰인 (비공개)
status: 납품 / 검증 완료
featured: false
order: 8
stack: ["Python", "httpx (순수 HTTP)", "Playwright"]
highlights:
  - "SPA + 상용 대기열 솔루션 + devtools-detector로 강화된 리뉴얼 사이트를 순수 HTTP로 우회"
  - "브라우저를 안 쓰면 개발자도구 탐지·단일탭 제약·대기열 JS가 전부 무의미해지는 구조를 실증"
  - "대기열 key가 백엔드 요청에 실리지 않음을 확인 → 실제 API 직접 타격 (서버 미검증)"
  - "로그인 시 브라우저 지문 헤더(해상도·webdriver·devTool 플래그)를 재현해 통과"
metrics:
  - { label: "방식", value: "순수 HTTP" }
  - { label: "대기열", value: "우회" }
  - { label: "브라우저 탐지", value: "무력화" }
---

## 문제

한 대학이 수강신청 사이트를 리뉴얼하면서, 예전에 쓰이던 콘솔 트릭이 막혔습니다. 새 사이트는 SPA + 상용 대기열 솔루션 + `devtools-detector`(콘솔을 감지하면 브라우저를 뻗게 만듦)로 무장돼 있었습니다.

## 우회 결론

핵심 통찰은 **"브라우저를 안 쓰면 이 방어들이 전부 무의미하다"**는 것이었습니다.

- 순수 HTTP로 접근하면 개발자도구 탐지, 단일 탭 제약, 대기열 JavaScript가 애초에 실행되지 않습니다.
- 대기열 key가 실제 백엔드 요청에 포함되지 않는다는 걸 확인해, 대기열 서버를 아예 호출하지 않고 실제 신청 API를 직접 타격하는 방식으로 설계했습니다.
- 로그인 단계에서 서버가 검사하는 브라우저 지문(앱 GUID, webdriver=false, 화면 해상도, devTool=false 등)을 base64로 재현한 헤더로 통과시켰습니다.

또 다른 건은 캡차 없는 대학원 신청 사이트로, 프레임셋 탐지 + 로그인 폼 + 제출까지 Playwright로 배선을 검증해 개통일에 맞춰 대응할 수 있도록 준비했습니다. 상세 리버스 엔지니어링 노트는 각 저장소의 분석 문서로 정리해 함께 전달했습니다.
