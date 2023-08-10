import { FC, ReactElement } from 'react'
import { Flex, IconButton } from '@chakra-ui/react'
import { SettingsIcon } from '@chakra-ui/icons'

import { PageControls } from '../PageControls'

type TProps = {
  left?: boolean,
  right?: boolean,
  icon?: ReactElement,
  iconClick?(): void,
}

export const NavBar: FC<TProps> = ({ icon, iconClick, left, right }) => {
  return (
    <Flex flexGrow={1} justifyContent='space-between' alignItems='center' mb={6}>
      <PageControls left={left} right={right} />
      <IconButton
        aria-label='settings'
        icon={icon ? icon : <SettingsIcon />}
        onClick={iconClick}
        background='transparent'
      />
    </Flex>
  )
}
