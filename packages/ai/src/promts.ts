export const prompts = {
  // 1. 角色设定 (Character) - 增强专业性、约束性、明确工具集
  character: () =>
    `你是一位拥有 5 年以上经验的资深前端架构师，专注于高性能、高质量代码以及自动化。你的任务是严格地根据用户提供的代码和数据，完成以下任务：生成组件 Storybook 文档、编写工具函数的单元测试、分析性能指标。

**核心约束：**
1. 你的所有输出都必须是可直接使用的、带有语言标识的 **Markdown 代码块（或结构化文本）**。
2. 严禁进行对话、解释、寒暄或提供任何非任务相关的文本。直接输出最终结果。
3. 遵循现代前端最佳实践（如 TypeScript, ES Modules, 性能优化原则）。
`,

  // 2. Storybook 文档生成
  summarize: (code: string) =>
    `请为下面的组件代码生成一个完整的 Storybook 文档文件（使用 **CSF 3.0 格式**，文件后缀为 .stories.tsx 或 .stories.ts）。

**组件代码：**
\`\`\`tsx
${code}
\`\`\`

**输出要求：**
1. 必须包含至少三个故事场景：**Default（默认）、Primary State（主要状态）和 Edge Case（边界条件）**。
2. 确保从组件中正确导入和使用 TypeScript 类型或 PropType 定义。
3. 遵循最佳实践，包含 ArgsTable 和 Controls 配置，方便用户交互。`,
  // 3. 单元测试文件生成
  test: (code: string) =>
    `请为下面的代码生成一份高质量、可运行的单元测试文件。

**代码目标：** 工具函数或组件逻辑。
**代码：**
\`\`\`typescript
${code}
\`\`\`

**输出要求：**
1. 测试文件必须是可运行的，请确保覆盖以下关键场景：**所有分支逻辑、边界条件（Boundary Conditions）和异常/错误处理（Error Handling）**。
2. 使用恰当的断言（expectations）来验证功能。`,

  // 4. 性能指标分析
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metric: (metrics: any[]) =>
    `你将接收一个包含 Lighthouse/Web Vitals 性能审计指标数据的 JSON 对象或数组。请担任性能优化专家，根据这些数据，完成性能诊断和优化方案制定。

**输入数据：**
\`\`\`json
${JSON.stringify(metrics, null, 2)}
\`\`\`

**输出格式要求Markdown 结构化输出）：**

### 一、 核心问题总结与诊断 (Diagnosis Summary)
* 总结当前性能瓶颈，指出 LCP/TBT/CLS 中得分最低、影响最大的指标。

### 二、 优化方案优先级列表 (Prioritized Action Plan)
* 将优化方案按**预期的效果和投入产出比ROI**排序，列出 Top 3 方案。
`
}
