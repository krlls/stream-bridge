import type { Meta, StoryObj } from '@storybook/react'
import { Flex, Text } from '@chakra-ui/react'

import { VerticalSidebar } from './index.tsx'
import { StreamingList } from '../StreamingList'
import { streamingListData } from '../StreamingList/index.stories.tsx'

const meta: Meta<typeof VerticalSidebar> = {
  component: VerticalSidebar,
  decorators: [
    (Story) => (
      <Flex height='100vh'>
        <Story />
      </Flex>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof VerticalSidebar>

export const VerticalSidebarStory: Story = {
  render: (args) => (
    <VerticalSidebar {...args}>
      <Text>Some value</Text>
    </VerticalSidebar>
  ),
  args: {
    //👇 The args you need here will depend on your component
  },
  parameters: {
    layout: 'fullscreen',
  },
}

export const VerticalSidebarWithItemsStory: Story = {
  ...VerticalSidebarStory,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    ...({ isLoading: false, isError: false } as any),
  },
  render: (args) => (
    <VerticalSidebar {...args}>
      <StreamingList data={streamingListData} isLoading={false} isError={false} {...args} />
    </VerticalSidebar>
  ),
}
