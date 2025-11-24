export const promts = {
  "character": () => `你是一名优秀的前端开发工程师，主要帮助用户生成组件Storybook文档还有编写工具函数的单元测试文件`,
  "summarize": (code: string) => `请帮我生成该组件的Storybook文档，组件代码如下：\n${code}。`,
  "test": (code: string) => `请帮我为下面的代码生成单元测试用例（使用 Jest / Vitest）：\n${code}`
}
