import type { Meta, StoryObj } from '@storybook/react'
import { Box, Flex } from '@chakra-ui/react'
import { EStreamingType } from 'api-types'

import { StreamingList } from './index.tsx'

const randomInteger = (min: number, max: number) => {
  return Math.floor(min + Math.random() * (max + 1 - min))
}

const meta: Meta<typeof StreamingList> = {
  component: StreamingList,
  excludeStories: /.*Data$/,
  decorators: [
    (Story) => (
      <Flex height='100vh'>
        <Story />
      </Flex>
    ),
  ],
}

export default meta
export type Story = StoryObj<typeof StreamingList>

const streamings = [
  'Spotify',
  'Tidal',
  'Yandex Music',
  'Apple Music',
  'Deezer',
  'Sound Cloud',
  'Some big streaming name',
]

export const streamingListData = {
  items: Array(30)
    .fill(null)
    .map((_, i) => ({
      id: i + 1,
      type: streamings[randomInteger(0, streamings.length - 1)] as EStreamingType,
      playlists: randomInteger(80, 150),
      tracks: randomInteger(150, 550),
    })),
}

export const StreamingListStory: Story = {
  render: (args) => {
    return (
      <Box>
        <StreamingList {...args} />
      </Box>
    )
  },
  args: {
    isLoading: false,
    data: streamingListData,
  },
}

export const StreamingListLoadingStory: Story = {
  ...StreamingListStory,
  args: {
    ...StreamingListStory.args,
    isLoading: true,
  },
}
