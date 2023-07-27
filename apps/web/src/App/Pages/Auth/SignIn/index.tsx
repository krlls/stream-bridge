import { FC } from 'react'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Stack,
} from '@chakra-ui/react'
import { UnlockIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'

export const SignIn: FC = () => {
  return (
    <Container>
      <Card>
        <CardHeader>
          <Heading size='xl'>Sign in</Heading>
        </CardHeader>
        <CardBody>
          <Stack spacing={6}>
            <FormControl>
              <FormLabel>Email address</FormLabel>
              <Input type='email' />
              <FormHelperText>Your email.</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input type='password' />
              <FormHelperText>Your password.</FormHelperText>
            </FormControl>
            <Stack direction='row' justify='end'>
              <Button colorScheme='teal'>
                <UnlockIcon marginRight={2} />
                Login
              </Button>
              <Link to='/auth/sign-up'>
                <Button>Sign Up</Button>
              </Link>
            </Stack>
          </Stack>
        </CardBody>
      </Card>
    </Container>
  )
}
