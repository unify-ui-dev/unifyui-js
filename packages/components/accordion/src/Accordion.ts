
import { areValidHTMLElements, find, findAll } from "@unifyui-js/helpers";
import { AccordionParams } from "./types";
import { activeAlwaysOpen, activateDefaultAccordionItem, closeOtherAccordionItems, initItems } from "./utils";


/**
 * Creates an accordion with the specified parameters.
 * @param {Object} AccordionParams - The HTML element that serves as the container for the accordion.
 * @param {Object} AccordionParams.options - Optional parameters for configuring the accordion.
 * @param {HTMLElement} AccordionParams.accordionElement
 * @returns An object with `show` and `hide` functions for controlling accordion item visibility.
 * @throws Throws an error if the container is not a valid HTML element or if no accordion items are found.
 */
const createAccordion = (
    { accordionElement, options = { } }: AccordionParams
) => {

    const items = findAll({ selector: "[data-accordion-item]", parentElement: accordionElement })

    if (!(accordionElement instanceof HTMLElement))
        throw new Error("Container not a valid HTML elemnt")

    if (items && !areValidHTMLElements(items)) throw new Error("No item find")

    const { defaultValue, accordionType, preventClosingAll = false, allowTriggerOnFocus=false } = options

    const preventFromClosingAll = preventClosingAll || (accordionElement.hasAttribute("data-prevent-closing-all") && accordionElement.getAttribute("data-prevent-closing-all") !== "false")

    const accordionType_ = accordionType || accordionElement.getAttribute("data-accordion-type") || "single"

    const defaultItemValue = defaultValue || accordionElement.getAttribute("data-default-value") as string

    const defaultItem = find({ selector: `[data-accordion-item][data-accordion-value="${defaultItemValue}"]`, parentElement: accordionElement }) as HTMLElement

    activeAlwaysOpen(accordionElement)
    activateDefaultAccordionItem(defaultItem)
    closeOtherAccordionItems(accordionElement, defaultItemValue)
    initItems(accordionElement, accordionType_, preventFromClosingAll, allowTriggerOnFocus)

    const show = ({accordionItem}:{accordionItem:HTMLElement}) =>{
        if(!(accordionItem instanceof HTMLElement)) throw new Error("Providied element is not a valid HTML element")

    }

    const hide = ({accordionItem}:{accordionItem:HTMLElement}) =>{
        if(!(accordionItem instanceof HTMLElement)) throw new Error("Providied element is not a valid HTML element")

    }

    return {
        show,
        hide
    }
}

export { createAccordion }