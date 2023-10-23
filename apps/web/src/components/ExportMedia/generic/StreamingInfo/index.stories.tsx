import type { Meta, StoryObj } from '@storybook/react'
import { Flex } from '@chakra-ui/react'
import { EStreamingType } from 'api-types'

import { StreamingInfo } from './index.tsx'

const Cmp = StreamingInfo

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

export const StreamingInfoStory: Story = {
  render: (args) => <Cmp {...args} />,
  args: {
    originStreamingType: EStreamingType.SPOTIFY,
    targetStreamingType: EStreamingType.DEEZER,
  },
}
