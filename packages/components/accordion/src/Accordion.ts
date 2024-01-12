
import { areValidHTMLElements, find, findAll } from "@unifyui-js/dom_util";
import { AccordionOptions, AccordionParams } from "./types";
import { activeAlwaysOpen, activateDefaultAccordionItem, closeOtherAccordionItems, initItems, expandAccordionItem } from "./helpers";

/**
* Accordion Component Class
*/
class Accordion {
    private accordionElement: HTMLElement
    private options: AccordionOptions
    private items: HTMLElement[]
    private preventFromClosingAll: boolean
    private allowTriggerOnFocus: boolean
    private accordionType_: string
    private defaultItemValue: string
    private defaultItem: HTMLElement
    public instance: Accordion

    public showItem: ({ itemSelector }: { itemSelector: string }) => void
    public hideItem: ({ itemSelector }: { itemSelector: string }) => void

    /**
     * Creates an accordion with the specified parameters.
     */
    constructor({ accordionElement, options = {} }: AccordionParams) {
        this.instance = this
        if (!(accordionElement instanceof HTMLElement))
            throw new Error("Container not a valid HTML elemnt")
        this.accordionElement = accordionElement
        this.items = findAll({ selector: "[data-accordion-item]", parentElement: accordionElement })

        if (this.items && !areValidHTMLElements(this.items)) throw new Error("No item find")
        this.options = options

        const { defaultValue, accordionType, preventClosingAll = false, allowTriggerOnFocus = false } = this.options
        this.preventFromClosingAll = preventClosingAll || (this.accordionElement.hasAttribute("data-prevent-closing-all") && this.accordionElement.getAttribute("data-prevent-closing-all") !== "false") || false
        this.allowTriggerOnFocus = allowTriggerOnFocus || this.accordionElement.hasAttribute("data-allow-trigger-on-focus") && this.accordionElement.getAttribute("data-allow-trigger-on-focus") !== "false" || false
        this.accordionType_ = accordionType || this.accordionElement.getAttribute("data-accordion-type") || "single"
        this.defaultItemValue = defaultValue || this.accordionElement.getAttribute("data-default-value") || ""
        this.defaultItem = find({ selector: `[data-accordion-item][data-accordion-value="${this.defaultItemValue}"]`, parentElement: accordionElement }) as HTMLElement


        this.showItem = ({ itemSelector }: { itemSelector: string }) => {
            const accordionItem = find({
                selector: `${itemSelector}`,
                parentElement: this.accordionElement
            })
            if (!(accordionItem instanceof HTMLElement)) throw new Error("Providied element is not a valid HTML element")
            expandAccordionItem(accordionItem, "open")
        }

        this.hideItem = ({ itemSelector }: { itemSelector: string }) => {
            const accordionItem = find({
                selector: `${itemSelector}`,
                parentElement: this.accordionElement
            })
            if (!(accordionItem instanceof HTMLElement)) throw new Error("Providied element is not a valid HTML element")
            expandAccordionItem(accordionItem, "close")
        }
        this.init()
    }

    private init() {
        activeAlwaysOpen(this.accordionElement)
        activateDefaultAccordionItem(this.defaultItem)
        closeOtherAccordionItems(this.accordionElement, this.defaultItemValue)
        initItems(this.accordionElement, this.accordionType_, this.preventFromClosingAll, this.allowTriggerOnFocus, this.options)
    }
}

export default Accordion