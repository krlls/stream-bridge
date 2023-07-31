import type { Meta, StoryObj } from '@storybook/react'
import { ArrowLeftIcon } from '@chakra-ui/icons'

import { CardWithAction } from './index.tsx'

const meta: Meta<typeof CardWithAction> = {
  component: CardWithAction,
  argTypes: {
    action: { action: 'clicked' },
  },
}

export default meta
export type Story = StoryObj<typeof CardWithAction>
export const CardWithActionWithIconStory: Story = {
  render: (args) => <CardWithAction icon={<ArrowLeftIcon boxSize='4em' />} {...args} />,
  args: {
    title: 'Some test heading',
    text: 'Some text with card test property',
    buttonText: 'Click me!',
  },
}

export const CardWithActionNoButtonStory: Story = {
  ...CardWithActionWithIconStory,
  args: {
    ...CardWithActionWithIconStory.args,
    buttonText: undefined,
  },
}

export const CardWithActionNoIconStory: Story = {
  ...CardWithActionWithIconStory,
  args: {
    ...CardWithActionWithIconStory.args,
    icon: undefined,
  },
}
