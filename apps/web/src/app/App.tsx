import { useDispatch, useSelector } from 'react-redux'

import reactLogo from '../assets/react.svg'

import viteLogo from '/vite.svg'

import './App.css'

import { RootState } from '../store/configureStore.ts'
import { increment, useGetAvailableStreamingsQuery } from '../data/counter'

function App() {
  const { data, isLoading, refetch, error } = useGetAvailableStreamingsQuery('')
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <>
      <div>
        <a href='https://vitejs.dev' target='_blank'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Vite + React + Redux Toolkit </h1>
      <div className='card'>
        <button onClick={() => dispatch(increment())}>count is {count}</button>
        <button onClick={refetch}>
          Refresh
          {isLoading && ': Loading'}
          {error && ': Error'}
        </button>
        <p>
          Available streamings <code>{data?.map((a) => a.name)}</code>
        </p>
      </div>
      <p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
    </>
  )
}

export default App
