import test from "./test.svg";
import arrowDown from './arrow-down.svg';
import arrowRight from './arrow-right.svg';
import arrowLeft from './arrow-left.svg';

import whatshappeningMain from './icons_whats-happening--main.svg';
import whatshappeningOcean from './icons_whats-happening--ocean.svg';
import whatshappeningFire from './icons_whats-happening--fire.svg';
import whatshappeningSurface from './icons_whats-happening--surface.svg';

import stateoftheclimateMain from './icons_state-of-the-climate--main.svg';
import stateoftheclimateEmissions from './icons_state-of-the-climate--total-emissions.svg';
import stateoftheclimatePerCapita from './icons_state-of-the-climate--per-capita.svg';
import stateoftheclimateTrends from './icons_state-of-the-climate--trends.svg';

import climateActionProgressMain from './icons_climate-action-progress--main.svg';
import climateActionProgressNdc from './icons_climate-action-progress--ndc.svg';
import climateActionProgressOpinion from './icons_climate-action-progress--opinion.svg';

import legendLand from './legend_land-anomaly.svg';
import legendSea from './legend_sea-temperature.svg';

import dataSource from './icons_data-source.svg';
import embed from './icons_embed.svg';

export default {
    test,
    dataSource,
    embed,
    arrows: {
        down: arrowDown,
        right: arrowRight,
        left: arrowLeft
    },
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
    },
    climateactionprogress: {
        main: climateActionProgressMain,
        ndc: climateActionProgressNdc,
        opinion: climateActionProgressOpinion
    },
    legends: {
        land: legendLand,
        sea: legendSea
    }
};
