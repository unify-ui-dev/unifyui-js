import { find } from "@unifyui-js/dom_util";
import { ModalParams } from "./types";
import { initModal } from "./helpers";
import { injectStyles } from "./injectStyle";

/**
 * Modal Class
 */
class Modal {
    private modalElement: HTMLElement
    public showModal: () => void
    public hideModal: () => void
    public isHidden: () => boolean
    /**
     * Creates and initializes a modal.
     * @param modalParams - Parameters for modal creation and initialization.
     */
    public instance: Modal
    constructor({ modalElement, triggerElement, options = {} }: ModalParams) {
        this.instance = this
        injectStyles()
        this.modalElement = modalElement
        this.modalElement.setAttribute("data-fx-modal", "");
        const modalId = modalElement.dataset.modalId;

        const triggerButton = triggerElement || find({
            selector: `[data-modal-target='${modalId}']`,
            parentElement: document.body
        });

        const { showModal, hideModal, autoInitModal, isHidden } = initModal(modalElement, triggerButton, options);

        autoInitModal()
        this.showModal = showModal
        this.hideModal = hideModal
        this.isHidden = isHidden
    }
}

export default Modal