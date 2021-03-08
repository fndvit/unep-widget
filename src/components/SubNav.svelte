
<script lang="ts">
    import SubNavButton from './SubNavButton.svelte';
    interface MenuOption {
        text: string;
        icon: string;
    }
    export let options: MenuOption[];
    export let selected: MenuOption;
</script>

<nav>
    <div class="subnavbuttons">
        {#each options as option}
        <SubNavButton selected={selected === option} icon={option.icon} onclick={() => selected = option} >{option.text}</SubNavButton>
        {/each}
    </div>
</nav>

<style>
    .subnavbuttons {
        display: flex;
    }
</style>
