import { Writable } from 'stream'
import * as os from 'os'

/**
 * @alpha
 */
export class StdioStream extends Writable {
    private readonly _stream: NodeJS.WriteStream

    public constructor(stream: NodeJS.WriteStream) {
        super()

        this._stream = stream
    }

    public _write(
        /* eslint-disable @typescript-eslint/no-explicit-any */
        chunk: any,
        /* eslint-enable @typescript-eslint/no-explicit-any */
        _encoding: string,
        callback: (error?: Error | null) => void
        
    ): void {
        this._stream.write(`${chunk}${os.EOL}`, callback)
    }
    
}
