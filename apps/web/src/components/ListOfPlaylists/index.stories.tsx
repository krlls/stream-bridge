import type { Meta, StoryObj } from '@storybook/react'
import { Api, EStreamingType } from 'api-types'
import { faker } from '@faker-js/faker'

import { ListOfPlaylists } from './index.tsx'

export const playlistsData: Api.Music.Playlist[] = Array(30)
  .fill(null)
  .map((_, i) => ({
    id: i,
    externalId: 'dshjkfkldkl',
    name: `${faker.music.songName()} / ${faker.music.genre()}`,
    streamingType: 'SPOTIFY' as EStreamingType,
  }))

const meta: Meta<typeof ListOfPlaylists> = {
  component: ListOfPlaylists,
  excludeStories: /.*Data$/,
  render: (args) => <ListOfPlaylists playlists={playlistsData} {...args} />,
}

export default meta
export type Story = StoryObj<typeof ListOfPlaylists>
export const ListOfPlaylistsStory: Story = {
  args: {
    isLoading: false,
    isError: false,
  },
}
