// version
import { audit } from './base/audit'
import { build } from './base/build'
import { clean } from './base/clean'
import { create } from './base/create'
import { info } from './base/info'
import { preview } from './base/preview'
import { serve } from './base/serve'
import { testGen } from './base/test-gen'
import { textGen } from './base/text-gen'
import { version } from './base/version'
import { registerCommand } from './registerCommand'

registerCommand(version)
registerCommand(info)
registerCommand(create)
registerCommand(serve)
registerCommand(build)
registerCommand(textGen)
registerCommand(testGen)
registerCommand(clean)
registerCommand(preview)
registerCommand(audit)
