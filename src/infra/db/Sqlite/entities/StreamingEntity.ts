import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

import { Streaming } from '../../../../modules/sreaming/entities/Streaming'

@Entity()
export class StreamingEntity extends BaseEntity implements Streaming {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'text' })
  type: string
  @Column({ type: 'int' })
  userId: number
  @Column({ type: 'text' })
  accesToken: string
  @Column({ type: 'text' })
  refreshToken: string
}
