import { FC, SyntheticEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Container,
  Card,
  CardHeader,
  Heading,
  CardBody,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
} from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { SmallAddIcon } from '@chakra-ui/icons'

import { useLocalization } from '../../../../hooks/useLocalization'
import { useCreateUserMutation } from '../../../../data/user'
import {
  MAX_EMAIL_LENGTH,
  MAX_NAME_LENGTH,
  MAX_PASS_LENGTH,
  MIN_EMAIL_LENGTH,
  MIN_NAME_LENGTH,
  MIN_PASS_LENGTH,
  RegularEmailValidation,
} from '../../../../utils/vaidation'

type Inputs = {
  email: string,
  name: string,
  password: string,
  repeatPassword: string,
}

export const SignUp: FC = () => {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isValid },
  } = useForm<Inputs>()
  const [sendRegistration, result] = useCreateUserMutation()
  const registration = ({ email, name, password }: Inputs) =>
    sendRegistration({ login: email, name: name, pass: password })
  const { t, d } = useLocalization()
  const navigation = useNavigate()
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (result.isSuccess) {
      navigation('/auth/sign-in')
    }

    if (result.isError) {
      setError('root.serverError', { type: result.status })
    }
  }, [result])

  return (
    <Container>
      <Card>
        <CardHeader>
          <Heading size='xl'>{t(d.registration)}</Heading>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(registration)} noValidate>
            <Stack spacing={6}>
              <FormControl isInvalid={!!errors.name || !!errors.root?.serverError}>
                <FormLabel>{t(d.NameUser)}</FormLabel>
                <Input
                  id='name'
                  type='name'
                  placeholder={t(d.Name)}
                  {...register('name', {
                    required: t(d.NameIsRequired),
                    minLength: { value: MIN_NAME_LENGTH, message: t(d.MinimumLengthShould) },
                    maxLength: { value: MAX_NAME_LENGTH, message: t(d.MaximumLengthShould) },
                  })}
                />
                <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.email || !!errors.root?.serverError}>
                <FormLabel>{t(d.EmailAddress)}</FormLabel>
                <Input
                  id='email'
                  type='email'
                  placeholder={t(d.Email)}
                  {...register('email', {
                    required: t(d.EmailIsRequired),
                    minLength: { value: MIN_EMAIL_LENGTH, message: t(d.MinimumLengthShould) },
                    maxLength: { value: MAX_EMAIL_LENGTH, message: t(d.MaximumLengthShould) },
                    pattern: {
                      value: RegularEmailValidation,
                      message: t(d.InvalidEmailAddress),
                    },
                  })}
                />
                <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.password || !!errors.root?.serverError}>
                <FormLabel>{t(d.Password)}</FormLabel>
                <Input
                  id='password'
                  type='password'
                  placeholder={t(d.Password)}
                  {...register('password', {
                    required: t(d.PasswordIsRequired),
                    minLength: { value: MIN_PASS_LENGTH, message: t(d.MinimumLengthShould) },
                    maxLength: { value: MAX_PASS_LENGTH, message: t(d.MaximumLengthShould) },
                    onChange: (e: SyntheticEvent<HTMLInputElement>) => setPassword(e.currentTarget.value),
                  })}
                />
                <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.repeatPassword || !!errors.root?.serverError}>
                <Input
                  id='repeatPassword'
                  type='password'
                  placeholder={t(d.RepeatPassword)}
                  {...register('repeatPassword', {
                    required: t(d.PasswordIsRequired),
                    minLength: { value: MIN_PASS_LENGTH, message: t(d.MinimumLengthShould) },
                    maxLength: { value: MAX_PASS_LENGTH, message: t(d.MaximumLengthShould) },
                    validate: (val) => password === val || t(d.PasswordsNotMatch),
                  })}
                />
                <FormErrorMessage>{errors.repeatPassword && errors.repeatPassword.message}</FormErrorMessage>
              </FormControl>
              <Stack direction='row' justify='end'>
                <Link to='/auth/sign-in'>
                  <Button>{t(d.ToLogin)}</Button>
                </Link>
                <Button colorScheme='teal' type='submit' isDisabled={!isValid}>
                  <SmallAddIcon marginRight={2} />
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
