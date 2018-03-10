import config from './rollup'

config.output = {
  file: './lib/clipline.js',
  format: 'umd',
  name: 'Clipline',
  sourcemap: true
}

export default config
