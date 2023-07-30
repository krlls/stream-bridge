import { ResponsiveValue } from '@chakra-ui/styled-system'

type Breakpoints<T> = {
  sm: T, // 480px
  md: T, // 768px
  lg: T, // 992px
  xl: T, // 1280px
  '2xl': T, // 1536px
}

export const variants = <T extends ResponsiveValue<any>>(mobile: T, full: T, extra?: T): Breakpoints<T> => ({
  sm: mobile,
  md: mobile,
  lg: full,
  xl: full,
  '2xl': extra || full,
})
