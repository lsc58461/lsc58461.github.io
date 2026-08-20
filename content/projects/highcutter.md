---
title: Highcutter
tagline: AI 영화 하이라이트 자동 추출 데스크톱 앱
categories: [desktop, ai]
year: "2026"
role: 기획 · 개발 (개인 프로젝트)
client: 개인 프로젝트
status: 개발 완료
featured: true
order: 3
stack: ["Electron", "Next.js 15", "TypeScript", "shadcn/ui", "FFmpeg", "OpenAI / Gemini"]
highlights:
  - "영상 드롭 → Whisper STT → LLM 하이라이트 추론 → FFmpeg 무손실 컷/병합 파이프라인"
  - "STT·분석 제공자를 OpenAI/Gemini 중 UI에서 각각 선택 (Provider 추상화)"
  - "분석→리뷰/편집→컷 2단계 분리, 멀티 영상 큐, 타임라인 수동 편집"
  - "contextIsolation+sandbox, API 키 safeStorage 암호화, media:// 커스텀 프로토콜로 샌드박스 내 영상 재생"
metrics:
  - { label: "컷 방식", value: "무손실 keyframe" }
  - { label: "제공자", value: "OpenAI · Gemini" }
  - { label: "파이프라인", value: "STT→LLM→FFmpeg" }
---

## 무엇을 만들었나

영화·드라마 파일을 드롭하면 자동으로 하이라이트 구간만 잘라주는 데스크톱 앱입니다. 음성을 텍스트로 옮기고(STT), LLM이 하이라이트를 추론한 뒤, FFmpeg로 무손실 컷/병합합니다.

## 설계

- **제공자 추상화**: STT와 분석 각각을 OpenAI와 Gemini 중에서 UI로 선택할 수 있게 `SttProvider`/`LLMProvider` 인터페이스로 분리했습니다. Gemini는 Files API 업로드, OpenAI는 Whisper verbose_json + json_schema를 사용합니다.
- **2단계 워크플로**: `분석 → 리뷰/편집 → 컷`으로 나눠, 사용자가 추론된 하이라이트를 타임라인에서 직접 토글·트림·삭제한 뒤 내보냅니다. 여러 편을 순차 처리하는 멀티 영상 큐도 지원합니다.
- **보안**: contextIsolation + sandbox, API 키는 safeStorage로 암호화(렌더러로 재전송 안 함), IPC는 zod로 검증, FFmpeg는 shell 없이 spawn.

## 까다로웠던 지점

Electron 샌드박스에서는 `file://` 직접 접근이 막혀 리뷰 화면 영상 재생이 안 됩니다. `media://` 커스텀 프로토콜을 등록하고 `net.fetch`로 Range 요청까지 지원하는 스트리밍 핸들러를 만들어 해결했습니다. 재편집을 위해 분석 결과를 프로젝트 파일로 영속화해, 대시보드에서 다시 열면 스튜디오가 복원된 상태로 재오픈됩니다.
