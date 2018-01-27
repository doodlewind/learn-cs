import { loadResource } from './loader'

loadResource('red-blue.gif').then(data => {
  console.log(data)
})
