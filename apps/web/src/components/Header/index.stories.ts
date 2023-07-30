import type { Meta, StoryObj } from '@storybook/react'
import { rest } from 'msw'
import { Api } from 'api-types'

import { withBaseUrl } from '../../utils/links.ts'
import { userUrl } from '../../data/user'
import { Header } from './index.tsx'

const meta: Meta<typeof Header> = {
  component: Header,
}

export default meta
type Story = StoryObj<typeof Header>

export const LoginForm: Story = {
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
