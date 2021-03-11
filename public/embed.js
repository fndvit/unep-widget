var script = document.currentScript;

function getIframePath() {
	const currentScript = document.currentScript;
	const urlParts = currentScript.src.split('/');
	const urlPath = urlParts.slice(0, -1).join('/');
	return `${urlPath}/embed.html`;
}

function injectIframe() {
    // TODO: only load this embed on UNEP domain ??

	var iframe = document.createElement('iframe');
    iframe.src = getIframePath();
    iframe.style.width = "100%";
    iframe.style.height = "760px";
    iframe.style.border = 0;
    iframe.style.margin = 0;
    iframe.style.padding = 0;
	script.parentNode.insertBefore(iframe, script);
}

injectIframe();