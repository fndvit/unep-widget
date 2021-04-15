<script lang="ts">
    import { IframeResizingContainer } from './components';
    import MainViz from './MainViz.svelte';

</script>

<IframeResizingContainer>
    <MainViz />
</IframeResizingContainer>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap');

    :global(body) {
        padding: 0;
        text-align: left;
        margin: 0;
        font-family: 'Roboto', sans-serif;
        background-color: #F3F3F3;
        font-size: 24px;
    }

</style>