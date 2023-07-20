import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, Index } from 'typeorm'

import { PlaylistEntity } from './PlaylistEntity'
import { StreamingEntity } from './StreamingEntity'
import { Uid } from '../../../../types/common'

@Entity()
@Index(['external_id', 'playlist'], { unique: true })
export class TrackEntity extends BaseEntity {
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

  @Column({ type: 'text', nullable: false })
  import_id: Uid

  @ManyToOne(() => PlaylistEntity, (playlist) => playlist.tracks, { nullable: false, onDelete: 'CASCADE' })
  playlist: PlaylistEntity

  @ManyToOne(() => StreamingEntity, (streaming) => streaming.tracks, { nullable: false })
  streaming: StreamingEntity
}
