import EmbedMain from './EmbedMain.svelte';

var script = document.currentScript;
const dataView = script.getAttribute('data-view');
const embeds = [
	"total", "percapita", "trends", "ndc",
	"temp", "ocean", "fires",
	"publicopinion"
];

if (embeds.indexOf(dataView) === -1) {
	throw Error("unknown embed");
}


const app = new EmbedMain({
	target: document.body,
	props: { view: dataView }
});

export default app;