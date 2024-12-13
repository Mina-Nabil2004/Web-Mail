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
    super("inbox", folderID);
  }
}

class Sent extends Folder {
  constructor(folderID) {
    super("sent", folderID);
  }
}

class Drafts extends Folder {
  constructor(folderID) {
    super("drafts", folderID);
  }
}

class Trash extends Folder {
  constructor(folderID) {
    super("trash", folderID);
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
      case "inbox":
        console.log("hello");
        return new Inbox(folderID);
      case "sent":
        return new Sent(folderID);
      case "drafts":
        return new Drafts(folderID);
      case "trash":
        return new Trash(folderID);
      case "starred":
        return new Starred(folderID);
      default:
        return new Folder(name, folderID);  // Generic folder for user-defined names
    }
  }
}

export { FolderFactory, Inbox, Sent, Drafts, Trash, Starred };
