package com.rest.global.initData;

import com.rest.domain.article.service.ArticleService;
import com.rest.domain.member.entity.Member;
import com.rest.domain.member.service.MemberService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@Profile({"dev", "test"})
public class NotProd {
    @Bean
    CommandLineRunner initData(ArticleService articleService, MemberService memberService, PasswordEncoder passwordEncoder) {
        String password = passwordEncoder.encode("1234");

        return args -> {

            // 회원 3명 추가
            Member admin = memberService.join("admin", password, "admin@test.com");
            Member user1 = memberService.join("user1", password, "user1@test.com");
            Member user2 = memberService.join("user2", password, "user2@test.com");


            // 게시물 추가
            articleService.create(admin, "제목 1", "내용 1");
            articleService.create(user1, "제목 2", "내용 2");
            articleService.create(user1, "제목 3", "내용 3");
            articleService.create(user2, "제목 4", "내용 4");
            articleService.create(user2, "제목 5", "내용 5");
        };
    }
}
