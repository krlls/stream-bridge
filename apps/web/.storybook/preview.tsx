import { store } from '../src/store/configureStore'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import theme from '../src/theme'
import { ChakraProvider } from '@chakra-ui/react'
import { initialize, mswLoader } from 'msw-storybook-addon'
import '../src/localization'

// Initialize MSW
initialize()

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  loaders: [mswLoader],
}

export const decorators = [
  (Story) => (
    <Provider store={store}>
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <Story />
        </ChakraProvider>
      </BrowserRouter>
    </Provider>
  ),
]

export default preview
