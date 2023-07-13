import { get, isFunction } from 'lodash'

export const strategy =
  <T extends { prototype: any }>(checkProp: string, method: string) =>
  ({ prototype }: T) => {
    const propertyDescriptors = Object.getOwnPropertyDescriptors(prototype)

    for (const propertyName in propertyDescriptors) {
      const descriptor = propertyDescriptors[propertyName]

      if (!isFunction(descriptor.value) || ['constructor', method].includes(propertyName)) {
        continue
      }

      const originalMethod = descriptor.value

      descriptor.value = function <T extends []>(...args: T) {
        if (!get(this, checkProp)) {
          throw new Error(`You must call the ${method}()`)
        }

        return originalMethod.apply(this, args)
      }

      Object.defineProperty(prototype, propertyName, descriptor)
    }
  }
