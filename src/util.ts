export function throttle(fn: Function, wait) {
    let isCalled = false;

    return function(...args){
        if (!isCalled){
            fn(...args);
            isCalled = true;
            setTimeout(function(){
                isCalled = false;
            }, wait)
        }
    };
}

export function trailingDebounce(fn: Function, delay: number) {
    var timeout: number;
    const _fn = function() {
        if (timeout) window.clearTimeout(timeout);
        timeout = window.setTimeout(fn, delay);
    }
    _fn.cancel = () => window.clearTimeout(timeout);
    return _fn;
}
