<script lang="ts">
    import type { CountryDataPoint } from './DemersCartogram.svelte';
    import {default as countries} from '../data/countries.json';
    import DemersCartogram from './DemersCartogram.svelte';
    import { ghg, ndc, endYear } from '../data';
    import { createLookup } from '../util';
    import { onMount } from 'svelte';
    import CartogramLegend from './CartogramLegend.svelte';

    let loaded: boolean = false;

    const helpText = {
        code: "BRA",
        text: "Each square represents a country, scaled by its emissions"
    };

    var dataset: CountryDataPoint[];
    var getCategory: (country: CountryDataPoint) => string;
    var getHoverText: (country: CountryDataPoint) => string;

    const legend = [
        { text: "Nothing submitted", class: "ndc-nosubmission" },
        { text: "Only INDC", class: "ndc-indc" },
        { text: "Only First NDC", class: "ndc-first" },
        { text: "First 2020 NDC", class: "ndc-first2020" },
        { text: "Second 2020 NDC", class: "ndc-second2020" }
    ]

    var legendHighlight = null;

    onMount(async () => {
        const ghgData = await ghg;
        const ndcData = await ndc;

        const ghgDataLookup = createLookup(ghgData, d => d.code, d => d)
        const ndcLookup = createLookup(ndcData, d => d.iso, d => d);

        getCategory = c => {
            const ndc = ndcLookup[c.code];
            if (!ndc) return 'ndc-nodata';
            return ndc.category;
        }

        const uppercaseFirstLetter = (str:string) => str.charAt(0).toUpperCase() + str.slice(1)
        getHoverText = (c: CountryDataPoint) => {
            const ndc = ndcLookup[c.code];
            if (!ndc) return `<b>${c.name}</b><br/>No NDC data`;
            return `<b>${c.name}</b> ${uppercaseFirstLetter(ndc.ghg_target)}`;
        }

        dataset = countries
            .filter(d => ghgDataLookup[d.code]) // TODO: hack while we have inconsistent/mock data
            .map(d => {
                return {
                    ...d, ...d.total,
                    value: ghgDataLookup[d.code].emissions[`${endYear}`]
                }
            })

        loaded = true;
	});

    function onHoverFn(c: CountryDataPoint) {
        if (c) {
            const category = getCategory(c);
            legendHighlight = legend.find(l => l.class === category);
        } else {
            legendHighlight = null;
        }
    }

</script>

{#if loaded}
    <div class="cartogram-container">
        <DemersCartogram data={dataset}
            nodeSize={80}
            domain={[740, 420]}
            trendsMode={false}
            categoryFn={getCategory}
            hoverTextFn={getHoverText}
            onHoverFn={onHoverFn}
            helpText={helpText}
        />
        <div class="legend-container">
            <CartogramLegend categories={legend} highlight={legendHighlight}/>
        </div>
    </div>
{/if}

<style>
    .cartogram-container {
        box-sizing: border-box;
        flex: 0 0 100%;
        display: flex;
        flex-direction: column;
    }

    .legend-container {
        padding-top: 6px;
        padding-left: 10px;
    }

</style>
