<script lang="ts">
    import type { CRIData } from '../data';
    import ClimateRiskSvg from './ClimateRiskSvg.svelte';
    import { getCountryBaseData } from '../data';

    export var data: CRIData;
    export var header: boolean = false;

    // const country = getCountryBaseData(data.code);
</script>

<div>
    {#if header}
    <div class="header">
        <span>Least at risk</span>
        <span>Most</span>
    </div>
    {/if}

    <ClimateRiskSvg data={data} />
    <div>
        <p>
            <b>{data.country}</b> ranks {data.cri_rank} in the Climate Risk Index. In 2018, it recorded x fatalities and a x loss in Gross Domestic Product.
        </p>
    </div>
</div>

<style>
    p {
        font-size: 16px;
        line-height: 24px;
        color: #222;
        margin: 0;
        text-align: left;
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