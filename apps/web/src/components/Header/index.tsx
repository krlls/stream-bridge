import { FC, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  Avatar,
  Box,
  Center,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
} from '@chakra-ui/react'
import { useDispatch } from 'react-redux'

import { resetToken, useGetUserQuery } from '../../data/user'
import { useLocalization } from '../../hooks/useLocalization.ts'
import { useThemeColors } from '../../hooks/useThemeColors.ts'
import { variants } from '../../utils/size.ts'
import { Logo } from '../Logo'

type TProps = {
  mobileMenu?: ReactNode,
}

export const Header: FC<TProps> = ({ mobileMenu }) => {
  const { data, isLoading, isError } = useGetUserQuery(undefined)
  const dispatch = useDispatch()
  const { primary, secondary } = useThemeColors()
  const { t, d } = useLocalization()

  return (
    <Box
      bg={primary}
      px={4}
      as={'header'}
      zIndex={2}
      position={'relative'}
      _after={{
        display: variants('none', 'block'),
        position: 'absolute',
        content: '""',
        margin: -4,
        bottom: '-1.7px',
        border: '5px solid transparent',
        borderTop: '13px solid',
        borderLeft: '13px solid',
        borderTopColor: secondary,
        borderLeftColor: secondary,
        borderTopStartRadius: '50%',
      }}
      _before={{
        display: variants('none', 'block'),
        position: 'absolute',
        content: '""',
        margin: -4,
        bottom: '3px',
        width: '13px',
        height: '13px',
        bg: primary,
        borderBottomEndRadius: '50%',
      }}
    >
      <Flex h={16} align='center' justify='space-between'>
        {mobileMenu && (
          <Box mr={2} display={variants('flex', 'none')}>
            {mobileMenu}
          </Box>
        )}
        <Box
          _hover={{
            transform: 'rotate(-3deg)',
          }}
          transition='.05s ease-out'
        >
          <Link to='/'>
            <Logo />
          </Link>
        </Box>
        <Flex align='center'>
          {isLoading || isError ? (
            <Spinner />
          ) : (
            <Menu>
              <MenuButton>
                <Avatar size='sm' marginStart={4} name={data?.name} />
              </MenuButton>
              <MenuList zIndex={2}>
                <Center py={4} flexDirection='column'>
                  <Avatar size='xl' mb={4} name={data?.name} />
                  <Heading size='sm'>{data?.name}</Heading>
                </Center>
                <MenuDivider />
                <MenuItem>
                  <Link to='/profile'> {t(d.Profile)}</Link>
                </MenuItem>
                <MenuItem isDisabled>{t(d.Settings)}</MenuItem>
                <MenuItem onClick={() => dispatch(resetToken())}>{t(d.LogOut)}</MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>
      </Flex>
    </Box>
  )
}
