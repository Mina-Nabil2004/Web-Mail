export class Builder {
    static instance = null;

    constructor() {
        if (Builder.instance) {
            return Builder.instance;
        }

        this.subject = null;
        this.body = null;
        this.attachments = [];
        this.receivers = [];
        this.priority = 4;

        Builder.instance = this;
    }

    static getInstance() {
        if (!Builder.instance) {
            Builder.instance = new Builder();
        }
        return Builder.instance;
    }

    setSubject(subject) {
        console.log(subject);
        this.subject = subject;
        return this;
    }

    setReceivers(receivers) {
        if (Array.isArray(receivers)) {
            this.receivers = receivers;
            console.log(receivers);
        } else if (typeof receivers === "string") {
            this.receivers = receivers.split(",").map((email) => email.trim());
            console.log(receivers);
        } else {
            throw new Error("Receivers should be an array or a comma-separated string");
        }
        return this;
    }

    setBody(body) {
        console.log(body);
        this.body = body;
        return this;
    }

    setAttachments(attachments) {
        console.log(attachments);
        this.attachments = attachments;
        return this;
    }

    setPriority(priority) {
        console.log(priority);
        this.priority = priority;
        return this;
    }

    full() {
        return this.subject !== null && this.body !== null && this.receivers.length > 0;
    }

    reset() {
        this.subject = null;
        this.body = null;
        this.attachments = [];
        this.receivers = [];
        this.priority = 4;
    }

    build() {
        console.log("Building email with the following properties:");
        console.log("Subject:", this.subject);
        console.log("Body:", this.body);
        console.log("Attachments:", this.attachments);
        console.log("Priority:", this.priority);
        console.log("Receivers:", this.receivers);
        return {
            subject: this.subject,
            body: this.body,
            sender: null,
            attachments: this.attachments,
            priority: this.priority,
            receivers: this.receivers,
        };
    }
    
}