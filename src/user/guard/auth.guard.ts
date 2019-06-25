import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable }                                from 'rxjs';
import UserController                                from '../controller/user.controller';
import TokenService                                  from '../service/security/token.service';
import UserService                                   from '../service/user.service';

/**
 * Control if a token is valid and present in a request.
 *
 * @author  Jérémie Lopez <jeremie.lopez@ynov.com>
 */
@Injectable()
export default class AuthGuard implements CanActivate {
    /**
     * @param {TokenService} tokenService
     * @param {UserService}  userService
     */
    constructor(protected tokenService: TokenService,
                protected userService: UserService) {
    }

    /**
     * @param {ExecutionContext} context
     *
     * @returns {boolean | Promise<boolean> | Observable<boolean>}
     */
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();

        if (context.getClass() === UserController && context.getHandler().toString().startsWith('create')) {
            return true;
        }

        const token = this.tokenService.retrieve(request);
        if (token) {
            try {
                const decoded = this.tokenService.verify(token);
                return this.userService
                    .get(decoded.user)
                    .then(user => {
                        return true;
                    })
                    .catch(() => {
                        return false;
                    });
            } catch (error) {
                return false;
            }
        }

        return false;
    }
}
