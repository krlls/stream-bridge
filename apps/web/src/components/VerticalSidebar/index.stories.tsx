import type { Meta, StoryObj } from '@storybook/react'
import { rest } from 'msw'
import { Flex, Text } from '@chakra-ui/react'
import { Api } from 'api-types'

import { withBaseUrl } from '../../utils/links.ts'
import { userUrl } from '../../data/user'
import { VerticalSidebar } from './index.tsx'

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
    msw: {
      handlers: [
        rest.get(withBaseUrl(userUrl(Api.User.GetProfile.URL)), (_req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json({
              id: 1,
              login: 'ksmi@me.ru',
              name: 'Kirill',
            }),
          )
        }),
      ],
    },
  },
}
