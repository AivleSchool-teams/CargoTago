package com.example.truck.Posts;

import lombok.Getter;

@Getter
public class PostsInfoDTO {
    private Long id; // 게시글 번호
    private String title; // 제목
    private String content; // 내용
    private String createdAt; // 생성일시
    private String createdBy; // 생성자
}
