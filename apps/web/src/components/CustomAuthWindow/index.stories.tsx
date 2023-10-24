import type { Meta, StoryObj } from '@storybook/react'
import { Container } from '@chakra-ui/react'

import { CustomAuthForm } from './index.tsx'

const meta: Meta<typeof CustomAuthForm> = {
  component: CustomAuthForm,
  argTypes: {},
}

export default meta
export type Story = StoryObj<typeof CustomAuthForm>
export const CustomAuthFormStory: Story = {
  render: (args: any) => {
    return (
      <Container boxShadow='dark-lg' rounded='md' py='6' justifyContent='center'>
        <CustomAuthForm {...args} />
      </Container>
    )
  },
}
