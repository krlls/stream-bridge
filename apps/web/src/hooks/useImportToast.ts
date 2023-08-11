import { useToast } from '@chakra-ui/react'
import { useEffect } from 'react'

export const useImportToast = (
  { isSuccess, isError }: { isSuccess: boolean, isError: boolean },
  text: {
    title: { error: string, success: string },
    description: { error: string, success: string },
  },
) => {
  const toast = useToast()

  useEffect(() => {
    if (!isSuccess && !isError) {
      return
    }

    toast({
      title: isSuccess ? text.title.success : text.title.error,
      description: isSuccess ? text.description.success : text.description.error,
      status: isSuccess ? 'success' : 'error',
      duration: 5000,
      isClosable: true,
    })
  }, [
    isSuccess,
    isError,
    toast,
    text.title.success,
    text.title.error,
    text.description.success,
    text.description.error,
  ])
}
