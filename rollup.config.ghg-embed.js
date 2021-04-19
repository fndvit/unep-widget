import { buildConfig } from './rollup.config.base';

export default buildConfig('./src/embeds/ghg.ts', 'public/build/embed.ghg.js', 'embed.ghg.css');
