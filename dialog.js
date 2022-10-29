const DialogRoot = "dialog-root";

class Dialog {
    constructor(content, dialogId) {
        this.content = content;
        this.node = null;
        this.dialogId = dialogId;
        this.confirmListeners = []
        this.cancelListeners = []
    }

    setContent(content) {
        this.content = content;
        return this;
    }

    show() {
        if (!this.node) this.node = this.mount();
        this.node.classList.add("active");
        return this;
    }

    hide() {
        this.node.classList.remove("active");
        return this;
    }

    confirm(callback) {
        this.confirmListeners.push(callback);
        return this;
    }

    cancel(callback) {
        this.cancelListeners.push(callback);
        return this;
    }

    confirmHandler() {
        this.confirmListeners.forEach(fn => fn());
        this.hide();
    }

    cancelHandler() {
        this.cancelListeners.forEach(fn => fn());
        this.hide();
    }

    mount() {
        // code for mounting here
    }

    remove() {
        // remove from the DOM.
        if (this.node) this.node.remove();
    }
}