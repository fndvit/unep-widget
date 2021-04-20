<script lang="ts">
    import svgs from '../svg';
    import BaseFooter from './BaseFooter.svelte';
    export var currentSection: string;

    const edgar = "the <a href='https://edgar.jrc.ec.europa.eu/booklet/EDGARv5.0_FT2018_fossil_CO2_GHG_booklet2019.xls' target='_blank'>EDGAR v5.0 Database on Global Greenhouse Gas Emissions</a>";
    const wesr = "the <a href='https://wesr.unep.org/topic/index/5' target='_blank'>World Environment Situation Room</a>";
    const nasa = "<a href='https://neo.sci.gsfc.nasa.gov/dataset_index.php' target='_blank'>NASA Earth Observations</a>";
    const cri = "<a href='https://germanwatch.org/en/19777' target='_blank'>Global Climate Risk Index 2021</a> by GermanWatch";
    const climateWatch = "<a href='https://www.climatewatchdata.org/ndcs-explore' target='_blank'>Climate Watch</a>";
    const pew = "the <a href='https://www.pewresearch.org/global/2019/02/10/climate-change-still-seen-as-the-top-global-threat-but-cyberattacks-a-rising-concern/' target='_blank'>Pew Research Center</a>";

    const dataSources = {
        "State of the climate":     `Data from ${edgar} and ${wesr}`,
        "What's happening":         `Data from ${nasa}, ${wesr} and ${cri}`,
        "Climate action progress":  `Data from the ${edgar}, ${climateWatch} and ${pew}`,
        "ndc-embed":                `Data from ${edgar} and ${climateWatch}`,
        "pew-embed":                `Data from ${pew}`,
    };

    $: datasource = dataSources[currentSection] || 'Unknown';
</script>

<BaseFooter icon={svgs.dataSource}>
    <div slot="text">{@html datasource}</div>
</BaseFooter>
