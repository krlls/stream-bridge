import { PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  token?: string,
  name?: string,
}

export type SaveTokenAction = PayloadAction<string>
