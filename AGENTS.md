# AGENTS.md

## 정보 소스 맵

이 파일은 짧게 유지합니다. 자세하고 신뢰할 수 있는 기준은 아래 소스에서 찾습니다.

## 작업 전 확인

- 모든 코드 작업: 먼저 `.docs/`에서 관련 문서를 찾고 읽습니다.
  - 코드 컨벤션: `.docs/CONVENTION.md`
  - 퀄리티 가이드: `.docs/QUALITY.md`

## 소스 우선순위

- 저장소 문서, 설치된 패키지 문서, 로컬 스킬을 모델 기억보다 우선합니다.
- 문서끼리 충돌하면, 변경하려는 코드에 가장 구체적으로 적용되는 로컬 문서를 따릅니다.
- 필요한 가장 작은 범위의 문서를 먼저 읽고, 부족할 때만 더 넓게 탐색합니다.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
