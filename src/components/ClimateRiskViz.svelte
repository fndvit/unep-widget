<script lang="ts">
    import type { CRIData } from '../data';
    import ClimateRiskSvg from './ClimateRiskSvg.svelte';

    export var data: CRIData;
    export var header: boolean = false;

    function ordinal(i: number): string {
        let j = i % 10,
            k = i % 100;
        if (j == 1 && k != 11) return i + "st";
        if (j == 2 && k != 12) return i + "nd";
        if (j == 3 && k != 13) return i + "rd";
        return i + "th";
    }

    // const country = getCountryBaseData(data.code);
</script>

<div>
    {#if header}
    <div class="header">
        <span>Least at risk</span>
        <span>Most</span>
    </div>
    {/if}

    <ClimateRiskSvg data={data} header={header} />
    <div>
        <p>
            <b>{data.country}</b> has a CRI score of {data.cri_score} and ranks {ordinal(data.cri_rank)} overall in the index. In 2019, it ranks {ordinal(data.fatalities_in_2019)} in climate-related deaths{ data.fatalities_in_2019 === data.fatalities_per_100000_inhabitants? '': ` —${ordinal(data.fatalities_per_100000_inhabitants)} when adjusted per population`}; and {ordinal(data.losses_in_millions_usd)} in economic loss{ data.losses_in_millions_usd === data.losses_per_unit_gdp_percentage? '': ` —${ordinal(data.losses_per_unit_gdp_percentage)} when adjusted per GDP`}.
        </p>
    </div>
</div>

<style>
    p {
        font-size: 16px;
        line-height: 24px;
        color: #222;
        margin: 0;
        font-weight:300;
    }

    p b {
        color: black;
    }

    .header {
        position: relative;
        font-size: 14px;
        color: #999999;
        font-weight: 500;
    }

    .header span:nth-child(1) {
        position: absolute;
        bottom: 100%;
        left: 0;
        margin-bottom: 8px;
    }
    .header span:nth-child(2) {
        position: absolute;
        bottom: 100%;
        right: 0;
        margin-bottom: 8px;
    }

</style>