import { StrategyFactory } from './index.inerfaces.ts'
import { SelectStreaming } from './steps/SelectStreaming'

export const ExportAllStrategy: StrategyFactory = (t, d) => ({
  name: t(d.ExportAllMedia),
  steps: [
    {
      index: 1,
      title: t(d.SelectStreaming),
      desc: 'Select target streaming for export media',
      cmp: SelectStreaming,
    },
    {
      index: 2,
      title: t(d.Export),
      desc: 'Export all playlists and track',
      cmp: () => null,
    },
  ],
})

export const ExportPlaylists: StrategyFactory = (t, d) => ({
  name: t(d.ExportPlaylists),
  steps: [
    {
      index: 1,
      title: t(d.SelectPlaylist),
      desc: 'Select playlists to export',
      cmp: () => null,
    },
    {
      index: 2,
      title: t(d.SelectStreaming),
      desc: 'Select target streaming for export media',
      cmp: SelectStreaming,
    },
    {
      index: 3,
      title: t(d.Export),
      desc: 'Export  playlists and tracks',
      cmp: () => null,
    },
  ],
})

export const ExportPlaylist: StrategyFactory = (t, d) => ({
  name: t(d.ExportPlaylist),
  steps: [
    {
      index: 2,
      title: t(d.SelectStreaming),
      desc: 'Select target streaming for export media',
      cmp: SelectStreaming,
    },
    {
      index: 3,
      title: t(d.Export),
      desc: 'Export  playlists and tracks',
      cmp: () => null,
    },
  ],
})

export const MainStrategies = [ExportAllStrategy, ExportPlaylists]
export const PlaylistStrategies = [ExportPlaylist]
