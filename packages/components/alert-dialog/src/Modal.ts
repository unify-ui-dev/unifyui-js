import {  find } from "./helper";
import { ModalParams } from "./types";
import { initModal } from "./utils";
import "./style.css"


export const createModal = (
    { modalElement, options = {} }: ModalParams
) => {

    if (!(modalElement instanceof HTMLElement))
        throw new Error("Container not a valid HTML elemnt")

    modalElement.setAttribute("data-unoify-modal",'')
    const modalId = modalElement.dataset.modalId

    const triggerButton = find({ selector: `[data-modal-target='${modalId}']`, parentElement: document.documentElement })

    initModal(modalElement, triggerButton, options)

}