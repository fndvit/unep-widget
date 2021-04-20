<script lang="ts">
    import PewSurvey from '../maps/PewSurvey.svelte';
    import BaseEmbed from './BaseEmbed.svelte'
</script>

<BaseEmbed
    header="Public awareness and concern must catalyze political action"
    footer="pew-embed"
    view="pew-embed">

    <slot slot="viz">
        <PewSurvey />
    </slot>

</BaseEmbed>
