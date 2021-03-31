<script lang="ts">
    import svgs from '../svg';
    export var currentSection: string;

    function getDatasource(_currentSection: string) {
        if (_currentSection === "State of the climate") {
            return "Data from the EDGAR v5.0 Database on Global Greenhouse Gas Emissions and the World Environment Situation Room";
        } else if (_currentSection === "What's happening") {
            return "Data from NASA Earth Observations, Global Climate Risk Index 2021 by GermanWatch, and the World Environment Situation Room"
        }
    }

    $: datasource = getDatasource(currentSection);
</script>

<footer>
    <div class="datasource">
        <div class="datasource-icon">{@html svgs.dataSource} </div>
        <span>{datasource}</span>

    </div>
</footer>

<style>
    footer {
        height: 50px;
        background: #e6e6e6;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .datasource {
        color: #666666;
        font-size: 14px;
        text-align: left;
        font-weight: 300;
        flex: 0 0 1100px;
        display: flex;
        align-items: center;
    }

    .datasource-icon {
        flex: 0 0 28px;
        padding-left: 8px;
        margin-right: 6px;
        position: relative;
        top: 2px;
    }
    .datasource-icon :global(svg *) {
        stroke: #666666;
    }
</style>