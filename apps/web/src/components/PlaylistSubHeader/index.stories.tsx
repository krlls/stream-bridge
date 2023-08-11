import type { Meta, StoryObj } from '@storybook/react'

import { PlaylistSubHeader } from './index'

export type Story = StoryObj<typeof PlaylistSubHeader>

const meta: Meta<typeof PlaylistSubHeader> = {
  component: PlaylistSubHeader,
}

export default meta

export const PlaylistSubHeaderStory: Story = {
  args: {
    title: 'My playlist',
    tracks: 57,
  },
}
