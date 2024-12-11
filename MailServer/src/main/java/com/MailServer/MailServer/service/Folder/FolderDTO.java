package com.MailServer.MailServer.service.Folder;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Data
public class FolderDTO {
    // Getters and setters
    private Long folderID;
    private String name;

    public FolderDTO(Long folderID, String name) {
        this.folderID = folderID;
        this.name = name;
    }

    public Long getFolderID() {
        return folderID;
    }

    public void setFolderID(Long folderID) {
        this.folderID = folderID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
