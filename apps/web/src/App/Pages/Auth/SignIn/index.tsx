import { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
} from '@chakra-ui/react'
import { UnlockIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { useAuthMutation } from '../../../../data/user'

type Inputs = {
  email: string,
  password: string,
}

export const SignIn: FC = () => {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<Inputs>()
  const toast = useToast()
  const [sendAuth, result] = useAuthMutation()
  const auth = ({ email, password }: Inputs) => sendAuth({ login: email, pass: password })
  const { t } = useTranslation()

  useEffect(() => {
    if (result.error) {
      setError('root.serverError', {
        type: result.status,
      })
      toast({
        title: t('LoginFailed'),
        description: t('WrongLoginOrPassword'),
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }, [result.error])

  return (
    <Container>
      <Card>
        <CardHeader>
          <Heading size='xl'>{t('login')}</Heading>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(auth)} noValidate>
            <Stack spacing={6}>
              <FormControl isInvalid={!!errors.email || !!errors.root?.serverError}>
                <FormLabel htmlFor='name'>{t('EmailAddress')}</FormLabel>
                <Input
                  id='email'
                  placeholder='Email'
                  type='email'
                  {...register('email', {
                    required: t('EmailIsRequired'),
                    minLength: { value: 4, message: t('MinimumLengthShould') },
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: t('InvalidEmailAddress'),
                    },
                  })}
                />
                <FormHelperText>{t('YourEmail')}</FormHelperText>
                <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.password || !!errors.root?.serverError}>
                <FormLabel>{t('YourPassword')}</FormLabel>
                <Input
                  id='password'
                  placeholder='Password'
                  type='password'
                  {...register('password', {
                    required: t('PasswordIsRequired'),
                    minLength: { value: 4, message: t('MinimumLengthShould') },
                  })}
                />
                <FormHelperText>{t('YourPassword')}</FormHelperText>
                <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
              </FormControl>
              <Stack direction='row' justify='end'>
                <Button colorScheme='teal' isLoading={result.isLoading} type='submit'>
                  <UnlockIcon marginRight={2} />
                  {t('ToLogin')}
                </Button>
                <Link to='/auth/sign-up'>
                  <Button>{t('SignUp')}</Button>
                </Link>
              </Stack>
            </Stack>
          </form>
        </CardBody>
      </Card>
    </Container>
  )
}
