import { buildConfig } from './rollup.config.base';

export default buildConfig('./src/embeds/embed.ts', 'public/build/bundle.embed.js', 'bundle.embed.css');
