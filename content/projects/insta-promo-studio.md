---
title: Insta Promo Studio
tagline: 프로젝트 폴더 → 인스타 홍보 캐러셀 자동 생성 앱
category: desktop
year: "2026"
role: 기획 · 개발 (개인 프로젝트)
client: 개인 프로젝트
status: 개발 완료
featured: false
order: 11
stack: ["Electron", "Next.js 16", "Claude API (structured output)", "instagrapi"]
highlights:
  - "폴더 선택만으로 README·docs·git log·코드량을 도시에(dossier)로 모아 슬라이드 원고를 LLM structured output으로 생성"
  - "오프스크린 캡처로 1080×1350 피드 이미지 렌더 + 캡션 생성 + 업로드까지 원스톱"
  - "브랜드 실명 노출 금지 요구를 사전 기반 후처리 마스킹으로 보장 (프롬프트 의존 X)"
  - "커스텀 프로토콜 서빙·오프스크린 창 재사용·폰트 base64 임베드 등 Electron 렌더 함정 해결"
metrics:
  - { label: "출력", value: "1080×1350" }
  - { label: "업로드", value: "instagrapi" }
  - { label: "마스킹", value: "사전 후처리" }
---

## 무엇을 만들었나

내 포트폴리오·외주 홍보용 인스타그램 게시글을, 프로젝트 폴더를 선택하기만 하면 만들어주는 데스크톱 앱입니다. 폴더에서 README·CLAUDE.md·docs·git 로그·코드량을 모아 슬라이드 원고를 LLM structured output으로 뽑고, 오프스크린 캡처로 피드 이미지를 렌더한 뒤, 캡션까지 만들어 업로드합니다.

## 설계 결정 & 함정

- **브랜드 마스킹은 프롬프트가 아니라 후처리**로 했습니다. 모델은 반드시 한 번씩 실명을 흘리고, 이미지에 박히면 되돌릴 수 없기 때문에 사전 기반 치환을 렌더 직전에 적용합니다.
- `out/`을 `file://`로 열면 Next의 절대경로가 깨져서, `promo://` 커스텀 프로토콜로 서빙했습니다.
- 오프스크린 창을 매번 새로 만들면 두 번째부터 로드가 실패해서 창 하나를 재사용합니다.
- 폰트는 base64로 CSS에 임베드해야 이미지에 한글이 깨지지 않습니다.

작은 앱이지만, Electron 렌더링과 이미지 파이프라인에서 반복적으로 부딪히는 실전 함정들을 정리한 결과물입니다.
