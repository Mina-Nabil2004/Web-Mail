package com.Webmail.Webmail;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "STUDENT")
public class student {
    @Id
    @Column(name = "id")
    private int id;
    @Column(name = "mark")
    private String mark;
    @Column(name = "name")
    private String name;
    @Column(name = "kills")
    private String kills;
    @Column(name = "finshes")
    private String finshes;
}
