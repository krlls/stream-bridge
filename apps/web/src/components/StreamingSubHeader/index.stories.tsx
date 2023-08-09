import type { Meta, StoryObj } from '@storybook/react'

import { StreamingSubHeader } from './index'

export type Story = StoryObj<typeof StreamingSubHeader>

const meta: Meta<typeof StreamingSubHeader> = {
  component: StreamingSubHeader,
}

export default meta

export const StreamingSubHeaderStory: Story = {
  args: {
    title: 'Spotify',
    playlists: 45,
    tracks: 647,
  },
}
