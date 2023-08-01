import { FC } from 'react'
import {
  Container,
  Card,
  CardHeader,
  Heading,
  CardBody,
  Stack,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { UnlockIcon } from '@chakra-ui/icons'

import { useLocalization } from '../../../../hooks/useLocalization.ts'

export const SignUp: FC = () => {
  const { t, d } = useLocalization()

  return (
    <Container>
      <Card>
        <CardHeader>
          <Heading size='xl'>{t(d.registration)}</Heading>
        </CardHeader>
        <CardBody>
          <form>
            <Stack spacing={6}>
              <FormControl>
                <FormLabel>{t(d.EmailAddress)}</FormLabel>
                <Input id='email' type='email' placeholder={t(d.Email)} />
                <FormHelperText>{t(d.YourEmail)}</FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel>{t(d.Password)}</FormLabel>
                <Input id='password' type='password' placeholder={t(d.Password)} />
                <FormHelperText>{t(d.YourPassword)}</FormHelperText>
              </FormControl>
              <FormControl>
                <Input id='passwordRepeat' type='passwordRepeat' placeholder={t(d.RepeatPassword)} />
                <FormHelperText>{t(d.YourRepeatPassword)}</FormHelperText>
              </FormControl>
              <Stack direction='row' justify='end'>
                <Link to='/auth/sign-in'>
                  <Button>{t(d.ToLogin)}</Button>
                </Link>
                <Button colorScheme='teal'>
                  <UnlockIcon marginRight={2} />
                  {t(d.registration)}
                </Button>
              </Stack>
            </Stack>
          </form>
        </CardBody>
      </Card>
    </Container>
  )
}
