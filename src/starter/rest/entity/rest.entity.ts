import { BeforeInsert, BeforeUpdate, Column, ObjectID, ObjectIdColumn } from 'typeorm';

/**
 * Basic REST entity, managed by all the REST system.
 *
 * @author Jérémie Lopez <jeremie.lopez@ynov.com>
 */
export default abstract class RestEntity {
  /**
   * Entity primary key.
   *
   * @type {number}
   */
  @ObjectIdColumn() id: ObjectID;

  /**
   * Creation date of the entity.
   *
   * @type {Date}
   */
  @Column({ nullable: true })
  created: Date;

  /**
   * Update date of the entity.
   *
   * @type {Date}
   */
  @Column({ nullable: true })
  updated: Date | null;

  /**
   * Container for functions results.
   *
   * @type {Object}
   */
  _fn: {};

  /**
   * TypeORM listener, executed before the insertion of the entity. Will set
   * the created property to the current date.
   */
  @BeforeInsert()
  beforeInsert(): void {
    this.created = new Date();
  }

  /**
   * TypeORM listener, executed before the update of the entity. Will set the
   * created property to the current date.
   */
  @BeforeUpdate()
  beforeUpdate(): void {
    this.updated = new Date();
  }
}
