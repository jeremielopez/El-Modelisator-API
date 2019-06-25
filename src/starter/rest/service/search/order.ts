/**
 * Order to build a search request.
 *
 * @author Jérémie Lopez <jeremie.lopez@ynov.com>
 */
export default class Order {
    /**
     * @param {string} property
     * @param {string} order
     */
    constructor(public property: string,
                public order: string) {
        if (this.order !== 'asc' && this.order !== 'desc') {
            this.order = 'asc';
        }
    }

    /**
     * Return if the sorter order is ASC or not.
     *
     * @returns {boolean}
     */
    isASC(): boolean {
        return this.order === 'asc';
    }
}
