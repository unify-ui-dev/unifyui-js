import { find, findAll } from "@unifyui-js/helpers";
import { AccordionItemMetadata } from "./types";

/**
 * Retrieves metadata (trigger, content, and value) of the accordion item.
 * @param {HTMLElement} item - The accordion item.
 * @returns {AccordionItemMetadata} - Metadata of the accordion item.
 */
function getAccordionItemMetadata(item: HTMLElement): AccordionItemMetadata {
    const trigger = find({ selector: "[data-accordion-trigger]", parentElement: item })
    const content = find({ selector: "[data-accordion-content]", parentElement: item })
    const value = item.getAttribute("data-accordion-value") ?? "";
    const isOpened = item.getAttribute("aria-expanded") === "true"

    if (!(trigger instanceof HTMLButtonElement)) throw new Error("The element does't have a Valid Trigger")
    if (!(content instanceof HTMLDivElement)) throw new Error("No Valid Content Element")

    return { accordionTriggerElement: trigger, accordionContentElement: content, accordionItemValue: value, isItemExpanded: isOpened };
}

const getElementExceptActivedAndAlwaysOpen = (accordion: HTMLElement, activeValue: string) =>
    findAll({ selector: `[data-accordion-item]:not([data-always-open]):not([data-accordion-value="${activeValue}"])`, parentElement: accordion })

const getAllAlwaysOpen = (accordion: HTMLElement) => findAll({ selector: "[data-always-open]", parentElement: accordion })

export {
    getAccordionItemMetadata,
    getElementExceptActivedAndAlwaysOpen,
    getAllAlwaysOpen
}