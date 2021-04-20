import { buildConfig } from './rollup.config.base';

export default buildConfig('./src/embeds/wh.ts', 'public/build/embed.wh.js', 'embed.wh.css');
