import 'reflect-metadata'
import { describe, test, expect } from '@jest/globals'
import request from 'supertest'

import { App } from '../infra/App'

export const TestApp = request(App.callback())

describe('Tests work', () => {
  test('True to be true ❤️', async () => {
    expect(true).toBe(true)
  })
})
