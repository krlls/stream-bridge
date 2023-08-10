import { FC } from 'react'
import { Flex, IconButton } from '@chakra-ui/react'
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'

type TProps = {
  left?: boolean,
  right?: boolean,
}

export const PageControls: FC<TProps> = ({ left = true, right = true }) => {
  const navigate = useNavigate()

  return (
    <Flex alignItems='center' justifyContent='center'>
      <IconButton
        isDisabled={!left}
        aria-label='left'
        icon={<ArrowBackIcon />}
        rounded={'full'}
        mr={2}
        size='sm'
        onClick={() => navigate(-1)}
      />
      <IconButton
        isDisabled={!right}
        aria-label='right'
        icon={<ArrowForwardIcon />}
        rounded={'full'}
        size='sm'
        onClick={() => navigate(+1)}
      />
    </Flex>
  )
}
