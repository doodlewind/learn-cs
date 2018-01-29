import { loadResource } from './loader'
import { read } from './reader'

loadResource('red-blue.gif').then(read)
