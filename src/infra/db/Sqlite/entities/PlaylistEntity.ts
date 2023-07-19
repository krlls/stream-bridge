import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany, Index } from 'typeorm'

import { Playlist } from '../../../../modules/music/entities/Playlist'
import { UserEntity } from './UserEntity'
import { TrackEntity } from './TrackEntity'
import { StreamingEntity } from './StreamingEntity'

@Entity()
@Index(['external_id', 'streaming'], { unique: true })
export class PlaylistEntity extends BaseEntity implements Playlist {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ unique: true })
  external_id: string
  @Column()
  name: string

  @ManyToOne(() => UserEntity, (user) => user.playlists, { nullable: false })
  user: UserEntity

  @OneToMany(() => TrackEntity, (track) => track.playlist)
  tracks: TrackEntity[]

  @ManyToOne(() => StreamingEntity, (streaming) => streaming.playlists, { nullable: false })
  streaming: StreamingEntity
}
