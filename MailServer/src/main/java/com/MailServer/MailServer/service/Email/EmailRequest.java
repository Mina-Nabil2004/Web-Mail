package com.MailServer.MailServer.service.Email;

import java.util.List;

public class EmailRequest {
    private EmailDTO emailDTO;
    private List<AttachmentDTO> attachmentDTOS;

    public EmailDTO getEmailDTO() {
        return emailDTO;
    }

    public void setEmailDTO(EmailDTO emailDTO) {
        this.emailDTO = emailDTO;
    }

    public List<AttachmentDTO> getAttachmentDTOS() {
        return attachmentDTOS;
    }

    public void setAttachmentDTOS(List<AttachmentDTO> attachmentDTOS) {
        this.attachmentDTOS = attachmentDTOS;
    }
}
