<script lang="ts">
    import svgs from '../svg';
    import BaseFooter from './BaseFooter.svelte';
    export var currentSection: string;

    const dataSources = {
        "State of the climate":
            "Data from the <a href='https://edgar.jrc.ec.europa.eu/booklet/EDGARv5.0_FT2018_fossil_CO2_GHG_booklet2019.xls' target='_blank'>EDGAR v5.0 Database on Global Greenhouse Gas Emissions</a> and the <a href='https://wesr.unep.org/topic/index/5' target='_blank'>World Environment Situation Room</a>",

        "What's happening":
            "Data from <a href='https://neo.sci.gsfc.nasa.gov/dataset_index.php' target='_blank'>NASA Earth Observations</a> and the <a href='https://wesr.unep.org/topic/index/5' target='_blank'>World Environment Situation Room</a>, <a href='https://germanwatch.org/en/19777' target='_blank'>Global Climate Risk Index 2021</a> by GermanWatch",

        "Climate action progress":
            "Data from the <a href='https://edgar.jrc.ec.europa.eu/booklet/EDGARv5.0_FT2018_fossil_CO2_GHG_booklet2019.xls' target='_blank'>EDGAR v5.0 Database on Global Greenhouse Gas Emissions</a>, <a href='https://www.climatewatchdata.org/ndcs-explore' target='_blank'>Climate Watch</a> and the <a href='https://www.pewresearch.org/global/2019/02/10/climate-change-still-seen-as-the-top-global-threat-but-cyberattacks-a-rising-concern/' target='_blank'>Pew Research Center</a>",

        "ndc-embed":
            "Data from the <a href='https://edgar.jrc.ec.europa.eu/booklet/EDGARv5.0_FT2018_fossil_CO2_GHG_booklet2019.xls' target='_blank'>EDGAR v5.0 Database on Global Greenhouse Gas Emissions</a> and <a href='https://www.climatewatchdata.org/ndcs-explore' target='_blank'>Climate Watch</a>"
    }

    $: datasource = dataSources[currentSection] || 'Unknown';
</script>

<BaseFooter icon={svgs.dataSource}>
    <slot slot="text">{@html datasource}</slot>
</BaseFooter>
