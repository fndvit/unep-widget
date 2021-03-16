<div class="charts">
    <slot/>
</div>

<style>

    .charts {
        position: relative;
        z-index: 5;
        padding-left: 20px;
        /* TODO: fixed height? */
    }

    .charts-row:after {
        content: "";
        clear: both;
        display: table;
    }

    .charts-row > :global(*) {
        float: left;
        width: calc(25% - 12px);
        margin-right: 16px;
    }

    .charts-row > :global(*:last-child) {
        margin: 0;
    }

</style>