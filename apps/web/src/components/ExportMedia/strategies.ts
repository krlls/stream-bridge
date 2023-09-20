import { IStrategy, StrategyFactory } from './index.inerfaces.ts'

export const ExportAllStrategy: StrategyFactory = (t, d): IStrategy => ({
  name: t(d.ExportAllMedia),
  steps: [
    {
      index: 1,
      title: t(d.SelectStreaming),
      desc: 'Select target streaming for export media',
      cmp: () => null,
    },
    {
      index: 2,
      title: t(d.Export),
      desc: 'Export all playlists and track',
      cmp: () => null,
    },
  ],
})

export const ExportPlaylists: StrategyFactory = (t, d): IStrategy => ({
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
      cmp: () => null,
    },
    {
      index: 3,
      title: t(d.Export),
      desc: 'Export  playlists and tracks',
      cmp: () => null,
    },
  ],
})

export const ExportTracks: StrategyFactory = (t, d): IStrategy => ({
  name: t(d.ExportTracks),
  steps: [
    {
      index: 1,
      title: t(d.SelectStreaming),
      desc: 'Select playlists to export',
      cmp: () => null,
    },
    {
      index: 2,
      title: t(d.SelectTracks),
      desc: 'Select tracks to export',
      cmp: () => null,
    },
    {
      index: 3,
      title: t(d.SelectStreaming),
      desc: 'Select streaming for export media',
      cmp: () => null,
    },
    {
      index: 4,
      title: t(d.SelectTargetPlaylist),
      desc: 'Select target playlist for export media',
      cmp: () => null,
    },
    {
      index: 5,
      title: t(d.Export),
      desc: 'Export tracks',
      cmp: () => null,
    },
  ],
})

export const strategies = [ExportAllStrategy, ExportPlaylists, ExportTracks]
