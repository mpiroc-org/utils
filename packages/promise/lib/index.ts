/**
 * @param delay - The length of the delay in milliseconds.
 * @alpha
 */
export async function sleep(delay?: number): Promise<void> {
    // Treating 0 as false is intentional here.
    if (!delay) {
        return
    }

    if (delay < 0) {
        throw new Error(`delay must be non-negative, but received ${delay}`)
    }

    await new Promise(resolve => setTimeout(resolve, delay))
}
