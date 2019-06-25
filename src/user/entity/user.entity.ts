import { Column, Entity } from 'typeorm';

import RestEntity from '../../starter/rest/entity/rest.entity';

/**
 * User entity.
 *
 * @author Jérémie Lopez <jeremie.lopez@ynov.com>
 */
@Entity('user')
export default class User extends RestEntity {
  /**
   * User username.
   *
   * @type {string}
   */
  @Column({ unique: true })
  email: string;

  /**
   * User password (encrypted by service).
   *
   * @type {string}
   */
  @Column({ select: false })
  password: string;

  /**
   * User displayName.
   *
   * @type {string}
   */
  @Column()
  displayName: string;

  /**
   * User scripts.
   *
   * @type {string[]}
   */
  @Column({ array: true })
  scripts: string[];
}
