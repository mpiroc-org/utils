/* eslint-disable @typescript-eslint/no-magic-numbers */

import { sleep } from '../../lib'

describe(`sleep`, () => {
    it(`resolves immediately if delay is undefined`, async () => {
        let resolved: boolean = false
        const promise: Promise<unknown> = sleep().then(
            () => {
                resolved = true
            }
        )
        setImmediate(() => expect(resolved).toBeTruthy())

        // Drain the promise to avoid affecting other tests.
        await promise
    })

    it(`resolves immediately if delay is zero`, async () => {
        let resolved: boolean = false
        const promise: Promise<unknown> = sleep(0).then(
            () => {
                resolved = true
            }
        )
        setImmediate(() => expect(resolved).toBeTruthy())

        // Drain the promise to avoid affecting other tests.
        await promise
    })

    it(`throws immediately if delay is negative`, async () => {
        let resolved: boolean = false
        const promise: Promise<unknown> = sleep(-1).then(
            () => {
                resolved = true
            }
        )
        expect(resolved).toBeFalsy()
        
        setImmediate(
            /* eslint-disable @typescript-eslint/no-misused-promises */
            async () => await expect(promise).rejects.toThrow()
            /* eslint-enable @typescript-eslint/no-misused-promises */
        )

        try {
            // Drain the promise to avoid affecting other tests.
            await promise
        } catch (err) {
            console.log(`Caught error while draining promise: ${String(err)}`)
        }
    })

    it(`resolves asynchronously if delay is positive`, async () => {
        let resolved: boolean = false
        const promise: Promise<unknown> = sleep(500).then(
            () => {
                resolved = true
            }
        )
        setImmediate(() => expect(resolved).toBeFalsy())
        await promise
        expect(resolved).toBeTruthy()
    })
})

/* eslint-enable @typescript-eslint/no-magic-numbers */
