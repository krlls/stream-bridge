import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany, Index } from 'typeorm'

import { UserEntity } from './UserEntity'
import { TrackEntity } from './TrackEntity'
import { StreamingEntity } from './StreamingEntity'
import { Uid } from '../../../../types/common'

@Entity()
@Index(['external_id', 'streaming', 'user'], { unique: true })
export class PlaylistEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  external_id: string

  @Column()
  name: string

  @Column({ nullable: true })
  cover?: string

  @Column({ type: 'text', nullable: false })
  import_id: Uid

  @ManyToOne(() => UserEntity, (user) => user.playlists, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user: UserEntity

  @OneToMany(() => TrackEntity, (track) => track.playlist, {
    onDelete: 'CASCADE',
  })
  tracks: TrackEntity[]

  @ManyToOne(() => StreamingEntity, (streaming) => streaming.playlists, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  streaming: StreamingEntity
}
