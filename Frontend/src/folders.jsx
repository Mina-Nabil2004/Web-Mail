// Folder class (Composite Pattern)
class Folder {
    constructor(name, folderID) {
      this.name = name;
      this.folderID = folderID;
    }
  
    addEmail(email) {
      this.emails.push(email);
    }
  
    getEmails() {
      return this.emails;
    }
  
    removeEmail(emailId) {
      this.emails = this.emails.filter(email => email.id !== emailId);
    }
  }
  Inbox.folderID
  // Specific folder classes (Leaf Nodes in Composite Pattern)
  class Inbox extends Folder {
    constructor() {
      super("Inbox");
    }
  }
  
  class Sent extends Folder {
    constructor() {
      super("Sent");
    }
  }
  
  class Drafts extends Folder {
    constructor() {
      super("Drafts");
    }
  }
  
  class Bin extends Folder {
    constructor() {
      super("Bin");
    }
  }
  
  class Starred extends Folder {
    constructor() {
      super("Starred");
    }
  }
  
  // Factory Class (Factory Pattern)
  class FolderFactory {
    static createFolder(name, folderID) {
      switch (name) {
        case "inbox":
          return new Inbox(folderID);
        case "sent":
          return new Sent(folderID);
        case "drafts":
          return new Drafts(folderID);
        case "trash":
          return new Bin(folderID);
        case "starred":
          return new Starred(folderID);
        default:
          return new UserFolder(name, folderID);
      }
    }
  }
  
  export { FolderFactory, Inbox, Sent, Drafts, Bin, Starred };
  