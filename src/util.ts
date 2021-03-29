export function throttle(fn, wait) {
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
