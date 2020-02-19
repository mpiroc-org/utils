/**
 * @param start - The first number in the range.
 * @param length - The length of the range, or undefined for an infinite range.
 * @alpha
 */
export function *range(start: number, length?: number): Generator<number> {
    if (!Number.isInteger(start)) {
        throw new Error(`'start' must be an integer, but received ${start}`)
    }
    
    if (length !== undefined && !Number.isInteger(length)) {
        throw new Error(`'length' must be an integer, but received ${length}`)
    }

    if (length !== undefined && length < 0) {
        throw new Error(`'length' must be non-negative, but received ${length}`)
    }
    
    let current: number = start

    /* eslint-disable no-unmodified-loop-condition */
    while (length === undefined || current < start + length) {
        yield current

        current += 1
    }
    /* eslint-enable no-unmodified-loop-condition */
}

