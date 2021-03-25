import test from "./test.svg";
import downarrow from './downarrow.svg';
import whatshappeningMain from './icons_whats-happening--main.svg';
import whatshappeningOcean from './icons_whats-happening--ocean.svg';
import whatshappeningFire from './icons_whats-happening--fire.svg';
import whatshappeningSurface from './icons_whats-happening--surface.svg';

import stateoftheclimateMain from './icons_state-of-the-climate--main.svg';
import stateoftheclimateEmissions from './icons_state-of-the-climate--total-emissions.svg';
import stateoftheclimatePerCapita from './icons_state-of-the-climate--per-capita.svg';
import stateoftheclimateTrends from './icons_state-of-the-climate--trends.svg';

export default {
    test, downarrow,
    stateoftheclimate: {
        main: stateoftheclimateMain,
        emissions: stateoftheclimateEmissions,
        percapita: stateoftheclimatePerCapita,
        trends: stateoftheclimateTrends
    },
    whatshappening: {
        main: whatshappeningMain,
        ocean: whatshappeningOcean,
        fire: whatshappeningFire,
        surface: whatshappeningSurface,
    }
};
