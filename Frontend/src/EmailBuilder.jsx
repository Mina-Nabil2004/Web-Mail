export class Builder {
    constructor() {
        this.subject = null;
        this.body = null;
        this.attachments = null;
        this.receivers=[];
        this.priority = 4;
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
    full(){
        if(this.subject!==null&&this.body!==null&&this.receivers!==null){
            return true;
        }
        else{
            return false;
        }
    }
    build() {
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
