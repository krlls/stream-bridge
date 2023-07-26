import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { EStoreNames } from '../types.ts'

export interface CounterState {
  value: number,
}

const initialState: CounterState = {
  value: 0,
}

export const streamingSlice = createSlice({
  name: EStoreNames.STREAMING,
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

export default streamingSlice.reducer
