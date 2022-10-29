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
        // Don't mount new dialog if there's a dialog with the same id.
        const existingEl = document.querySelector(`${DialogRoot} [dialogId=${this.dialogId}]`);
        if (existingEl) return existingEl;

        // Don't create new dialog container if dialog container already exists.
        let root = document.querySelector(DialogRoot);
        if (!root) {
            root = document.createElement(DialogRoot);
            document.body.append(root);
        }

        // dialog background element
        const dialogBg = document.createElement("div");
        dialogBg.classList.add("dialog_bg");
        // set dialogId
        if (this.dialogId) dialogBg.setAttribute("dialogId", this.dialogId);
        // dialog element
        const dialog = document.createElement("div");
        dialog.classList.add("dialog");
        // dialog content element
        const dialogContent = document.createElement("div");
        dialogContent.classList.add("dialog_content");
        // set dialog text
        dialogContent.innerText = this.content;
        // dialog controls element
        const dialogControls = document.createElement("div");
        dialogControls.classList.add("dialog_controls");
        // okay button element
        const okButton = document.createElement("button");
        okButton.innerText = "Ok";
        // okay button event-listener
        okButton.addEventListener("click", () => this.confirmHandler.bind(this)());
        // cancel button element
        const cancelButton = document.createElement("button");
        cancelButton.innerText = "Cancel";
        // cancel button event-listener
        cancelButton.addEventListener("click", () => this.cancelHandler.bind(this)());
        // append buttons to dialog controls
        dialogControls.appendChild(cancelButton);
        dialogControls.appendChild(okButton);

        // append remaining element is order!
        dialog.appendChild(dialogContent);
        dialog.appendChild(dialogControls);
        dialogBg.appendChild(dialog);
        root.append(dialogBg);
        return dialogBg;
    }

    remove() {
        // remove from the DOM.
        if (this.node) this.node.remove();
    }
}