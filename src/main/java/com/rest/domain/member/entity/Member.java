package com.rest.domain.member.entity;

import com.rest.global.jpa.BaseEntity;
import jakarta.persistence.Entity;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@ToString(callSuper = true)
public class Member extends BaseEntity {
    private String username;

    private String password;
    private String email;
    private String refreshToken;
}