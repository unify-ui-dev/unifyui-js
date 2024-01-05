export type AccordionOptions = {
    accordionType?: "single" | "multiple",
    defaultValue?: string,
    allowTriggerOnFocus?:boolean,
    preventClosingAll?:boolean
}

export type AccordionReturns = {
    show: () => void,
    hide: () => void
}

export type AccordionParams = {
    accordionElement: HTMLElement,
    selector?: string,
    options?: AccordionOptions
}

export type AccordionItemMetadata = {
    accordionTriggerElement: HTMLButtonElement,
    accordionContentElement: HTMLDivElement,
    accordionItemValue: string,
    isItemExpanded:boolean
}