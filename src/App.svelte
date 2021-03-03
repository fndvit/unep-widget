<script lang="ts">
    import Page1 from './Page1.svelte';
    import MainNav from './MainNav.svelte';
    import MainNavButton from './MainNavButton.svelte';
</script>

<div class="widget">
    <div class="content">
        <div class="navcontainer">
            <MainNav>
                <MainNavButton icon="test" selected={true}>State of the climate</MainNavButton>
                <MainNavButton icon="test">What's happening</MainNavButton>
                <MainNavButton icon="test">Climate action progress</MainNavButton>
            </MainNav>
        </div>
        <div>
            <Page1/>
        </div>
    </div>
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400&display=swap');

    :global(body) {
        padding: 0;
    }
    .widget {
        text-align: center;
        margin: 0 auto;
        font-family: 'Roboto', sans-serif;
        background-color: #F3F3F3;
    }
    .navcontainer {
        position: absolute;
        right: 100%;
        width: 200px;
    }
    .content {
        max-width: 1200px;
        margin: auto;
        position: relative;
    }
</style>