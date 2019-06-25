import { Controller, HttpStatus, Post, Request, Response } from '@nestjs/common';

import NotFoundException from '../../starter/rest/exception/not-found.exception';
import WrongCredentialsException from '../exception/wrong-credentials.exception';
import TokenService from '../service/security/token.service';
import UserService from '../service/user.service';

/**
 * The controller used to manage authentication.
 *
 * @author  Jérémie Lopez <jeremie.lopez@ynov.com>
 */
@Controller('user/auth')
export default class AuthenticationController {
    /**
     * @param {UserService}  service
     * @param {TokenService} tokenService
     */
    constructor(protected service: UserService,
                protected tokenService: TokenService) {
    }

    /**
     * Authenticate an user by email and password.
     * If credentials are correct, return the user object and a valid JWT token.
     *
     * URL    : http(s)://host.ext/url/to/this/function
     * Method : POST
     *
     * HTTP Status code :
     * - 200 : it's ok, user is authenticated
     * - 400 : one of the required parameter is missing
     * - 401 : credentials are wrong
     * - 500 : internal error
     *
     * Post parameters :
     * - "email" (required)
     * the email to test
     *
     * - "password" (required)
     * the password to test
     * @param {Request}  request
     * @param {Response} response
     */
    @Post('/authenticate')
    authenticate(@Request() request, @Response() response): void {
        const body = request.body;

        if (!body.email || !body.password) {
            response.status(HttpStatus.BAD_REQUEST);
            response.send();
        } else {
            this.service
                .authenticate(body.email, body.password)
                .then(user => {
                    const token = this.tokenService.sign({ user: user.id });
                    response.json({
                        user,
                        token,
                    });
                })
                .catch(error => {
                    if (error instanceof WrongCredentialsException) {
                        response.status(HttpStatus.UNAUTHORIZED);
                    } else if (error instanceof NotFoundException) {
                        response.status(HttpStatus.NOT_FOUND);
                    } else {
                        response.status(HttpStatus.INTERNAL_SERVER_ERROR);
                    }

                    response.send();
                });
        }
    }

    /**
     * Register an user.
     *
     * URL    : http(s)://host.ext/url/to/this/function
     * Method : POST
     *
     * HTTP Status code :
     * - 200 : it's ok, user is authenticated
     * - 400 : one of the required parameter is missing
     * - 401 : credentials are wrong
     * - 500 : internal error
     *
     * Post parameters :
     * - "email" (required)
     * the email to save
     *
     * - "password" (required)
     * the password to save
     *
     * - "displayName" (required)
     * the display name to save
     * @param {Request}  request
     * @param {Response} response
     */
    @Post('/register')
    register(@Request() request, @Response() response): void {
        const body = request.body;

        if (!body.email || !body.password || !body.displayName) {
            response.status(HttpStatus.BAD_REQUEST);
            response.send();
        } else {
            this.service
                .save({
                    email: body.email,
                    password: body.password,
                    displayName: body.displayName,
                })
                .then(user => {
                    const token = this.tokenService.sign({ user: user.id });
                    response.json({
                        user,
                        token,
                    });
                })
                .catch(error => {
                    if (error instanceof WrongCredentialsException) {
                        response.status(HttpStatus.UNAUTHORIZED);
                    } else if (error instanceof NotFoundException) {
                        response.status(HttpStatus.NOT_FOUND);
                    } else {
                        response.status(HttpStatus.INTERNAL_SERVER_ERROR);
                    }

                    response.send();
                });
        }
    }

    /**
     * Validate a JWT token.
     * Returns the decoded token if it's valid.
     *
     * URL    : http(s)://host.ext/url/to/this/function
     * Method : POST
     *
     * HTTP Status code :
     * - 200 : it's ok, user is authenticated
     * - 400 : one of the required parameter is missing
     * - 401 : credentials are wrong
     * - 500 : internal error
     *
     * Post parameters :
     * - "token" (required)
     * the token to test
     *
     * @param {Request}  request
     * @param {Response} response
     */
    @Post('/validate')
    validate(@Request() request, @Response() response): void {
        const body = request.body;

        if (!body.token) {
            response.status(HttpStatus.BAD_REQUEST);
            response.send();
        } else {
            try {
                const decoded = this.tokenService.verify(body.token);
                response.json(decoded);
            } catch (error) {
                response.status(HttpStatus.UNAUTHORIZED);
                response.send();
            }
        }
    }
}
