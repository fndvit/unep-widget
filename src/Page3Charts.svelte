<script lang="ts">
    import { onMount } from "svelte";
    import type { NDCData } from './data';
    import { getNDCCategory, getCountryBaseData, ndc } from "./data";
    import { getXRandom } from "./util";

    var ndcs: NDCData[];

    onMount(async () => {
        const ndcData = await ndc;
        ndcs = getXRandom(ndcData, 4);
    })

    function getCountryName(code: string) {
        const baseData = getCountryBaseData(code);
        return baseData ? baseData.name : code;
    }



</script>

{#if ndcs}
    {#each ndcs as ndc}
    <div class="ndc">
        <div class="bar bg--{getNDCCategory(ndc)}"></div>
        <b>{getCountryName(ndc.iso)}</b> {ndc.ghg_target}
    </div>
    {/each}
{/if}

<style>

    .ndc {
        margin-top:0;
        font-size: 16px;
        line-height: 24px;
        font-weight:300;
    }

    .ndc b {
        color:black;
        font-size: 18px;
        font-weight: 600;
    }

    .bar {
        height: 5px;
        border-radius: 5px;
        margin-bottom: 10px;
    }


    :global(.bg--ndc-second2020).bar { width: 100%; }
    :global(.bg--ndc-first2020).bar { width: 80%; }
    :global(.bg--ndc-indc).bar { width: 60%; }
    :global(.bg--ndc-first).bar { width: 40%; }
    :global(.bg--ndc-no-submission).bar { width: 20%; }

    :global(.bg--ndc-unknown).bar  { width: 100%; }

</style>