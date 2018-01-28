import { loadResource } from './loader'
import { getBlockMeta } from './utils'

loadResource('red-blue.gif').then(data => {
  getBlockMeta(data, 0)
})
