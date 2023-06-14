import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

import { User } from '../../../../modules/user/entities/User'

@Entity()
export class UserEntity extends BaseEntity implements User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'text' })
  name: string

  @Column({ unique: true, type: 'text' })
  login: string

  @Column({ type: 'text' })
  hash: string
}
