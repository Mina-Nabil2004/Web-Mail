export class Folder {
  constructor(name, folderID) {
    this.name = name;
    this.folderID = folderID;
    this.emails = [];
  }

  addEmail(email) {
    this.emails.push(email);
  }

  addEmails(emails) {
    this.emails = [...this.emails, ...emails];
  }

  getEmails() {
    return this.emails;
  }
}



// Specific folder classes (Leaf Nodes in Composite Pattern)
class Inbox extends Folder {
  constructor(folderID) {
    super("Inbox", folderID);
  }
}

class Sent extends Folder {
  constructor(folderID) {
    super("Sent", folderID);
  }
}

class Drafts extends Folder {
  constructor(folderID) {
    super("Drafts", folderID);
  }
}

class Bin extends Folder {
  constructor(folderID) {
    super("Bin", folderID);
  }
}

class Starred extends Folder {
  constructor(folderID) {
    super("Starred", folderID);
  }
}

// Factory Class (Factory Pattern)
class FolderFactory {
  static createFolder(name, folderID) {
    switch (name) {
      case "Inbox":
        return new Inbox(folderID);
      case "Sent":
        return new Sent(folderID);
      case "Drafts":
        return new Drafts(folderID);
      case "Trash":
        return new Bin(folderID);
      case "Starred":
        return new Starred(folderID);
      default:
        return new Folder(name, folderID);  // Generic folder for user-defined names
    }
  }
}

export { FolderFactory, Inbox, Sent, Drafts, Bin, Starred };
