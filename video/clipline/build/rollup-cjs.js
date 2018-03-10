import config from './rollup'

config.output = {
  file: './lib/index.js',
  format: 'cjs',
  name: 'Clipline',
  sourcemap: true
}

export default config
