import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm'

import { Track } from '../../../../modules/music/entities/Track'
import { PlaylistEntity } from './PlaylistEntity'
import { StreamingEntity } from './StreamingEntity'

@Entity()
export class TrackEntity extends BaseEntity implements Track {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'text' })
  external_id: string
  @Column()
  name: string
  @Column({ type: 'text' })
  artist: string
  @Column({ type: 'text' })
  album: string

  @ManyToOne(() => PlaylistEntity, (playlist) => playlist.tracks, { nullable: false })
  playlist: PlaylistEntity

  @ManyToOne(() => StreamingEntity, (streaming) => streaming.tracks, { nullable: false })
  streaming: StreamingEntity
}
