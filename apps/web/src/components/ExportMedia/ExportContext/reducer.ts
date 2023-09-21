import { EStreamingType } from 'api-types'

export interface IState {
  step: number,
  tracksIds: number[],
  playlistsIds: number[],
  originStreamingType?: EStreamingType,

  targetPlaylistId?: number,
  targetStreamingType?: EStreamingType,
}

export enum EActionTypes {
  setTracks,
  setPlaylist,
  removePlaylist,
  setOriginStreaming,
  setTargetPlaylist,
  setTargetStreaming,
  incStep,
  decStep,
}

export type TExportAction<T extends EActionTypes, P = undefined> = P extends undefined
  ? { type: T }
  : { type: T, payload: P }

export const makeDefaultState = (override?: Partial<IState>): IState => ({
  step: 1,
  tracksIds: [],
  playlistsIds: [],
  ...override,
})

export const exportReducer = (state: IState, action: TExportActions): IState => {
  switch (action.type) {
    case EActionTypes.setTracks: {
      return { ...state, tracksIds: action.payload }
    }

    case EActionTypes.setPlaylist: {
      return { ...state, playlistsIds: Array.from(new Set([...state.playlistsIds, action.payload])) }
    }

    case EActionTypes.removePlaylist: {
      return { ...state, playlistsIds: [...state.playlistsIds].filter((id) => id !== action.payload) }
    }

    case EActionTypes.setOriginStreaming: {
      return { ...state, originStreamingType: action.payload }
    }

    case EActionTypes.setTargetPlaylist: {
      return { ...state, targetPlaylistId: action.payload }
    }

    case EActionTypes.setTargetStreaming: {
      return { ...state, targetStreamingType: action.payload }
    }

    case EActionTypes.incStep: {
      return { ...state, step: state.step + 1 }
    }

    case EActionTypes.decStep: {
      return state.step > 1 ? { ...state, step: state.step - 1 } : state
    }

    default: {
      return state
    }
  }
}

export type TExportActions =
  | TExportAction<EActionTypes.setTracks, number[]>
  | TExportAction<EActionTypes.setPlaylist, number>
  | TExportAction<EActionTypes.removePlaylist, number>
  | TExportAction<EActionTypes.setOriginStreaming, EStreamingType>
  | TExportAction<EActionTypes.setTargetStreaming, EStreamingType>
  | TExportAction<EActionTypes.setTargetPlaylist, number>
  | TExportAction<EActionTypes.incStep>
  | TExportAction<EActionTypes.decStep>

export const incStep = (): TExportActions => ({ type: EActionTypes.incStep })
export const setTargetStreaming = (streamingType: EStreamingType): TExportActions => ({
  type: EActionTypes.setTargetStreaming,
  payload: streamingType,
})

export const setPlaylist = (id: number): TExportActions => ({
  type: EActionTypes.setPlaylist,
  payload: id,
})

export const removePlaylist = (id: number): TExportActions => ({
  type: EActionTypes.removePlaylist,
  payload: id,
})
