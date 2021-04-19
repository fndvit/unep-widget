<script lang="ts">
    import { onMount } from "svelte";
    import type { NDCData } from './data';
    import { getCountryBaseData, ndc } from "./data";
    import { getXRandom } from "./util";

    var ndcs: NDCData[];

    onMount(async () => {
        const ndcData = await ndc;
        const usableNdcs = ndcData.filter(ndc => {
            return ndc.ghg_target
                && ndc.ghg_target !== "No GHG target"
                && ndc.ghg_target !== "No data";
        })
        ndcs = getXRandom(usableNdcs, 4);
    })

    function getCountryName(code: string) {
        const baseData = getCountryBaseData(code);
        return baseData ? baseData.name : code;
    }

    function capitalizeSentence(sentence: string) {
        return sentence.charAt(0).toUpperCase() + sentence.slice(1)
    }

    function translateSubmission(sentence: string) {
        if (sentence === 'Only INDC') {
            return 'Only the Intended NDC (INDC)';
        } else {
            return sentence;
        }
    }

</script>

{#if ndcs}
    {#each ndcs as ndc,i}
    <div class="ndc">
        <div class="bar bg--{ndc.category}"></div>
        <p><b>{getCountryName(ndc.iso)}</b></p>
        <p class='label'>{ i > 0 ? '' : 'Latest submission:'} {translateSubmission(ndc.latest_submission)}</p>
        <p>{capitalizeSentence(ndc.ghg_target)}</p>
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

    .label {
        color: #808080;
        font-size:14px;
        font-weight: 400;
        padding-bottom:12px;
    }

    p {
        margin:0;
        padding:0;
    }


    .ndc :global(.bg--ndc-second2020).bar { width: 90%; }
    .ndc :global(.bg--ndc-first2020).bar { width: 60%; }
    .ndc :global(.bg--ndc-indc).bar { width: 15%; }
    .ndc :global(.bg--ndc-first).bar { width: 30%; }
    .ndc :global(.bg--ndc-no-submission).bar { width: 5%; }

    .ndc :global(.bg--ndc-unknown).bar  { width: 5%; }

</style>