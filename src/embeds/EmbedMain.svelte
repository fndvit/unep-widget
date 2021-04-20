<script lang="ts">
    import GHGEmbed from './GHGEmbed.svelte';
    import PewEmbed from './PewEmbed.svelte';
    import WHEmbed from './WHEmbed.svelte';
    export var view: string;

    const ghgembeds = ["total", "percapita", "trends", "ndc"]
    const whembeds = ["temp", "ocean", "fires"]

</script>

{#if ghgembeds.indexOf(view) !== -1 }
    <GHGEmbed {view} />
{:else if whembeds.indexOf(view) !== -1}
    <WHEmbed {view} />
{:else if view === 'publicopinion'}
    <PewEmbed />
{/if}