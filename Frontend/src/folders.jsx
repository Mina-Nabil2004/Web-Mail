// Folder class (Composite Pattern)
class Folder {
    constructor(name) {
      this.name = name;
      this.emails = [];
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
    static createFolder(type) {
      switch (type) {
        case "Inbox":
          return new Inbox();
        case "Sent":
          return new Sent();
        case "Drafts":
          return new Drafts();
        case "Bin":
          return new Bin();
        case "Starred":
          return new Starred();
        default:
          throw new Error(`Unknown folder type: ${type}`);
      }
    }
  }
  
  export { FolderFactory, Inbox, Sent, Drafts, Bin, Starred };
  