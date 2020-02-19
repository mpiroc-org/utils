/**
 * Calculates the union of an arbitrary number of sets.
 * @param sets - The sets from which to calculate the union.
 * @alpha
 */
export function union<TItem>(...sets: Set<TItem>[]): Set<TItem> {
    const result: Set<TItem> = new Set()

    for (const set of sets) {
        set.forEach(item => result.add(item))
    }

    return result
}

/**
 * Calculates the intersection of an arbitrary number of sets.
 * @param sets - The sets from which to calculate the intersection.
 * @alpha
 */
export function intersection<TItem>(...sets: Set<TItem>[]): Set<TItem> {
    const result: Set<TItem> = new Set()

    if (sets.length > 0) {
        sets[0].forEach(item => {
            if (!sets.some(set => !set.has(item))) {
                result.add(item)
            }
        })
    }

    return result
}

/**
 * Calculates the difference between a set and an arbitrary number of other sets.
 * @param initial - The original set of items.
 * @param sets - The sets containing the items to omit from the original set.
 * @alpha
 */
export function difference<TItem>(initial: Set<TItem>, ...sets: Set<TItem>[]): Set<TItem> {
    const result: Set<TItem> = new Set()

    initial.forEach(item => {
        if (!sets.some(set => set.has(item))) {
            result.add(item)
        }
    })

    return result
}
