import { appendBefore, areValidHTMLElements, findAll } from "./helper";
import { ModalOptions } from "./types";


/**
 * Toggles the state of the modal (open or close).
 *
 * @param {string} action - Either 'open' or 'close'.
 */
const toggleModalState = (modalElement: HTMLElement, modalContent: HTMLElement, action: "open" | "close") => {
    modalElement.setAttribute("aria-hidden", action === "open" ? "false" : "true");
    modalElement.setAttribute("data-state", action === "open" ? "open" : "close");
    modalContent.setAttribute("data-state", action === "open" ? "open" : "close")
};


const initModal = (modalElement: HTMLElement, triggerButton: HTMLElement | null, options: ModalOptions) => {
    if (!(modalElement instanceof HTMLElement)) throw new Error("Modal Element must be a valid element")
    if (!(triggerButton instanceof HTMLElement)) throw new Error("modal trigger must be valid")
    const { animateContent, allowBodyScroll, preventCloseModal, overlayClass } = options

    const overlayClassName = overlayClass?.split(" ") || modalElement.dataset.modalOverlay?.split(" ") || ""
    const overlayEl = document.createElement("span")
    overlayEl.setAttribute("aria-hidden", "true")

    const modalContent = modalElement.querySelector("[data-modal-content]")

    const closeButtons = findAll({ selector: "[data-close-modal]", parentElement: modalElement })

    if (!(modalContent instanceof HTMLElement)) throw new Error("")
    const animationEnter = modalContent.dataset.enterAnimation
    const animationExit = modalContent.dataset.exitAnimation


    appendBefore(overlayEl, modalContent)
    modalContent.setAttribute("data-state", 'close')
    overlayEl.classList.add(...overlayClassName)
    overlayEl.setAttribute("data-modal-overlay", "")
    const openModal = () => {
        if (animateContent || (animationEnter && animationEnter !== "")) {
            let contentAnimation = ""
            if (animateContent) contentAnimation = animateContent.enterAnimation
            else contentAnimation = animationEnter || ""

            contentAnimation !== "" && modalContent.style.setProperty("--un-modal-animation", contentAnimation)
        } else toggleModalState(modalElement, modalContent, "open")
        if (!allowBodyScroll) document.body.style.overflow = "hidden";
    }
    const closeModal = () => {
        if ((animateContent && animateContent.exitAnimation !== "") || (animationExit && animationExit !== "")) {
            let exitAnimation_ = ""
            if (animateContent) exitAnimation_ = animateContent.exitAnimation || ""
            else if (animationExit) exitAnimation_ = animationExit
            modalContent.setAttribute("data-state", "close")
            modalContent.style.setProperty("--un-modal-animation", exitAnimation_)

            modalContent.addEventListener(
                "animationend",
                function handleAnimationEnd() {
                    modalContent.removeEventListener("animationend", handleAnimationEnd);
                    toggleModalState(modalElement, modalContent, "close");
                    modalContent.style.removeProperty("--un-modal-animation");
                },
                { once: true }
            );
        } else {
            toggleModalState(modalElement, modalContent, "close");
        }

        if (!allowBodyScroll) document.body.style.overflowY = "auto";
    }
    document.addEventListener("keydown", function closeModalEsc(e: KeyboardEvent) {
        document.removeEventListener("keydown", closeModal)
        if (e.key === "Escape" && !preventCloseModal) {
            closeModal();
        }
    });

    !preventCloseModal && overlayEl.addEventListener("click", closeModal)

    triggerButton.addEventListener("click", openModal)

    if (areValidHTMLElements(closeButtons)) {
        for (const closeButton of closeButtons) {
            closeButton.addEventListener("click", closeModal)
        }
    }
}

export { initModal }