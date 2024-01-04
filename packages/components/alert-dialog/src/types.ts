export type ModalContentAnimations = {
    enterAnimation: string,
    exitAnimation?: string,
}


export type ModalOptions = {
    animateContent?: ModalContentAnimations
    overlayClass?: string
    preventCloseModal?: boolean
    allowBodyScroll?: boolean
    onShow?: () => void,
    onHide?: () => void
}

export type AccordionReturns = {
    show: () => void,
    hide: () => void,
    isVisible?: () => boolean,
    isHidden?: () => boolean
}

export type ModalParams = {
    modalElement: HTMLElement,
    options?: ModalOptions
}

