import { FC, ReactNode } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, Center, Stack, Text } from '@chakra-ui/react'

import viteLogo from '/vite.svg'

import reactLogo from '../../../assets/react.svg'
import { increment, useGetAvailableStreamingsQuery } from '../../../data/streaming'
import { RootState } from '../../../store/configureStore.ts'

export type TProps = {
  children?: ReactNode,
}

export const Main: FC<TProps> = () => {
  const { data, isLoading, refetch, error } = useGetAvailableStreamingsQuery('')
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <Center flex={1} flexDirection='column'>
      <Stack direction='row'>
        <Box>
          <a href='https://vitejs.dev' target='_blank'>
            <img src={viteLogo} className='logo' alt='Vite logo' />
          </a>
        </Box>
        <Box>
          <a href='https://react.dev' target='_blank'>
            <img src={reactLogo} className='logo react' alt='React logo' />
          </a>
        </Box>
      </Stack>
      <h1>Vite + React + Redux Toolkit </h1>
      <div className='card'>
        <Button onClick={() => dispatch(increment())}>count is {count}</Button>
        <Button onClick={refetch}>
          Refresh
          {isLoading && ': Loading'}
          {error && ': Error'}
        </Button>
        <Text marginY={4}>
          Available streamings <code>{data?.map((a) => a.name)}</code>
        </Text>
      </div>
      <p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
    </Center>
  )
}
