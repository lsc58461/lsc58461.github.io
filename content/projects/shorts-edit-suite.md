---
title: 숏폼 편집 자동화 도구 2종
tagline: 대본-영상 자동 매칭 + 자막 기반 소스 검색
categories: [automation, ai, desktop, reversing]
year: "2026"
role: 개발 (외주)
client: 비공개
status: 납품 완료
featured: false
order: 7
stack: ["Electron", "Next.js 15", "Python", "OpenAI Whisper", "fuzzball", "yt-dlp"]
highlights:
  - ".vrew 파일 포맷을 리버싱 — ZIP + project.json 구조와 integrity SHA-256 해시 알고리즘 재현"
  - "STT(Whisper) + 퍼지 매칭으로 긴 영상에서 대본과 일치하는 구간만 추출, 원본 타임라인 순서 100% 보존"
  - "Vrew에서 경고 없이 열리는 편집본(.vrew) 생성 — 해시 무결성 검증 통과"
  - "쇼츠 자막 추출 → 키워드화 → 유튜브 검색 자동 팝업으로 원본 소스 탐색 지원"
metrics:
  - { label: "포맷 리버싱", value: ".vrew 크랙" }
  - { label: "대응 길이", value: "1시간+ 영상" }
  - { label: "납기", value: "3일" }
---

## 무엇을 만들었나

숏폼 채널의 편집 공정을 줄이는 윈도우 앱 2종을 한 계약으로 납품했습니다.

**① 대본-영상 매칭기 (Electron)**: 긴 영상과 대본 txt를 입력하면, Whisper STT로 받아쓴 텍스트를 대본과 퍼지 매칭(partial/token-set ratio)해 일치 구간만 추린 편집본을 만듭니다. 추출본과 마킹본 두 가지를 출력하며, **원본 타임라인 순서를 절대 재배치하지 않는 것**이 요구사항이었습니다.

**② 소스 검색기 (Python)**: 쇼츠 URL을 넣으면 자동 자막을 추출해 고유명사·주제어 위주로 키워드화하고, 기본 브라우저에 유튜브 검색 결과 탭을 띄워 원본 영상 탐색을 돕습니다.

## 기술적 핵심 — .vrew 포맷 리버싱

편집본을 Vrew에서 열리게 하려면 `.vrew` 파일을 직접 생성해야 했습니다. 이 포맷은 ZIP 컨테이너 안에 `project.json` 하나가 들어있고, 변조 방지를 위한 **integrity SHA-256 해시**가 걸려 있었습니다. 렌더러 번들을 분석해 해시 계산 알고리즘(path 키 제거 + integrity 공란 후 직렬화 → sha256)을 정확히 재현했고, 그 결과 생성한 편집본이 경고 없이 Vrew에서 열리는 것을 실측으로 확인했습니다.
