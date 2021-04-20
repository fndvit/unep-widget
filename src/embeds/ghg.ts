import GHGEmbed from './GHGEmbed.svelte';

var script = document.currentScript;
const dataView = script.getAttribute('data-view');
const embeds = [ "total", "percapita", "trends" ];
const embed = embeds.indexOf(dataView) === -1 ? "total" : dataView;

const app = new GHGEmbed({
	target: document.body,
	props: {
		view: embed
	}
});

export default app;