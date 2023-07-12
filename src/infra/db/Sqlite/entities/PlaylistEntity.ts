import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany } from 'typeorm'

import { Playlist } from '../../../../modules/music/entities/Playlist'
import { UserEntity } from './UserEntity'
import { TrackEntity } from './TrackEntity'
import { StreamingEntity } from './StreamingEntity'

@Entity()
export class PlaylistEntity extends BaseEntity implements Playlist {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  external_id: string
  @Column()
  name: string

  @ManyToOne(() => UserEntity, (user) => user.playlists)
  user: UserEntity

  @OneToMany(() => TrackEntity, (track) => track.playlist)
  tracks: TrackEntity[]

  @ManyToOne(() => StreamingEntity, (streaming) => streaming.playlists)
  streaming: StreamingEntity
}
