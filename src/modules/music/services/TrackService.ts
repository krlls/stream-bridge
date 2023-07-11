import { inject, injectable } from 'inversify'

import { TYPES } from '../../../types/const'
import { ErrorDTO } from '../../common/dtos/errorDTO'
import { Errors } from '../../../types/common'
import { ITracksRepository } from '../interfaces/ITracksRepository'
import { ITrackService } from '../interfaces/TrackService'
import { CreateTrackDTO } from '../dtos/CreateTrackDTO'

@injectable()
export class TrackService implements ITrackService {
  @inject(TYPES.TrackRepository) private trackRepository: ITracksRepository

  async saveTrack(trackData: CreateTrackDTO) {
    const track = await this.trackRepository.createTrack(trackData)

    if (!track) {
      return new ErrorDTO(Errors.TRACK_CREATE_ERROR)
    }

    return track
  }
}
