import type { Meta, StoryObj } from '@storybook/react'

import { ProfileCard } from './index.tsx'

const meta: Meta<typeof ProfileCard> = {
  component: ProfileCard,
  argTypes: {
    logOut: { action: 'Log Out' },
  },
}

export default meta
export type Story = StoryObj<typeof ProfileCard>

export const ProfileCardStory: Story = {
  args: {
    id: 1,
    name: 'Test User',
    login: 'test@gmai.com',
    playlists: 150,
    tracks: 8305,
    streamings: 4,
    isLoading: false,
  },
}
