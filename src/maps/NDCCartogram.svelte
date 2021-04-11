<script lang="ts">
    import type { CountryDataPoint } from './DemersCartogram.svelte';
    import {default as countries} from '../data/countries.json';
    import DemersCartogram from './DemersCartogram.svelte';
    import {ghg, ndc, endYear} from '../data';
    import { createLookup } from '../util';
    import { onMount } from 'svelte';
    // import CartogramLegend from './CartogramLegend.svelte';

    let loaded: boolean = false;

    const helpText = {
        code: "DEU",
        text: "Each square represents a country, scaled by its emissions"
    };

    var dataset: CountryDataPoint[];
    var getCategory: (country: CountryDataPoint) => string;
    var getHoverText: (country: CountryDataPoint) => string;


    const ndcCategories: {category: string, re: RegExp, hoverTextFn: (c: CountryDataPoint) => string}[] = [
        {
            category: 'ndc-first2020',
            re: /^2020 NDC ((\(First NDC\))|(\(Updated First NDC\)))/,
            hoverTextFn: c => `${c.name} have submitted their first 2020 NDC`
        },
        {
            category: 'ndc-second2020',
            re: /^2020 NDC ((\(Second NDC\))|(\(Updated Second NDC\)))/,
            hoverTextFn: c => `${c.name} have submitted their second 2020 NDC`
        },
        {
            category: 'ndc-indc',
            re: /^Only INDC/,
            hoverTextFn: c => `${c.name} have only submitted their INDC`
        },
        {
            category: 'ndc-first',
            re: /^Only First NDC/,
            hoverTextFn: c => `${c.name} have only submitted their first NDC`
        }
    ]

    onMount(async () => {
        const ghgData = await ghg;
        const ndcData = await ndc;

        const ghgDataLookup = createLookup(ghgData, d => d.code, d => d)
        const ndcLookup = createLookup(ndcData, d => d.iso, d => d);

        getCategory = c => {
            const ndc = ndcLookup[c.code];
            if (!ndc) return 'ndc-nodata';
            const ndcCategory = ndcCategories.find(d => d.re.test(ndc.latest_submission))
            if (!ndcCategory) return 'ndc-unknown';
            return ndcCategory.category
        }

        getHoverText = (c: CountryDataPoint) => {
            const ndc = ndcLookup[c.code];
            if (!ndc) return `${c.name} has no NDC data`;
            const ndcCategory = ndcCategories.find(d => d.re.test(ndc.latest_submission));
            if (!ndcCategory) return `${c.name} unknown category`;
            return ndcCategory.hoverTextFn(c);
        }

        countries.forEach(d => {
            if (!ghgDataLookup[d.code]) console.warn(`Missing GHG data for ${d.name} (${d.code})`);
        })

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

</script>

{#if loaded}
    <div class="cartogram-container">
        <DemersCartogram data={dataset}
            nodeSize={80}
            domain={[740, 420]}
            offset={[0,0]}
            trendsMode={false}
            categoryFn={getCategory}
            hoverTextFn={getHoverText}
            helpText={helpText}
        />
        <div class="legend">
            <!-- <CartogramLegend/> -->
        </div>
    </div>
{/if}

<style>
    .cartogram-container {
        box-sizing: border-box;
        padding-bottom: 20px;
        flex: 0 0 100%;
    }

    .legend {
        position: absolute;
        bottom: 0;
        left: 50px;
    }

</style>
