import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, Index } from 'typeorm'

import { Track } from '../../../../modules/music/entities/Track'
import { PlaylistEntity } from './PlaylistEntity'
import { StreamingEntity } from './StreamingEntity'
import { Uid } from '../../../../types/common'

@Entity()
@Index(['external_id', 'playlist'], { unique: true })
export class TrackEntity extends BaseEntity implements Track {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'text', unique: true })
  external_id: string

  @Column()
  name: string

  @Column({ type: 'text' })
  artist: string

  @Column({ type: 'text' })
  album: string

  @Column({ type: 'text', nullable: false })
  import_id: Uid

  @ManyToOne(() => PlaylistEntity, (playlist) => playlist.tracks, { nullable: false })
  playlist: PlaylistEntity

  @ManyToOne(() => StreamingEntity, (streaming) => streaming.tracks, { nullable: false })
  streaming: StreamingEntity
}
