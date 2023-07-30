import type { Meta, StoryObj } from '@storybook/react'
import { Button, Flex, Text } from '@chakra-ui/react'

import { AppDrawer } from './index.tsx'

const meta: Meta<typeof AppDrawer> = {
  component: AppDrawer,
  decorators: [
    (Story) => (
      <Flex height='100vh'>
        <Story />
      </Flex>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof AppDrawer>

export const AppDrawerStory: Story = {
  render: (args) => (
    <AppDrawer {...args} trigger={<Button>Click me</Button>}>
      <Text>Some value</Text>
    </AppDrawer>
  ),
  args: {
    title: 'Some header',
  },
}
