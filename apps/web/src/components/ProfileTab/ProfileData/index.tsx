import { FC, SyntheticEvent, useState } from 'react'
import { useForm, RegisterOptions, UseFormRegister } from 'react-hook-form'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
} from '@chakra-ui/react'

import { useLocalization } from '../../../hooks/useLocalization.js'
import { variants } from '../../../utils/size.ts'
import {
  MAX_EMAIL_LENGTH,
  MAX_NAME_LENGTH,
  MAX_PASS_LENGTH,
  MIN_EMAIL_LENGTH,
  MIN_NAME_LENGTH,
  MIN_PASS_LENGTH,
  RegularEmailValidation,
} from '../../../utils/vaidation.ts'

export type TProps = {
  id: number,
  name: string,
  login: string,
  isLoading: boolean,
}

type Inputs = {
  email: string,
  name: string,
  password: string,
  repeatPassword: string,
}

type TField = {
  label: string,
  isError: boolean,
  errorMessage?: string,
  type: string,
  id: string,
  placeholder: string,
  defaultValue?: string,
  validate: RegisterOptions,
  register: UseFormRegister<any>,
}

const PASS_PLACEHOLDER = '*************'

export const ProfileData: FC<TProps> = ({ name, login }) => {
  const {
    register,
    formState: { errors, isValid },
  } = useForm<Inputs>()
  const { t, d } = useLocalization()
  const [password, setPassword] = useState('')
  const groupSize = variants('0', '400px')

  const InfoFields: TField[] = [
    {
      register,
      label: t(d.Name),
      isError: !!errors.name || !!errors.root?.serverError,
      errorMessage: errors.name?.message,
      type: 'name',
      id: 'name',
      placeholder: t(d.Name),
      defaultValue: name,
      validate: {
        required: t(d.NameIsRequired),
        minLength: { value: MIN_NAME_LENGTH, message: t(d.MinimumLengthShould) },
        maxLength: { value: MAX_NAME_LENGTH, message: t(d.MaximumLengthShould) },
      },
    },
    {
      register,
      label: t(d.Email),
      isError: !!errors.email || !!errors.root?.serverError,
      errorMessage: errors.email?.message,
      type: 'email',
      id: 'email',
      placeholder: t(d.Email),
      defaultValue: login,
      validate: {
        required: t(d.EmailIsRequired),
        minLength: { value: MIN_EMAIL_LENGTH, message: t(d.MinimumLengthShould) },
        maxLength: { value: MAX_EMAIL_LENGTH, message: t(d.MaximumLengthShould) },
        pattern: { value: RegularEmailValidation, message: t(d.InvalidEmailAddress) },
      },
    },
  ]

  const passwordFields: TField[] = [
    {
      register,
      label: t(d.Password),
      isError: !!errors.password || !!errors.root?.serverError,
      errorMessage: errors.password?.message,
      type: 'password',
      id: 'password',
      placeholder: PASS_PLACEHOLDER,
      validate: {
        required: t(d.PasswordIsRequired),
        minLength: { value: MIN_PASS_LENGTH, message: t(d.MinimumLengthShould) },
        maxLength: { value: MAX_PASS_LENGTH, message: t(d.MaximumLengthShould) },
        onChange: (e: SyntheticEvent<HTMLInputElement>) => setPassword(e.currentTarget.value),
      },
    },
    {
      register,
      label: t(d.RepeatPassword),
      isError: !!errors.repeatPassword || !!errors.root?.serverError,
      errorMessage: errors.repeatPassword?.message,
      type: 'password',
      id: 'repeatPassword',
      placeholder: PASS_PLACEHOLDER,
      validate: {
        required: t(d.PasswordIsRequired),
        minLength: { value: MIN_PASS_LENGTH, message: t(d.MinimumLengthShould) },
        maxLength: { value: MAX_PASS_LENGTH, message: t(d.MaximumLengthShould) },
        validate: (val) => password === val || t(d.PasswordsNotMatch),
      },
    },
  ]

  return (
    <Card variant='outline' flex={1} minWidth={variants('100px', '300px')}>
      <CardHeader>
        <Heading size='lg'>{t(d.ProfileSettings)}</Heading>
      </CardHeader>
      <CardBody p={4}>
        <form noValidate>
          <Stack direction={variants('column', 'row')} spacing={6} flexWrap='wrap'>
            <Flex direction='column' flexBasis={groupSize} mr={variants(0, 4)}>
              {InfoFields.map((field) => (
                <Field {...field} />
              ))}
            </Flex>
            <Flex direction='column' flexBasis={groupSize} mr={variants(0, 4)}>
              {passwordFields.map((field) => (
                <Field {...field} />
              ))}
            </Flex>
          </Stack>
        </form>
      </CardBody>
      <Divider />
      <CardFooter>
        <Button colorScheme='blue' isDisabled={!isValid}>
          {t(d.Update)}
        </Button>
      </CardFooter>
    </Card>
  )
}

function Field({ isError, label, placeholder, defaultValue, type, id, validate, errorMessage, register }: TField) {
  return (
    <FormControl isInvalid={isError} mb={4} isDisabled>
      <FormLabel>{label}</FormLabel>
      <Input id={id} type={type} defaultValue={defaultValue} placeholder={placeholder} {...register(id, validate)} />
      <FormErrorMessage>{isError && errorMessage}</FormErrorMessage>
    </FormControl>
  )
}
