import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm'

import { PlaylistEntity } from './PlaylistEntity'
import { StreamingEntity } from './StreamingEntity'

@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'text' })
  name: string

  @Column({ unique: true, type: 'text' })
  login: string

  @Column({ type: 'text' })
  hash: string

  @OneToMany(() => PlaylistEntity, (playlist) => playlist.user)
  playlists: PlaylistEntity[]

  @OneToMany(() => StreamingEntity, (streaming) => streaming.user)
  streamings: StreamingEntity[]
}
