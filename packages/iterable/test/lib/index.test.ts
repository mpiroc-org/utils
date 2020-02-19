/* eslint-disable @typescript-eslint/no-magic-numbers, @typescript-eslint/no-non-null-assertion */

import { range, sum } from '../../lib'

describe(`range`, () => {
    it(`generates an infinite range when length is undefined`, () => {
        const result: Generator<number> = range(0)

        // Just verify the first 10 elements.
        for (let i: number = 0; i < 10; i++) {
            const { value, done } = result.next()
            expect(value).toStrictEqual(i)
            expect(done).toBeFalsy()
        }
    })

    it(`throws when length is negative`, () => {
        expect(
            () => Array.from(range(0, -1))
        ).toThrow()
    })

    it(`generates an empty range when length is zero`, () => {
        const result: number[] = Array.from(range(0, 0))
        expect(result.length).toStrictEqual(0)
    })

    it(`generates a single-item array when length is one`, () => {
        const result: number[] = Array.from(range(42, 1))
        expect(result).toEqual([ 42 ])
    })

    it(`generates a multi-item array when length is greater than one`, () => {
        const result: number[] = Array.from(range(42, 2))
        expect(result).toEqual([ 42, 43 ])
    })

    it(`throws if length is not an integer`, () => {
        expect(
            () => Array.from(range(0, 1.5))
        ).toThrow()
    })

    it(`allows starting at a negative number`, () => {
        const result: number[] = Array.from(range(-2, 4))
        expect(result).toEqual([ -2, -1, 0, 1 ])
    })

    it(`allows starting at zero`, () => {
        const result: number[] = Array.from(range(0, 3))
        expect(result).toEqual([ 0, 1, 2 ])
    })

    it(`allows starting at a positive number`, () => {
        const result: number[] = Array.from(range(42, 3))
        expect(result).toEqual([ 42, 43, 44 ])
    })

    it(`throws if start is not an integer`, () => {
        expect(
            () => Array.from(range(1.5, 3))
        ).toThrow()
    })
})

describe(`sum`, () => {
    it(`sums items directly when no selector is provided`, () => {
        const result: number = sum([4, 5])

        expect(result).toStrictEqual(9)
    })

    it(`returns 0 for an empty input`, () => {
        const result: number = sum([])

        expect(result).toStrictEqual(0)
    })

    it(`sums selected values when selector is provided`, () => {
        const result: number = sum([`hello`, `world`], item => item.length)

        expect(result).toStrictEqual(10)
    })
    
})

/* eslint-enable @typescript-eslint/no-magic-numbers, @typescript-eslint/no-non-null-assertion */
