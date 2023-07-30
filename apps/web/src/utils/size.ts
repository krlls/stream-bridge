import { ResponsiveValue } from '@chakra-ui/styled-system'

export const variants = <T extends ResponsiveValue<any>>(mobile: T, full: T) => [mobile, mobile, full, full]
