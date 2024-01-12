const areValidHTMLElements = (elements: HTMLElement[]): elements is HTMLElement[] =>
    Array.from(elements).every((element) => element instanceof HTMLElement);

/**
 * Finds the first element that matches the specified selector within the accordion element.
 * @param {string} selector - The selector to search for (can be data-attribute or class value).
 * @param {HTMLElement} parentElement - The parent element to search within.
 * @returns {HTMLElement | null} The found element or null if no matches are found.
 */
const find = ({ selector, parentElement }: { selector: string, parentElement: HTMLElement }): HTMLElement | null =>
    (parentElement).querySelector(selector);

/**
 * Finds all elements that match the specified selector within the accordion element.
 * @param {string} selector - The selector to search for (can be data-attribute or class value).
 * @param {HTMLElement} parentElement - The parent element to search within.
 * @returns {HTMLElement[]} An array of found elements.
 */
const findAll = ({ selector, parentElement }: { selector: string, parentElement: HTMLElement }): HTMLElement[] =>
    Array.from((parentElement).querySelectorAll(selector));



const getComputedStyle = (element: HTMLElement | HTMLInputElement | HTMLTextAreaElement | HTMLButtonElement) => {
    if (!(element instanceof HTMLTextAreaElement))
        throw new Error("Element provided is not a valid element")
    return window.getComputedStyle(element);
}

const elementHasDisplayNone = (element: HTMLElement) => {
    const displayPro = getComputedStyle(element).getPropertyValue("display")
    return displayPro === "none"
}

/**
 * Appends a new element before an existing element.
 */
const appendBefore = ({ newElement, existingElement }: { newElement: HTMLElement, existingElement: HTMLElement }) => {
    if (
        !(newElement instanceof HTMLElement) ||
        !(existingElement instanceof HTMLElement)
    ) throw new Error("Both parameters must be valid HTML elements.");

    const parentElement = existingElement.parentElement;

    if (parentElement) parentElement.insertBefore(newElement, existingElement);
    else throw new Error("Existing element must have a parent element.");
};


const elementHasTransition = (element: HTMLElement): boolean => {
    const computedStyle = window.getComputedStyle(element);
    const transitionProperty = computedStyle.getPropertyValue('transition');
    return transitionProperty !== 'none';
}

const injectStyle = ({ newStyles, identifier }: { newStyles: string, identifier: string }) => {
    const existingStyleTag = document.head.querySelector("[data-fx-style]")
    if (existingStyleTag) {
        const currentStyle = existingStyleTag.textContent || ""
        if (!currentStyle.includes(identifier)) {
            existingStyleTag.textContent += newStyles
        }
        return
    }
    const styleElement = document.createElement("style")
    styleElement.textContent = newStyles
    styleElement.setAttribute("data-fx-style", "")
    document.head.appendChild(styleElement)
}

const setAttributes = (element:HTMLElement, attributes:Record<string, string>) => {
    for(const [key, value] of Object.entries(attributes)){
        element.setAttribute(key, value)
    }
}

export {
    areValidHTMLElements,
    find,
    findAll,
    elementHasDisplayNone,
    appendBefore,
    elementHasTransition,
    getComputedStyle,
    injectStyle,
    setAttributes
}