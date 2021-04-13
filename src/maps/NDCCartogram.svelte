<script lang="ts">
    import type { CountryDataPoint } from './DemersCartogram.svelte';
    import {default as countries} from '../data/countries.json';
    import DemersCartogram from './DemersCartogram.svelte';
    import {ghg, ndc, endYear} from '../data';
    import { createLookup } from '../util';
    import { onMount } from 'svelte';
    import CartogramLegend from './CartogramLegend.svelte';

    let loaded: boolean = false;

    const helpText = {
        code: "DEU",
        text: "Each square represents a country, scaled by its emissions"
    };

    var dataset: CountryDataPoint[];
    var getCategory: (country: CountryDataPoint) => string;
    var getHoverText: (country: CountryDataPoint) => string;

    const legend = [
        { text: "Second 2020 NDC", class: "ndc-second2020" },
        { text: "First 2020 NDC", class: "ndc-first2020" },
        { text: "Only First NDC", class: "ndc-first" },
        { text: "Only INDC", class: "ndc-indc" },
        { text: "Nothing submitted", class: "ndc-nosubmission" }
    ]

    var legendHighlight = null;


    const ndcCategories: {category: string, re: RegExp}[] = [
        {
            category: 'ndc-first2020',
            re: /^2020 NDC ((\(First NDC\))|(\(Updated First NDC\)))/
        },
        {
            category: 'ndc-second2020',
            re: /^2020 NDC ((\(Second NDC\))|(\(Updated Second NDC\)))/
        },
        {
            category: 'ndc-indc',
            re: /^Only INDC/
        },
        {
            category: 'ndc-first',
            re: /^Only First NDC/
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

        const uppercaseFirstLetter = (str:string) => str.charAt(0).toUpperCase() + str.slice(1)
        getHoverText = (c: CountryDataPoint) => {
            const ndc = ndcLookup[c.code];
            if (!ndc) return `<b>${c.name}</b><br/>No NDC data`;
            return `<b>${c.name}</b><br/>${uppercaseFirstLetter(ndc.ghg_target)}`;
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
        <div class="legend">
            <CartogramLegend categories={legend} highlight={legendHighlight}/>
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
        left: 0;
    }

</style>
