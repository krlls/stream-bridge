import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity()
export class StreamingEntity extends BaseEntity {
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
