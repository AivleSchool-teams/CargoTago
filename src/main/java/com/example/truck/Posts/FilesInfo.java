package com.example.truck.Posts;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class FilesInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String origFilename;

    @Column(nullable = false)
    private String filename;

    @Column(nullable = false)
    private String filepath;

    @ManyToOne
    @JsonIgnoreProperties("files")
    @JoinColumn(name = "posts_info_id")
    private PostsInfo postsInfo; // 게시글 참조

    public void setFileName(String originalFilename) {
        this.filename = originalFilename;
    }

    public void setFilePath(String string) {
        this.filepath = string;
    }
}

