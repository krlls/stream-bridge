import { useColorModeValue } from '@chakra-ui/react'

export const useThemeColors = () => ({
  primary: useColorModeValue('gray.100', 'gray.900'),
  secondary: useColorModeValue('white', 'gray.800'),
  subBackground: useColorModeValue('gray.100', 'gray.750'),
  imagePlaceholder: useColorModeValue('gray.300', 'gray.600'),
})
