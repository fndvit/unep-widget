<script lang="ts">
    interface LegendItem {
        text: string
        class: string
    }
    export var categories: LegendItem[];
    export var highlight: LegendItem;
</script>

<ul class="legend" class:highlight-mode={highlight}>
    {#each categories as category}
    <li class="legend-item" class:highlight={category === highlight}>
        <span class="icon bg--{category.class}"></span>
        <span class="text">{category.text}</span>
    </li>
    {/each}
</ul>

<style>
    .legend {
        list-style-type: none;
        margin: 0;
        padding: 0;
        line-height: 24px;
    }
    .legend-item {
        font-size: 14px;
        line-height: 20px;
        text-indent: 0;
        margin-right: 20px;
        padding-left: 20px;
        position: relative;
        transition: all 0.3s;
        display: inline-block;
    }
    .highlight-mode .legend-item {
        transition-delay: 0s;
    }
    .highlight-mode .legend-item:not(.highlight) {
        opacity: 0.5;
    }
    .icon {
        display: inline-block;
        width: 15px;
        height: 15px;
        border-radius: 4px;
        position: absolute;
        left: 0px;
        top: 1px;
    }

</style>