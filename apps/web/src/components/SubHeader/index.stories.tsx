import type { Meta, StoryObj } from '@storybook/react'

import { SubHeader } from './index'

export type Story = StoryObj<typeof SubHeader>

const meta: Meta<typeof SubHeader> = {
  component: SubHeader,
}

export default meta

export const SubHeaderStory: Story = {
  args: {},
}
