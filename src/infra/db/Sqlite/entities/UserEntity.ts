import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

import { IUser } from '../../../../modules/user/entities/IUser'

@Entity()
export class UserEntity extends BaseEntity implements IUser {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  login: string

  @Column()
  pass: string
}
