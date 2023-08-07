import type { Meta, StoryObj } from '@storybook/react'
import { EStreamingType } from 'api-types'

import { ConnectStreaming } from './index'

const meta: Meta<typeof ConnectStreaming> = {
  component: ConnectStreaming,
}

export default meta
export type Story = StoryObj<typeof ConnectStreaming>

export const ConnectStreamingStory: Story = {
  render: (args) => <ConnectStreaming {...args} />,
  args: {
    type: EStreamingType.SPOTIFY,
    isConnected: false,
  },
}
