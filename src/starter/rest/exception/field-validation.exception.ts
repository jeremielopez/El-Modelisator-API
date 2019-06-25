/**
 * REST field validation error.
 *
 * @author Jérémie Lopez <jeremie.lopez@ynov.com>
 */
export default class FieldValidationException extends Error {
    readonly message: any;

    constructor(message?: string | object) {
        super();
        this.message = message;
    }
}
