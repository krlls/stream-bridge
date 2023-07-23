import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany, Index } from 'typeorm'

import { EStreamingType } from '../../../../types/common'
import { UserEntity } from './UserEntity'
import { PlaylistEntity } from './PlaylistEntity'
import { TrackEntity } from './TrackEntity'

@Entity()
@Index(['user', 'type'], { unique: true })
export class StreamingEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'text', nullable: true })
  token?: string

  @Column({ type: 'text', nullable: true })
  refresh_token?: string

  @Column({ type: 'text', nullable: true, enum: EStreamingType })
  type: EStreamingType

  @Column({ type: 'int', nullable: true })
  expiresIn?: number

  @ManyToOne(() => UserEntity, (user) => user.streamings, { nullable: false, onDelete: 'CASCADE' })
  user: UserEntity

  @OneToMany(() => PlaylistEntity, (playlist) => playlist.streaming, { onDelete: 'CASCADE' })
  playlists: PlaylistEntity[]

  @OneToMany(() => TrackEntity, (track) => track.playlist, { onDelete: 'CASCADE' })
  tracks: TrackEntity[]

  playlistsCount?: number
  tracksCount?: number
}
