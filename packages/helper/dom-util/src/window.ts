function windowEventListener(eventType: string, eventFunction: EventListener): { add: () => void; remove: () => void } {
    let isAdded = false;

    const add = () => {
        if (typeof window !== "undefined") {
            window.addEventListener(eventType, eventFunction);
            isAdded = true;
        } else {
            console.warn("Window not available yet. Event listener will be added when it becomes available.");
        }
    };

    const remove = () => {
        if (isAdded) {
            window.removeEventListener(eventType, eventFunction);
            isAdded = false;
        }
    };

    return { add, remove };
}

export { windowEventListener };  