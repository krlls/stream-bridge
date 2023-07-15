import { get, isFunction } from 'lodash'

export const strategy =
  <T extends { prototype: any }>(required: string, method: string) =>
  ({ prototype }: T) => {
    const propertyDescriptors = Object.getOwnPropertyDescriptors(prototype)

    for (const propertyName in propertyDescriptors) {
      const descriptor = propertyDescriptors[propertyName]

      if (!isFunction(descriptor.value) || ['constructor', method].includes(propertyName)) {
        continue
      }

      const originalMethod = descriptor.value

      descriptor.value = function <T extends []>(...args: T) {
        if (!get(this, required)) {
          throw new Error(`Before calling ${propertyName}() instance must be initialized with ${method}()`)
        }

        return originalMethod.apply(this, args)
      }

      Object.defineProperty(prototype, propertyName, descriptor)
    }
  }
