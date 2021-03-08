<script lang="ts" context="module">

export interface MenuOption {
    text: string;
    icon: string;
}
</script>

<script lang="ts">
    import MainNavButton from './MainNavButton.svelte';


    export let options: MenuOption[];
    export let selected: MenuOption;
    export let onchange: (option: MenuOption) => void;
</script>

<nav>
    <div class="mainnavbuttons">
        {#each options as option}
        <MainNavButton icon={option.icon} selected={selected === option} onclick={() => onchange(option)}>{option.text}</MainNavButton>
        {/each}
    </div>
</nav>

<style>
</style>