import { buildConfig } from './rollup.config.base';

export default buildConfig('./src/main.ts', 'public/build/bundle.js', 'bundle.css');