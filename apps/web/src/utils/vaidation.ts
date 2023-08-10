export const RegularEmailValidation = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

export const MinimalLength = (t: any, d: any) => {
  return { value: 1, message: t(d.MinimumLengthShould) }
}

export const MaximumLength = (t: any, d: any) => {
  return { value: 30, message: t(d.MaximumLengthShould) }
}
