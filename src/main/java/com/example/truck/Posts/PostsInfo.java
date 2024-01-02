package com.example.truck.Posts;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class PostsInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // 게시글 번호

    @Column(nullable = false, length = 255)
    private String title; // 제목

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content; // 내용

    @Column(nullable = false)
    private LocalDateTime createdAt; // 생성일시

    @Column(nullable = false, length = 255)
    private String createdBy; // 생성자
}
