import { appendBefore } from "./helper";

/**
 * Initializes a modal with associated triggers, animations, and close functionality.
 * @param {HTMLElement} slideOverElement - The slideOver element to be initialized.
 */
const initializeSlideOver = (slideOverElement) => {
  if (!(slideOverElement instanceof HTMLElement)) return;

  const slideOverTriggers = document.querySelectorAll(
    `[data-trigger-slideover][data-target='${slideOverElement.getAttribute(
      "id"
    )}']`
  );
  const closeSlideOverBtns = slideOverElement.querySelectorAll(
    `[data-close-slideover][data-target='${slideOverElement.getAttribute(
      "id"
    )}']`
  );

  const preventCloseSliderOver =
    slideOverElement.hasAttribute("data-prevent-close") &&
    slideOverElement.getAttribute("data-prevent-close") !== "false";

  const allowBodyScroll =
    slideOverElement.hasAttribute("data-allow-body-scroll") &&
    slideOverElement.getAttribute("data-allow-body-scroll") !== "false";
  const withoutOverlay =
    slideOverElement.hasAttribute("data-without-overlay") &&
    slideOverElement.getAttribute("data-without-overlay") !== "false";

  if (!slideOverTriggers) return;

  const overlayClass = slideOverElement.getAttribute("data-slideover-overlay");
  const overlayElement = document.createElement("div");
  const createOverlay = () => {
    if (withoutOverlay) return;
    overlayElement.setAttribute("aria-hidden", "true");
    overlayElement.style.display = "none";

    if(!overlayClass || overlayClass === "") return
    overlayElement.style.position = "fixed";
    overlayElement.style.inset = "0px";
    if (overlayClass && overlayClass !== "") {
      const className = overlayClass.split(" ");
      overlayElement.classList.add(...className);
    }
    appendBefore(overlayElement, slideOverElement);
  };

  createOverlay();

  if (!slideOverElement.hasAttribute("aria-hidden"))
    slideOverElement.setAttribute("aria-hidden", "true");

  slideOverElement.hidden = true;

  /**
   * Toggles the state of the slideOver (open or close).
   * @param {string} action - Either 'open' or 'close'.
   */
  const toggleSlideOverState = (action) => {
    slideOverElement.setAttribute(
      "aria-hidden",
      action === "open" ? false : true
    );
    slideOverElement.hidden = action === "open" ? false : true;
    slideOverElement.setAttribute(
      "data-open",
      action === "open" ? "true" : "false"
    );

    if (overlayElement)
      overlayElement.style.display = action === "open" ? "flex" : "none";

    if (!allowBodyScroll) {
      if (action === "open") document.body.style.overflow = "hidden";
      else document.body.style.overflowY = "auto";
    }
  };

  const openSlideOver = () => {
    toggleSlideOverState("open");
  };

  const closeSlideOver = () => {
    if (slideOverElement.getAttribute("data-open") !== "true") return;
    toggleSlideOverState("close");
  };

  slideOverTriggers.forEach((slideOverTrigger) => {
    slideOverTrigger.addEventListener("click", () => {
      if (slideOverElement.getAttribute("data-open") === "true")
        closeSlideOver();
      else openSlideOver();
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !preventCloseSliderOver) {
      closeSlideOver();
    }
  });
  if (!withoutOverlay && overlayElement) {
    overlayElement.addEventListener("click", () => {
      closeSlideOver();
    });
  }

  document.addEventListener("click", (e) => {
    if (slideOverElement.getAttribute("data-open") === "true") {
      if (
        !slideOverElement.contains(e.target) &&
        !Array.from(slideOverTriggers).includes(e.target)
      ) {
        closeSlideOver();
      }
    }
  });

  if (!closeSlideOverBtns) return;
  closeSlideOverBtns.forEach((closeSlideOverBtn) => {
    closeSlideOverBtn.addEventListener("click", () => {
      closeSlideOver();
    });
  });
};

const slideOvers = document.querySelectorAll("[data-slideover]");
slideOvers.forEach(initializeSlideOver);
