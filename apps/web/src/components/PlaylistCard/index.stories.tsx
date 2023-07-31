import type { Meta, StoryObj } from '@storybook/react'

import { PlaylistCard } from './index.tsx'

const meta: Meta<typeof PlaylistCard> = {
  component: PlaylistCard,
  argTypes: {
    onClick: { action: 'clicked' },
  },
}

export default meta
export type Story = StoryObj<typeof PlaylistCard>
export const PlaylistCardStory: Story = {
  args: {
    id: 1,
    name: 'My playlist',
  },
}
