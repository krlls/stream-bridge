import { useColorModeValue } from '@chakra-ui/react'

export const useThemeColors = () => ({
  primary: useColorModeValue('gray.100', 'gray.900'),
})
