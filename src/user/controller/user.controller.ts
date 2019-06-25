import { Controller, UseGuards } from '@nestjs/common';
import RestController            from '../../starter/rest/controller/rest.controller';
import User                      from '../entity/user.entity';
import AuthGuard                 from '../guard/auth.guard';
import UserService               from '../service/user.service';

/**
 * User REST controller.
 *
 * @author Jérémie Lopez <jeremie.lopez@ynov.com>
 */
@Controller('user')
@UseGuards(AuthGuard)
export default class UserController extends RestController<User> {
    constructor(protected service: UserService) {
        super(service);
    }
}
