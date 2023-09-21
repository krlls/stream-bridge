import { FC } from 'react'
import { Box, Spinner } from '@chakra-ui/react'

import { useExportMediaState } from '../../../../hooks/useExportMediaState.ts'
import { removePlaylist, setPlaylist } from '../../ExportContext/reducer.ts'
import { TStepProps } from '../../index.inerfaces.ts'
import { useGetPlaylistsByStreamingQuery } from '../../../../data/music'
import { SelectPlaylistList } from '../../generic/SelectPlaylistList'
import { convertStreamingType } from '../../../../utils/api.ts'

export const SelectPlaylists: FC<TStepProps> = ({ children }) => {
  const { state, dispatch } = useExportMediaState()
  const { data, isLoading, isFetching } = useGetPlaylistsByStreamingQuery({
    streamingType: convertStreamingType(state.originStreamingType || '').toApi(),
    offset: 0,
  })
  const isNext = !!state.playlistsIds.length

  if (isLoading || isFetching) {
    return <Spinner size='md' />
  }

  const selectPlaylist = (id: number) => {
    state.playlistsIds.includes(id) ? dispatch(removePlaylist(id)) : dispatch(setPlaylist(id))
  }

  return (
    <>
      <Box>
        <SelectPlaylistList
          playlists={data?.items || []}
          targetPlaylists={state.playlistsIds}
          onClick={selectPlaylist}
        />
      </Box>
      {children(isNext)}
    </>
  )
}
