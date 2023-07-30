import type { Meta, StoryObj } from '@storybook/react'
import { rest } from 'msw'
import { Api } from 'api-types'

import { SignIn } from './index.tsx'
import { authUrl } from '../../../../data/user'
import { withBaseUrl } from '../../../../utils/links.ts'

const meta: Meta<typeof SignIn> = {
  component: SignIn,
}

export default meta
type Story = StoryObj<typeof SignIn>

export const LoginForm: Story = {
  args: {
    //👇 The args you need here will depend on your component
  },
  parameters: {
    msw: {
      handlers: [
        rest.post(withBaseUrl(authUrl(Api.Auth.Login.URL)), (_req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json({
              token: 'test',
            }),
          )
        }),
      ],
    },
  },
}
