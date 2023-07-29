import type { Meta, StoryObj } from '@storybook/react'
import { rest } from 'msw'

import { SignIn } from './index.tsx'

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
        rest.post('http://localhost:3000/auth/login', (_req, res, ctx) => {
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
