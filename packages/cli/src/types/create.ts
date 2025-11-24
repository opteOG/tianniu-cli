import { Framework, Template } from "./template"

export interface CreateCommandOptions {
  framework: Framework
  template: Template
  remote?: boolean
}
