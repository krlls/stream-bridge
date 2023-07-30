import { Button, useColorMode } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

export function ToggleTheme() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <>
      <Button size='md' rounded={'full'} px={2} onClick={toggleColorMode}>
        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      </Button>
    </>
  )
}
