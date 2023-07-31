import type { Meta, StoryObj } from '@storybook/react'

import { Section } from './index.tsx'

const meta: Meta<typeof Section> = {
  component: Section,
}

export default meta
export type Story = StoryObj<typeof Section>

export const SectionStory: Story = {
  args: {
    title: 'My playlist',
    children: 'Some content, any component or text',
  },
}
