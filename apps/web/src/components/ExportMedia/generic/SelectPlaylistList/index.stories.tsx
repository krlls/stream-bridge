import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Flex } from '@chakra-ui/react'

import { SelectPlaylistList } from './index.tsx'
import { playlistsData } from '../../../ListOfPlaylists/index.stories.tsx'

const Cmp = SelectPlaylistList

const meta: Meta<typeof Cmp> = {
  component: Cmp,
  excludeStories: /.*Data$/,
  decorators: [
    (Story) => (
      <Flex bgColor='gray.700' p='30px'>
        <Story />
      </Flex>
    ),
  ],
}

export default meta
export type Story = StoryObj<typeof Cmp>

export const SelectPlaylistListStory: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [select, setSelect] = useState<Set<number>>(new Set())

    function selectPlaylist(id: number) {
      const temp = new Set(select)
      temp.has(id) ? temp.delete(id) : temp.add(id)

      return setSelect(temp)
    }

    return <Cmp {...args} targetPlaylists={Array.from(select)} onClick={(id) => selectPlaylist(id)} />
  },
  args: {
    playlists: playlistsData,
    targetPlaylists: [],
  },
}
