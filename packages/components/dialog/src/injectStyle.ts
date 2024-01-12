import {injectStyle} from "./../../../helper/dom-util/src"
export const injectStyles = () =>{
    const newStyles = `[data-fx-modal][data-state="open"] {display: flex;}[data-fx-modal][data-state="close"]{display: none;} [data-fx-modal][data-state="open"] [data-modal-content] { animation-fill-mode: both;animation: var(--un-modal-animation);-webkit-animation: var(--un-modal-animation);} [data-fx-modal] [data-modal-content][data-state="close"]{animation: var(--un-modal-animation);-webkit-animation: var(--un-modal-animation);} [data-modal-overlay]{position: fixed;inset: 0;}`
    injectStyle({
        newStyles: newStyles,
        identifier: "[data-fx-modal]"
    })
}