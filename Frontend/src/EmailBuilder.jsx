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
        console.log(receivers);
        this.receivers = typeof receivers === "string" 
            ? receivers.split(",").map(receiver => receiver.trim()) 
            : receivers;
        return this;
    }
    setBody(body) {
        console.log(body);
        this.body = body;
        return this;
    }

    setAttachments(attachments) {
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
    getReceiversAsString(delimiter = ", ") {
        return this.receivers.join(delimiter);
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
