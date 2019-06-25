import { Injectable }                               from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint } from 'class-validator';
import RestServiceFactory                           from '../factory/rest-service.factory';
import Criterion                                    from '../service/search/criterion';

/**
 * Validator that check if entity exist.
 *
 * @author Jérémie Lopez <jeremie.lopez@ynov.com>
 */
@ValidatorConstraint({ async: true })
@Injectable()
export class EntityExists {
    /**
     * @param {RestServiceFactory} factory
     */
    constructor(protected factory: RestServiceFactory) {
    }

    /**
     * Try to retrieve an entity if exist
     *
     * @param {number | any[]} value
     * @param {ValidationArguments} validationArguments
     * @return {Promise<boolean>}
     */
    async validate(value: number | any[], validationArguments: ValidationArguments) {
        let ret = false;

        const entity = validationArguments.constraints[0] || null;

        if (!entity) {
            return ret;
        }

        const service = this.factory.createService(entity);

        try {
            if (value instanceof Array) {
                let ids = [];

                for (const object of value) {
                    if (ids.indexOf(object.id) !== -1) {
                        continue;
                    }

                    ids = [...ids, object.id];
                }

                const res = await service.search([new Criterion('id', 'in', ids)]);

                if (res.length === ids.length) {
                    ret = true;
                }
            } else {
                await service.get(value);
                ret = true;
            }
        } catch (e) {
        }

        return ret;
    }

    /**
     * Default message in case of error
     *
     * @param {ValidationArguments} validationArguments
     * @return {string}
     */
    defaultMessage(validationArguments: ValidationArguments) {
        let entity = validationArguments.constraints[0] || 'entity';

        if (entity !== 'entity') {
            entity = entity.charAt(0).toLowerCase() + entity.slice(1);
        }

        return `${entity} doesn't exist`;
    }
}
