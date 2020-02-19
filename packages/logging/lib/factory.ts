import { ILogger, Logger, LogLevel } from './logger'
import { StdioStream } from './streams'

/**
 * @alpha
 */
export function createDefaultLogger(): ILogger<string> {
    const stream: StdioStream = new StdioStream(process.stdout)
    const logger: ILogger<string> = new Logger<string>({
        level: LogLevel.silly,
        stream
    })

    return logger
}
