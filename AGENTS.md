# PROJECT KNOWLEDGE BASE

**Generated:** 2026-02-01T11:12:46+09:00
**Commit:** 664fb27
**Branch:** main

---

## OVERVIEW

Only My OpenCode는 멀티모달 AI 에이전트 오케스트레이션을 제공하는 배터리 내장형 OpenCode 플러그인입니다. 10개의 특수 AI 에이전트, 32개의 수명 주기 훅, 20개 이상의 도구, Claude Code 호환성을 통해 AI 코딩 경험을 향상시킵니다. "OpenCode의 oh-my-zsh"와 같은 역할을 합니다.

---

## STRUCTURE

```
only-my-opencode/
├── src/
│   ├── agents/        # 10개 AI 에이전트
│   ├── hooks/         # 32개 수명 주기 훅
│   ├── tools/         # 20개 이상 도구
│   ├── features/      # 백그라운드 에이전트, 스킬, Claude Code 호환성
│   ├── shared/        # 55개 공통 유틸리티
│   ├── cli/           # CLI 설치 프로그램, 닥터
│   ├── mcp/           # 내장 MCP (websearch, context7, grep_app)
│   ├── config/        # Zod 스키마, TypeScript 타입
│   └── index.ts       # 메인 플러그인 진입점 (668줄)
├── script/            # 스키마 빌드, 바이너리 빌드 스크립트
├── packages/          # 7개 플랫폼별 바이너리
└── dist/              # 빌드 출력 (ESM + .d.ts)
```

---

## WHERE TO LOOK

| Task              | Location                         | Notes                                                   |
| ----------------- | -------------------------------- | ------------------------------------------------------- |
| 에이전트 추가         | `src/agents/`                    | .ts 파일 생성, `agentSources`에 추가                    |
| 훅 추가           | `src/hooks/`                     | `createXXXHook()`으로 디렉토리 생성, index.ts에 등록       |
| 도구 추가           | `src/tools/`                     | index/types/constants/tools.ts로 디렉토리 생성            |
| MCP 추가          | `src/mcp/`                       | 구성 생성, index.ts에 추가                              |
| 스킬 추가         | `src/features/builtin-skills/`   | SKILL.md로 디렉토리 생성                                |
| 명령 추가         | `src/features/builtin-commands/` | 템플릿 추가 + commands.ts에 등록                         |
| 구성 스키마     | `src/config/schema.ts`           | Zod 스키마, `bun run build:schema` 실행                   |
| 백그라운드 에이전트 | `src/features/background-agent/` | manager.ts (1377줄)                                    |
| 오케스트레이터      | `src/hooks/atlas/`               | 메인 오케스트레이션 훅 (752줄)                             |

---

## CONVENTIONS

- **패키지 관리자**: Bun만 사용 (`bun run`, `bun build`, `bunx`)
- **타입**: bun-types (절대 @types/node 사용 금지)
- **빌드**: `bun build` (ESM) + `tsc --emitDeclarationOnly`
- **익스포트**: index.ts를 통한 배럴 패턴
- **명명**: 케밥 케이스 디렉토리, `createXXXHook`/`createXXXTool` 팩토리
- **테스팅**: BDD 주석 (`//#given`, `//#when`, `//#then`), 100개 테스트 파일
- **온도**: 코드 에이전트 0.1, 최대 0.3
- **PR 대상**: 항상 `dev` 브랜치 (절대 `master` 브랜치 아님)

---

## ANTI-PATTERNS

| Category        | Forbidden                                    |
| --------------- | -------------------------------------------- |
| **타입 안전성** | `as any`, `@ts-ignore`, `@ts-expect-error`   |
| **오류 처리**   | 빈 catch 블록                                |
| **테스팅**      | 실패하는 테스트 삭제                           |
| **커밋**        | 거대 커밋 (3개 이상 파일), 테스트와 구현 분리    |
| **PR**          | `master` 브랜치 대상 PR, `master` 강제 푸시   |
| **패키지 관리자** | npm, yarn - Bun 독점 사용                     |
| **검색**        | 이전 연도 검색 - 항상 현재 연도 사용         |
| **위임**        | 범주와 에이전트를 동시에 제공                |

---

## COMPLEXITY HOTSPOTS

| File                                                  | Lines | Description                 |
| ----------------------------------------------------- | ----- | --------------------------- |
| `src/features/builtin-skills/skills.ts`               | 1729  | 스킬 정의                   |
| `src/features/background-agent/manager.ts`            | 1377  | 작업 수명 주기, 동시성     |
| `src/agents/prometheus-prompt.ts`                     | 1196  | 계획 에이전트 프롬프트     |
| `src/tools/delegate-task/tools.ts`                    | 1080  | 카테고리 기반 위임          |
| `src/hooks/atlas/index.ts`                            | 752   | 오케스트레이터 훅           |
| `src/cli/config-manager.ts`                           | 771   | JSONC 구문 분석, 구성 병합  |
| `src/index.ts`                                        | 668   | 메인 플러그인 진입점        |
| `src/features/builtin-commands/templates/refactor.ts` | 619   | 리팩터 명령 템플릿          |

---

## AGENT MODELS

| Agent             | Model                     | Purpose                 |
| ----------------- | ------------------------- | ----------------------- |
| Sisyphus          | anthropic/claude-opus-4-5 | 주 오케스트레이터       |
| Atlas             | anthropic/claude-opus-4-5 | 마스터 오케스트레이터     |
| oracle            | openai/gpt-5.2            | 상담, 디버깅           |
| librarian         | opencode/big-pickle       | 문서, GitHub 검색       |
| explore           | opencode/gpt-5-nano       | 빠른 코드베이스 grep    |
| multimodal-looker | google/gemini-3-flash     | PDF/이미지 분석         |
| Prometheus        | anthropic/claude-opus-4-5 | 전략적 계획           |

---

## COMMANDS

```bash
bun run typecheck      # 타입 체크
bun run build          # ESM + 선언 + 스키마
bun run rebuild        # 클린 + 빌드
bun test               # 100개 테스트 파일
```

