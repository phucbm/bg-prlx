/**
 * Is jQuery element
 * @param element : HTMLElement
 * @returns {boolean}
 */
function isjQueryElement(element){
    return typeof jQuery !== 'undefined' && element instanceof jQuery;
}

/**
 * Get element offsets
 * https://github.com/jquery/jquery/blob/d0ce00cdfa680f1f0c38460bc51ea14079ae8b07/src/offset.js#L87
 * @param element : Element
 * @returns {{top: *, left: *}|{top: number, left: number}}
 */
function getOffset(element){
    if(!element.getClientRects().length){
        return {top: 0, left: 0};
    }

    const rect = element.getBoundingClientRect();
    const win = element.ownerDocument.defaultView;
    return {
        top: rect.top + win.pageYOffset,
        left: rect.left + win.pageXOffset
    };
}

export {isjQueryElement, getOffset};