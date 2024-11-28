package com.rest.domain.article.entity;

import com.rest.global.jpa.BaseEntity;
import com.rest.global.rsData.RsData;
import jakarta.persistence.Entity;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.Optional;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@ToString(callSuper = true)
public class Article extends BaseEntity {
    private String subject;
    private String content;
}
