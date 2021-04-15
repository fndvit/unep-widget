<script lang="ts">
    import svgs from '../svg';
    import ScrollableX from './ScrollableX.svelte';
    export var currentSection: string;

    const dataSources = {
        "State of the climate":
            "Data from the <a href='https://edgar.jrc.ec.europa.eu/booklet/EDGARv5.0_FT2018_fossil_CO2_GHG_booklet2019.xls' target='_parent'>EDGAR v5.0 Database on Global Greenhouse Gas Emissions</a> and the World Environment Situation Room",

        "What's happening":
            "Data from <a href='https://neo.sci.gsfc.nasa.gov/dataset_index.php' target='_parent'>NASA Earth Observations</a> and the World Environment Situation Room, <a href='https://germanwatch.org/en/19777' target='_parent'>Global Climate Risk Index 2021</a> by GermanWatch",

        "Climate action progress":
            "Data from the <a href='https://edgar.jrc.ec.europa.eu/booklet/EDGARv5.0_FT2018_fossil_CO2_GHG_booklet2019.xls' target='_parent'>EDGAR v5.0 Database on Global Greenhouse Gas Emissions</a>, <a href='https://www.climatewatchdata.org/ndcs-explore' target='_parent'>Climate Watch</a> and the <a href='https://www.pewresearch.org/global/2019/02/10/climate-change-still-seen-as-the-top-global-threat-but-cyberattacks-a-rising-concern/' target='_parent'>Pew Research Center</a>"
    }

    $: datasource = dataSources[currentSection] || 'Unknown';
</script>

<footer>
    <div class="footer-content">
        <ScrollableX>
            <div class="datasource">
                <div class="datasource-icon">{@html svgs.dataSource}</div>
                <span>{@html datasource}</span>
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