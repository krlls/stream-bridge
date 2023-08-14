import { FC, SyntheticEvent, useMemo, useState } from 'react'
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
  updateResult: { isError: boolean, isLoading: boolean },
  updateUser(update: { name?: string, login?: string, pass?: string }): void,
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

enum FIELDS {
  NAME = 'name',
  PASSWORD = 'password',
  REPEAT_PASSWORD = 'repeatPassword',
  EMAIL = 'email',
}

const PASS_PLACEHOLDER = '*************'
const FORM_ID = 'edit-user-form'

export const ProfileData: FC<TProps> = ({ name, login, updateUser, updateResult }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid, isDirty },
  } = useForm<Inputs>()
  const { t, d } = useLocalization()
  const [password, setPassword] = useState('')
  const groupSize = variants('0', '400px')
  const updateHandler = ({ email, password, name }: Inputs) =>
    updateUser({ login: email || undefined, pass: password || undefined, name: name || undefined })

  const InfoFields: TField[] = useMemo(
    () => [
      {
        register,
        label: t(d.Name),
        isError: !!errors.name || !!errors.root?.serverError,
        errorMessage: errors.name?.message,
        type: 'name',
        id: FIELDS.NAME,
        placeholder: name || t(d.Name),
        validate: {
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
        id: FIELDS.EMAIL,
        placeholder: login || t(d.Email),
        validate: {
          minLength: { value: MIN_EMAIL_LENGTH, message: t(d.MinimumLengthShould) },
          maxLength: { value: MAX_EMAIL_LENGTH, message: t(d.MaximumLengthShould) },
          pattern: { value: RegularEmailValidation, message: t(d.InvalidEmailAddress) },
        },
      },
    ],
    [
      d.Email,
      d.InvalidEmailAddress,
      d.MaximumLengthShould,
      d.MinimumLengthShould,
      d.Name,
      errors.email,
      errors.name,
      errors.root?.serverError,
      login,
      name,
      register,
      t,
    ],
  )

  const passwordFields: TField[] = useMemo(
    () => [
      {
        register,
        label: t(d.Password),
        isError: !!errors.password || !!errors.root?.serverError,
        errorMessage: errors.password?.message,
        type: 'password',
        id: FIELDS.PASSWORD,
        placeholder: PASS_PLACEHOLDER,
        validate: {
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
        id: FIELDS.REPEAT_PASSWORD,
        placeholder: PASS_PLACEHOLDER,
        validate: {
          minLength: { value: MIN_PASS_LENGTH, message: t(d.MinimumLengthShould) },
          maxLength: { value: MAX_PASS_LENGTH, message: t(d.MaximumLengthShould) },
          validate: (val) => password === val || t(d.PasswordsNotMatch),
        },
      },
    ],
    [
      d.MaximumLengthShould,
      d.MinimumLengthShould,
      d.Password,
      d.PasswordsNotMatch,
      d.RepeatPassword,
      errors.password,
      errors.repeatPassword,
      errors.root?.serverError,
      password,
      register,
      t,
    ],
  )

  return (
    <Card variant='outline' flex={1} minWidth={variants('100px', '300px')}>
      <CardHeader>
        <Heading size='lg'>{t(d.ProfileSettings)}</Heading>
      </CardHeader>
      <CardBody p={4}>
        <form noValidate onSubmit={handleSubmit(updateHandler)} id={FORM_ID}>
          <Stack direction={variants('column', 'row')} spacing={6} flexWrap='wrap'>
            <Flex direction='column' flexBasis={groupSize} mr={variants(0, 4)}>
              {InfoFields.map((field) => (
                <Field key={field.id} {...field} />
              ))}
            </Flex>
            <Flex direction='column' flexBasis={groupSize} mr={variants(0, 4)}>
              {passwordFields.map((field) => (
                <Field key={field.id} {...field} />
              ))}
            </Flex>
          </Stack>
        </form>
      </CardBody>
      <Divider />
      <CardFooter>
        <Button
          colorScheme='blue'
          isDisabled={!isValid || !isDirty}
          isLoading={updateResult.isLoading}
          type='submit'
          form={FORM_ID}
        >
          {t(d.Update)}
        </Button>
      </CardFooter>
    </Card>
  )
}

function Field({ isError, label, placeholder, defaultValue, type, id, validate, errorMessage, register }: TField) {
  return (
    <FormControl isInvalid={isError} mb={4}>
      <FormLabel>{label}</FormLabel>
      <Input id={id} type={type} defaultValue={defaultValue} placeholder={placeholder} {...register(id, validate)} />
      <FormErrorMessage>{isError && errorMessage}</FormErrorMessage>
    </FormControl>
  )
}
