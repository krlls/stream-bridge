import { FC } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
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
} from '@chakra-ui/react'
import { UnlockIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'

type Inputs = {
  email: string,
  password: string,
}

export const SignIn: FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>()
  // eslint-disable-next-line no-console
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  return (
    <Container>
      <Card>
        <CardHeader>
          <Heading size='xl'>Sign In</Heading>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={6}>
              <FormControl isInvalid={!!errors.email}>
                <FormLabel htmlFor='name'>Email address</FormLabel>
                <Input
                  id='email'
                  placeholder='Email'
                  type='email'
                  {...register('email', {
                    required: 'Email is required',
                    minLength: { value: 4, message: 'Minimum length should be 4' },
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'invalid email address',
                    },
                  })}
                />
                <FormHelperText>Your email.</FormHelperText>
                <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.password}>
                <FormLabel>Password</FormLabel>
                <Input
                  id='password'
                  placeholder='Password'
                  type='password'
                  {...register('password', {
                    required: 'Password is required',
                    minLength: { value: 4, message: 'Minimum length should be 4' },
                  })}
                />
                <FormHelperText>Your password.</FormHelperText>
                <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
              </FormControl>
              <Stack direction='row' justify='end'>
                <Button colorScheme='teal' isLoading={isSubmitting} type='submit'>
                  <UnlockIcon marginRight={2} />
                  Login
                </Button>
                <Link to='/auth/sign-up'>
                  <Button>Sign Up</Button>
                </Link>
              </Stack>
            </Stack>
          </form>
        </CardBody>
      </Card>
    </Container>
  )
}
