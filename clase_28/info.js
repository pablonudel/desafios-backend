import {argsConfig}from './minimist.config.js'

export const info = {
    Args:argsConfig,
    OS:process.platform,
    NodeVersion:process.version,
    MemoryUsage:process.memoryUsage.rss(),
    ExecPath:process.execPath,
    ProcessID:process.pid,
    ProjectFolder:process.cwd()
}