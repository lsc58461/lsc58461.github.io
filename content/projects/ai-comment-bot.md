---
title: 커뮤니티 AI 자동 댓글 시스템
tagline: 사이트 API 리버싱 + LLM 문맥 댓글 + 캡차 대응
categories: [ai, automation, reversing]
year: "2026"
role: 개발 (외주 · 다건)
client: 비공개
status: 납품 완료
featured: false
order: 9
stack: ["Python", "customtkinter GUI", "Gemini API", "Cloudflare Turnstile 대응"]
highlights:
  - "커스텀 백엔드의 로그인·CSRF·목록·댓글 등록 API 계약을 리버싱 (본문/댓글은 view 페이지 HTML 파싱)"
  - "게시글 문맥을 읽어 LLM(Gemini)이 자연스러운 댓글/대댓글 생성, 프롬프트 GUI 편집"
  - "서버가 매크로 의심 시에만 요구하는 Turnstile 캡차를 점증 백오프 + 재로그인 + 자동 해결로 대응"
  - "다계정 라운드로빈, 계정별 프록시, 중복 방지 키, 랜덤 딜레이로 자연스러운 운영"
metrics:
  - { label: "AI", value: "Gemini" }
  - { label: "캡차", value: "조건부 대응" }
  - { label: "계정", value: "멀티 + 프록시" }
---

## 무엇을 만들었나

특정 커뮤니티 사이트의 게시판에 AI가 문맥에 맞는 댓글·대댓글을 자동으로 다는 GUI 프로그램입니다. 한 사이트에서 완성한 구조를 다른 사이트 대댓글용으로 재사용해 두 건을 납품했습니다.

## API 리버싱

사이트가 커스텀 백엔드(Express+세션, 또는 셀프호스팅 Supabase 프록시)라 문서가 없어, 로그인(`/api/users/login`), CSRF 토큰 흐름(meta 태그 → 헤더), 게시글 목록, 댓글 등록까지 전 계약을 캡처로 복원했습니다. 목록 API에는 본문·댓글이 비어 있어, 본문과 기존 댓글은 view 페이지 HTML을 파싱해 보강했습니다.

## 캡차와 자연스러움

댓글 등록은 평소엔 토큰 없이 통과하지만, 서버가 매크로로 의심하면 Cloudflare Turnstile을 요구합니다. 이에 대해 (1) 점증 백오프 + 새 세션 재로그인, (2) 옵션으로 캡차 자동 해결을 붙였고, 근본적으로는 **딜레이를 늘리고 하루 건수를 줄여 애초에 캡차가 뜨지 않게** 하는 운영을 권장했습니다. 게시글당 계정별 1회, 72시간 지난 글 제외, 랜덤 텀, 이미 단 댓글 재작성 금지 등 요구 스펙을 그대로 반영했습니다.
