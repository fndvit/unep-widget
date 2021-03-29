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
    iframe.style.height = 0;
    iframe.style.border = 0;
    iframe.style.margin = 0;
    iframe.style.padding = 0;
	script.parentNode.insertBefore(iframe, script);

    window.addEventListener('message', function(event) {
        if (event.data.type && event.data.type === 'unep-widget:resize') {
            var height = parseInt(event.data.value);
            iframe.style.height = height + "px";
        }
    }, false);

}

injectIframe();