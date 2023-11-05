import {
  Box,
  ListItem,
  UnorderedList,
  Input,
  FormControl,
  Button,
  Image,
  Flex,
  Text,
  Highlight,
} from '@chakra-ui/react'

import lock from '../../assets/lock.svg'
import { useLocalization } from '../../hooks/useLocalization.ts'
import { variants } from '../../utils/size.ts'

const property = {
  image: lock,
  imageAlt: 'lock',
  streamingName: 'Yandex Music (Яндекс Музыка)',
  loginForm: '',
  passwordForm: '',
}

export const CustomAuthForm = () => {
  const { t, d } = useLocalization()

  return (
    <Flex
      direction='column'
      align='center'
      justify='center'
      mx={variants(2, 8)}
      textAlign={variants('left', 'center')}
      fontFamily='sans-serif'
    >
      <Image w='80%' maxWidth='200px' mb={variants(2, 8)} src={property.image} />
      <Box
        fontWeight='semibold'
        textAlign='center'
        as='h4'
        lineHeight='tight'
        fontSize={variants(15, 22)}
        mb={variants(4, 8)}
      >
        <Highlight query='Stream-Bridge' styles={{ bgGradient: 'linear(to-l, #bd34fe, #4186ff)', bgClip: 'text' }}>
          {`Stream-Bridge ${t(d.CustomAuthWindowTitle)}`}
        </Highlight>
        <Text bgGradient='linear(to-l, #FF0000, #FFFF00)' bgClip='text'>
          {property.streamingName}
        </Text>
      </Box>
      <Box
        px={variants(2, 8)}
        fontSize={variants(11, 14)}
        fontFamily='sans-serif'
        textAlign='start'
        fontWeight='600'
        color='gray.400'
      >
        <UnorderedList mb={variants(5, 10)} spacing='4'>
          <ListItem>{t(d.CustomAuthWindowListAPIInfo)}</ListItem>
          <ListItem>
            {t(d.CustomAuthWindowListChangePassMessage, {
              streamingName: property.streamingName,
            })}
          </ListItem>
          <ListItem>{t(d.CustomAuthWindowListErrorString)}</ListItem>
        </UnorderedList>
        <FormControl>
          <Input mb={variants(2, 3)} type='email' placeholder='login' />
          <Input mb={variants(2, 3)} type='email' placeholder='password' />
          <Button
            w='100%'
            variant='solid'
            bgGradient='linear(to-l, #bd34fe, #4186ff)'
            _hover={{
              bgGradient: 'linear(to-r, #bd34fe, #4186ff)',
            }}
          >
            {t(d.CustomAuthWindowListConnectBtn)}
          </Button>
        </FormControl>
      </Box>
    </Flex>
  )
}
