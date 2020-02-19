/**
 * @alpha
 */
export interface ISelector<TItem> {
    (item: TItem): number
}

/**
 * @param array - The numbers to be summed
 * @alpha
 */
export function sum(array: number[]): number
/**
 * @param array - The items to be summed
 * @param selector - A function that maps an item to a number to be summed
 * @alpha
 */
export function sum<TItem>(array: TItem[], selector: ISelector<TItem>): number
export function sum<TItem>(array: TItem[], selector?: ISelector<TItem>): number {
    const _selector: ISelector<TItem> = selector ?? (item => item as unknown as number)

    return array.reduce(
        (total, current) => total + _selector(current),
        0
    )
}

/**
 * @param array - The source array containing the original items
 * @param selector - A function that maps an original item to a result item.
 * @alpha
 */
export function flatMap<TIn, TOut>(
    array: TIn[],
    selector: (item: TIn) => TOut[]
): TOut[] {
    return array.reduce<TOut[]>(
        (result, current) => result.concat(...selector(current)),
        []
    )
}
