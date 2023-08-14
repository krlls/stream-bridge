import { useImportToast } from './useImportToast.ts'
import { useLocalization } from './useLocalization.ts'

export const useUpdateProfileToast = (isSuccess: boolean, isError: boolean) => {
  const { t, d } = useLocalization()

  useImportToast(
    {
      isSuccess: isSuccess,
      isError: isError,
    },
    {
      title: {
        error: t(d.UpdateProfileError),
        success: t(d.UpdateProfileSuccess),
      },
      description: {
        error: t(d.UpdateProfileErrorMessage),
        success: t(d.UpdateProfileSuccessMessage),
      },
    },
  )
}
