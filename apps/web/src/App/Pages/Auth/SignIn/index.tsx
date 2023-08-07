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

import { useAuthMutation } from '../../../../data/user'
import { useLocalization } from '../../../../hooks/useLocalization.ts'
import { RegularEmailValidation } from '../../../../utils/utils.ts'

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
  const { t, d } = useLocalization()

  useEffect(() => {
    if (result.error) {
      setError('root.serverError', {
        type: result.status,
      })
      toast({
        title: t(d.LoginFailed),
        description: t(d.WrongLoginOrPassword),
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
          <Heading size='xl'>{t(d.login)}</Heading>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(auth)} noValidate>
            <Stack spacing={6}>
              <FormControl isInvalid={!!errors.email || !!errors.root?.serverError}>
                <FormLabel htmlFor='name'>{t(d.EmailAddress)}</FormLabel>
                <Input
                  id='email'
                  placeholder={t(d.Email)}
                  type='email'
                  {...register('email', {
                    required: t(d.EmailIsRequired),
                    minLength: { value: 4, message: t(d.MinimumLengthShould) },
                    pattern: {
                      value: RegularEmailValidation,
                      message: t(d.InvalidEmailAddress),
                    },
                  })}
                />
                <FormHelperText>{t(d.YourEmail)}</FormHelperText>
                <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.password || !!errors.root?.serverError}>
                <FormLabel>{t(d.YourPassword)}</FormLabel>
                <Input
                  id='password'
                  placeholder={t(d.Password)}
                  type='password'
                  {...register('password', {
                    required: t(d.PasswordIsRequired),
                    minLength: { value: 4, message: t(d.MinimumLengthShould) },
                  })}
                />
                <FormHelperText>{t(d.YourPassword)}</FormHelperText>
                <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
              </FormControl>
              <Stack direction='row' justify='end'>
                <Button colorScheme='teal' isLoading={result.isLoading} type='submit'>
                  <UnlockIcon marginRight={2} />
                  {t(d.ToLogin)}
                </Button>
                <Link to='/auth/sign-up'>
                  <Button>{t(d.SignUp)}</Button>
                </Link>
              </Stack>
            </Stack>
          </form>
        </CardBody>
      </Card>
    </Container>
  )
}
