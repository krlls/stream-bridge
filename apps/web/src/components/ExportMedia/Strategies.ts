import { StrategyFactory } from './index.inerfaces.ts'
import { SelectStreaming } from './steps/SelectStreaming'
import { SelectPlaylists } from './steps/SelectPlaylists'
import { ExportStep } from './steps/ExportStep'

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
      cmp: ExportStep,
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
      cmp: SelectPlaylists,
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
      desc: 'Export playlists',
      cmp: ExportStep,
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
      desc: 'Export playlist',
      cmp: ExportStep,
    },
  ],
})

export const MainStrategies = [ExportAllStrategy, ExportPlaylists]
export const PlaylistStrategies = [ExportPlaylist]
