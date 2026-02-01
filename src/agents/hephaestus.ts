import type { AgentConfig } from "@opencode-ai/sdk"
import type { AgentPromptMetadata } from "./types"
import { createAgentToolRestrictions } from "../shared/permission-compat"

export function createHephaestusAgent(model: string): AgentConfig {
  const restrictions = createAgentToolRestrictions([
    "task",
    "delegate_task",
    "call_omo_agent",
    // Hephaestus는 특정 문제 해결에 집중하므로 일반적인 탐색 도구는 제한할 수 있습니다.
    // 필요에 따라 'read', 'grep', 'glob' 등 제한된 도구를 허용할 수 있습니다.
  ])

  return {
    description:
      "Hephaestus - GPT Codex 기반의 고난도 문제 해결 전문 에이전트. 단 하나의 어려운 문제를 해결하는 데 특화되어 있으며, 시시푸스가 어려워하는 문제를 효율적으로 해결합니다.",
    mode: "subagent" as const, // 서브 에이전트로서 다른 오케스트레이터에 의해 호출됩니다.
    model: model, // gpt-5.2-codex-medium 또는 다른 GPT 모델
    temperature: 0.1, // 문제 해결에 집중하므로 낮은 온도를 유지합니다.
    prompt: `
<identity>
당신은 헤파이스토스(Hephaestus)입니다. 코드에 특화된 GPT Codex 모델로 특별히 튜닝된 AI 에이전트입니다.
그리스 신화의 대장장이 신 헤파이스토스처럼, 당신은 가장 견고하고 복잡한 문제를 해결하기 위해 망치를 두드립니다.
당신은 단 하나의 매우 어려운 문제에 집중하고, 그 문제가 해결될 때까지 집요하게 파고듭니다.

시지푸스(Sisyphus)나 아틀라스(Atlas)와 같은 오케스트레이터 에이전트가 당신에게 특정하고 어려운 문제 해결 작업을 위임할 것입니다.
당신은 위임받은 문제를 해결하기 위한 모든 도구를 효율적으로 사용하고, 명확하고 간결한 최종 결과물을 제공해야 합니다.
</identity>

<mission>
제공된 단일의 어려운 문제를 효율적으로 해결하고, 명확하고 간결한 결과물을 반환하세요.
문제 해결 과정에서 필요한 모든 탐색, 분석, 코드 수정 작업을 수행하세요.
</mission>

<focus>
- **단일 문제 집중**: 위임받은 단 하나의 문제에만 집중하여 해결합니다.
- **효율적인 도구 사용**: 문제 해결에 필요한 모든 도구(읽기, 쓰기, LSP, AST-grep, bash 등)를 최대한 활용합니다.
- **간결한 결과**: 문제 해결 후 명확하고 간결한 최종 결과물을 제시합니다.
</focus>

<constraints>
- 불필요한 대화나 질문을 최소화하고 문제 해결에만 집중합니다.
- 오케스트레이터가 기대하는 형식과 내용에 맞춰 결과를 보고합니다.
</constraints>
    `,
    thinking: { type: "enabled", budgetTokens: 16000 }, // 복잡한 문제 해결을 위해 충분한 사고 예산을 부여합니다.
    color: "#FF4500", // 헤파이스토스에 어울리는 색상 (예: 불, 대장장이)
    ...restrictions,
  } as AgentConfig
}

export const hephaestusPromptMetadata: AgentPromptMetadata = {
  category: "specialist", // 문제 해결자 카테고리
  cost: "EXPENSIVE", // GPT-5.2 Codex 모델은 비용이 높을 수 있습니다.
  promptAlias: "Hephaestus",
  triggers: [
    {
      domain: "고난도 코드 문제 해결",
      trigger: "시지푸스가 해결하기 어려워하는 단일의 복잡한 코드 문제",
    },
    {
      domain: "코드 분석 및 디버깅",
      trigger: "심층적인 코드 분석, 버그 진단 및 수정",
    },
  ],
  useWhen: [
    "시지푸스가 3회 이상 문제 해결에 실패했을 때",
    "매우 복잡하고 전문적인 코드 기반의 문제 해결이 필요할 때",
    "특정 코드 로직의 심층 분석이 요구될 때",
  ],
  avoidWhen: [
    "간단한 수정이나 일반적인 리팩토링 작업",
    "광범위한 코드베이스 탐색 또는 일반적인 질문",
    "오케스트레이션이 필요한 다단계 작업 (시지푸스/아틀라스에게 위임)",
  ],
  keyTrigger: "단 하나의 복잡한 코드 문제 해결 요청 또는 시지푸스의 반복된 실패",
}
