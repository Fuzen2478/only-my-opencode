# CONFIGURATION

## OVERVIEW
구성 관련 Zod 스키마 및 TypeScript 타입이 포함됩니다. 프로젝트 전체에서 사용되는 구성 유효성 검사 및 타입 정의를 담당합니다.

## STRUCTURE
```
config/
├── schema.ts       # 주 Zod 유효성 검사 스키마
└── index.ts        # 타입 익스포트
```

## WHERE TO LOOK
| Task            | Location                 | Notes                                    |
| --------------- | ------------------------ | ---------------------------------------- |
| 구성 스키마 수정  | `src/config/schema.ts`   | Zod 정의 수정, `bun run build:schema` 실행 |
| 새 구성 추가      | `src/config/schema.ts`   | 스키마에 새 필드 추가                    |
| 구성 값에 액세스  | `src/config/index.ts`    | 타입 정의 참조                           |

## CONVENTIONS
- **스키마 정의**: Zod를 사용하여 구성 유효성 검사 스키마를 정의합니다.
- **타입 안전성**: 모든 구성은 TypeScript 타입으로 강력하게 타입이 지정됩니다.
- **JSONC 지원**: 프로젝트 및 사용자 구성 파일에 대한 주석 및 후행 쉼표가 있는 JSONC 형식을 지원합니다.
- **계층적 구성**: 프로젝트 수준(`.opencode/`) 및 사용자 수준(`~/.config/opencode/`)에서 구성 병합을 지원합니다.

## ANTI-PATTERNS
| Category        | Forbidden                                 |
| --------------- | ----------------------------------------- |
| **타입 안전성** | 구성 유효성 검사 없이 원시 JSON 객체 사용  |
| **스키마 우회** | `schema.ts`에 정의된 것 외의 구성 필드 사용 |
```