package com.rest.domain.article.dto;

import com.rest.domain.article.entity.Article;
import com.rest.domain.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
public class ArticleDto {
    private Long id;
    private String subject;
    private String author;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;

    public ArticleDto(Article article) {
        this.id = article.getId();
        this.subject = article.getSubject();
        this.author = article.getAuthor().getUsername();
        this.createdDate = article.getCreatedDate();
        this.modifiedDate = article.getModifiedDate();

    }
}
