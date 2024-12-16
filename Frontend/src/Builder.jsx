class Builder {
    constructor() {
        this.subject = null;
        this.body = null;
        this.sender = null;
        this.attachments = null;
        this.priority = 4;
    }
    setSubject(subject) {
        this.subject = subject;
        return this;
    }

    setBody(body) {
        this.body = body;
        return this;
    }

    setSender(sender) {
        this.sender = sender;
        return this;
    }

    setAttachments(attachments) {
        this.attachments = attachments;
        return this;
    }

    setPriority(priority) {
        this.priority = priority;
        return this;
    }

    build() {
        return {
            subject: this.subject,
            body: this.body,
            sender: this.sender,
            attachments: this.attachments,
            priority: this.priority,
        };
    }
}
