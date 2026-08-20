# lsc58461.github.io

이정윤 개인 포트폴리오 사이트. **Next.js 정적 export + 마크다운 기반 콘텐츠 관리** (DB 없음).

🔗 https://lsc58461.github.io

## 포트폴리오 추가/수정하는 법

프로젝트는 전부 `content/projects/` 안의 `.md` 파일 하나 = 프로젝트 하나로 관리됩니다.
새 프로젝트를 추가하려면 파일 하나만 만들면 되고, 사이트는 다음 push 때 자동 배포됩니다.

```md
---
title: 프로젝트 이름
tagline: 한 줄 설명
category: web        # web | automation | reversing | ai | data | desktop
year: "2026"
role: 역할
client: 클라이언트 (비공개면 "비공개")
status: 상태
featured: true       # 상단 대표 작업에 노출할지
order: 1             # 정렬 순서 (작을수록 위)
stack: ["Next.js", "TypeScript"]
highlights:
  - "핵심 성과 1"
  - "핵심 성과 2"
metrics:
  - { label: "지표명", value: "값" }
links:
  - { label: "라이브", href: "https://..." }
---

## 본문
마크다운으로 자유롭게 작성. h2/h3/목록/코드/인용 지원.
```

- 프론트매터 아래 본문은 마크다운 → HTML로 빌드 시 변환됩니다.
- `featured: true` 인 프로젝트는 홈 상단 "대표 작업"에 카드로 노출됩니다.
- 클라이언트명은 노출 우려가 있으면 익명화(예: "국내 스트리밍 플랫폼")해서 적습니다.

프로필/자기소개/강점 문구는 `lib/site.ts` 에서 수정합니다.

## 로컬 실행

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 정적 export → out/
```

## 배포

- `main` 브랜치에 push하면 GitHub Actions(`.github/workflows/deploy.yml`)가 자동으로 빌드 후 GitHub Pages에 배포합니다.
- 정적 export(`output: "export"`)라 Vercel에 그대로 올려도 동작합니다 — 레포를 import 하기만 하면 됩니다.

## 스택

Next.js 16 (App Router, static export) · React 19 · TypeScript · Tailwind v4 · gray-matter + marked
