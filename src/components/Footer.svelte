<script lang="ts">
    import svgs from '../svg';
    import ScrollableX from './ScrollableX.svelte';
    export var currentSection: string;

    const dataSources = {
        "State of the climate":
            "Data from the EDGAR v5.0 Database on Global Greenhouse Gas Emissions and the World Environment Situation Room",

        "What's happening":
            "Data from NASA Earth Observations and the World Environment Situation Room, Global Climate Risk Index 2021 by GermanWatch",

        "Climate action progress":
            "Data from the EDGAR v5.0 Database on Global Greenhouse Gas Emissions, Climate Watch and the Pew Research Center"
    }

    $: datasource = dataSources[currentSection] || 'Unknown';
</script>

<footer>
    <div class="footer-content">
        <ScrollableX>
            <div class="datasource">
                <div class="datasource-icon">{@html svgs.dataSource}</div>
                <span>{datasource}</span>
            </div>
        </ScrollableX>
    </div>
</footer>

<style>
    footer {
        background: #e6e6e6;
    }
    .footer-content {
        max-width: 1100px;
        margin: auto;
    }

    .datasource {
        height: 50px;
        font-size: 14px;
        display: flex;
        align-items: center;
        color: #666666;
        text-align: left;
        font-weight: 300;
        white-space: nowrap;
    }

    .datasource span {
        padding-right: 10px;
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
    @media (max-width: 700px) {
        .datasource {
            height: 40px;
            font-size: 12px;
        }

        .datasource-icon {
            flex: 0 0 20px;
            top: 0;
        }
    }
</style>