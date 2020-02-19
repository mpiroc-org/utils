import { Writable } from 'stream'
import uuid from 'uuid/v4'

/**
 * @alpha
 */
export interface ILogger<TEvent> {
    flush(): Promise<void>
    end(): Promise<void>

    error(event: TEvent): void
    warn(event: TEvent): void
    info(event: TEvent): void
    http(event: TEvent): void
    verbose(event: TEvent): void
    debug(event: TEvent): void
    silly(event: TEvent): void
}

/**
 * @alpha
 */
export enum LogLevel {
    silly,
    debug,
    verbose,
    http,
    info,
    warn,
    error
}

/**
 * @alpha
 */
export interface ILeveledStream {
    level: LogLevel
    stream: Writable
}

/**
 * @alpha
 */
export class Logger<TEvent> implements ILogger<TEvent> {
    private readonly _streams: readonly ILeveledStream[]
    private readonly _writesInProgress: Map<string, Promise<unknown>>
    private _ended: boolean = false

    public constructor(...streams: ILeveledStream[]) {
        this._streams = streams
        this._writesInProgress = new Map()
    }

    public async flush(): Promise<void> {
        // Wait for all in-progress writes to finish.
        await Promise.all(this._writesInProgress.values())
    }

    public async end(): Promise<void> {
        this._ended = true

        await this.flush()
        await Promise.all(this._streams.map(
            async stream => await new Promise<void>((resolve): void => stream.stream.end(resolve))
        ))
    }

    /* eslint-disable @typescript-eslint/no-floating-promises */
    public error(event: TEvent): void {
        this._write(event, LogLevel.error)
    }

    public warn(event: TEvent): void {
        this._write(event, LogLevel.warn)
    }

    public info(event: TEvent): void {
        this._write(event, LogLevel.info)
    }

    public http(event: TEvent): void {
        this._write(event, LogLevel.http)
    }

    public verbose(event: TEvent): void {
        this._write(event, LogLevel.verbose)
    }

    public debug(event: TEvent): void {
        this._write(event, LogLevel.debug)
    }

    public silly(event: TEvent): void {
        this._write(event, LogLevel.silly)
    }
    /* eslint-enable @typescript-eslint/no-floating-promises */

    private async _write(event: TEvent, level: LogLevel): Promise<void> {
        if (this._ended) {
            throw new Error(`Logger error: Write after end: ${JSON.stringify(event)}`)
        }

        const promiseId: string = uuid()
        if (this._writesInProgress.has(promiseId)) {
            throw new Error(`Duplicate promise id: ${promiseId}`)
        }

        const promise: Promise<void[]> = Promise.all(this._streams.map(
            async stream => await new Promise<void>((resolve, reject): void => {
                if (level < stream.level) {
                    resolve()
                    return
                }

                // Default to empty string as a work-around for https://github.com/microsoft/TypeScript/issues/34630
                stream.stream.write(JSON.stringify(event) || ``, err => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve()
                    }
                })
            })
        ))

        this._writesInProgress.set(promiseId, promise)

        try {
            await promise
        } finally {
            // Prevent memory leak by purging promises from map once they are complete.
            this._writesInProgress.delete(promiseId)
        }
    }
}
