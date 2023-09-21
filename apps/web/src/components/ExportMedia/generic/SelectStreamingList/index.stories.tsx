import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { EStreamingType } from 'api-types'
import { Flex } from '@chakra-ui/react'

import { SelectStreamingList } from './index.tsx'

const randomInteger = (min: number, max: number) => {
  return Math.floor(min + Math.random() * (max + 1 - min))
}

const Cmp = SelectStreamingList

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

export const streamingListData = {
  items: [
    EStreamingType.SPOTIFY,
    EStreamingType.TIDAL,
    EStreamingType.DEEZER,
    'Yandex Music',
    'Apple Music',
    'Sound Cloud',
    'Some big streaming name',
  ].map((s, i) => ({
    id: i + 1,
    type: s as EStreamingType,
    playlists: randomInteger(80, 150),
    tracks: randomInteger(150, 550),
  })),
}

export const SelectStreamingListStory: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [select, setSelect] = useState<EStreamingType>(EStreamingType.DEEZER)

    return <Cmp {...args} targetStreaming={select} onClick={(type) => setSelect(type)} />
  },
  args: {
    streamings: streamingListData.items,
    targetStreaming: streamingListData.items[1].type,
  },
}
