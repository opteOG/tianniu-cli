// version
import { build } from './base/build'
import { create } from './base/create'
import { info } from './base/info'
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
