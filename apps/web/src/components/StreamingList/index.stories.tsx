import type { Meta, StoryObj } from '@storybook/react'
import { rest } from 'msw'
import { Box, Flex } from '@chakra-ui/react'
import { Api } from 'api-types'

import { withBaseUrl } from '../../utils/links.ts'
import { StreamingList } from './index.tsx'
import { streamingUrl } from '../../data/streaming'

const randomInteger = (min: number, max: number) => {
  return Math.floor(min + Math.random() * (max + 1 - min))
}

const meta: Meta<typeof StreamingList> = {
  component: StreamingList,
  decorators: [
    (Story) => (
      <Flex height='100vh'>
        <Story />
      </Flex>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof StreamingList>

const streamings = [
  'Spotify',
  'Tidal',
  'Yandex Music',
  'Apple Music',
  'Deezer',
  'Sound Cloud',
  'Some big streaming name',
]
export const StreamingListStory: Story = {
  render: (args) => (
    <Box>
      <StreamingList {...args} />
    </Box>
  ),
  args: {
    //👇 The args you need here will depend on your component
  },
  parameters: {
    msw: {
      handlers: [
        rest.get(withBaseUrl(streamingUrl(Api.Streaming.List.URL)), (_req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json({
              items: Array(30)
                .fill(null)
                .map((_, i) => ({
                  id: i + 1,
                  type: streamings[randomInteger(0, streamings.length - 1)] || '',
                  playlists: randomInteger(80, 150),
                  tracks: randomInteger(150, 550),
                })),
            }),
          )
        }),
      ],
    },
  },
}
