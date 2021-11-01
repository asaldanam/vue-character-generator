import { wrapProperty } from '@nuxtjs/composition-api'
import { accessorType } from '~/store'

const useAccessor = (): typeof accessorType =>
  wrapProperty('$accessor', false)()

export default useAccessor
