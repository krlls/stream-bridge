import { FC } from 'react'
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
  useColorModeValue,
} from '@chakra-ui/react'
import { useDispatch } from 'react-redux'

import { ToggleTheme } from '../ToggleTheme'
import { resetToken, useGetUserQuery } from '../../data/user'
import { useLocalization } from '../../hooks/useLocalization.ts'

export const Header: FC = () => {
  const { data, isLoading, isError } = useGetUserQuery(undefined)
  const dispatch = useDispatch()
  const { t, d } = useLocalization()

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h={16} align='center' justify='space-between'>
        <Box>Logo</Box>
        <Flex align='center'>
          {isLoading || isError ? (
            <Spinner />
          ) : (
            <Menu>
              <MenuButton>
                <Avatar size='sm' marginStart={4} />
              </MenuButton>
              <MenuList>
                <Flex justify='flex-end' px={2}>
                  <ToggleTheme />
                </Flex>
                <Center paddingBottom={4} flexDirection='column'>
                  <Avatar size='xl' mb={4} />
                  <Heading size='sm'>{data?.name}</Heading>
                </Center>
                <MenuDivider />
                <MenuItem>{t(d.Profile)}</MenuItem>
                <MenuItem>{t(d.Settings)}</MenuItem>
                <MenuItem onClick={() => dispatch(resetToken())}>{t(d.LogOut)}</MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>
      </Flex>
    </Box>
  )
}