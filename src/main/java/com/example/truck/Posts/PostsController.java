package com.example.truck.Posts;

import com.example.truck.DTO.PageDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime; // LocalDateTime import 추가
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import java.io.File;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/post")
@RequiredArgsConstructor
public class PostsController {

    private final PostsService service;

    @GetMapping
    public List<PostsInfo> all() {
        return service.all();
    }

    @Value("${project.upload.path}")
    private String uploadPath;

    @PostMapping
    public PostsInfo newPostInfo(@RequestParam("title") String title,
                                 @RequestParam("content") String content,
                                 @RequestParam("type") String type,
                                 @RequestParam(value = "files", required = false) MultipartFile[] files) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();
        PostsInfo newPostsInfo = new PostsInfo();
        newPostsInfo.setTitle(title);
        newPostsInfo.setContent(content);
        newPostsInfo.setType(type);
        newPostsInfo.setCreatedBy(email);
        newPostsInfo.setCreatedAt(LocalDateTime.now());

        PostsInfo newposts = null; // 변수를 블록 바깥에서 선언하고 초기화

        if (files != null) {
            newposts = service.newPostInfo(newPostsInfo, files); // 이미 선언된 변수를 사용해 값을 할당
            for (MultipartFile file : files) {
                String filename = file.getOriginalFilename();
                String realpath = uploadPath + File.separator + filename;
                Path pathz = Paths.get(realpath).toAbsolutePath().normalize();

                FilesInfo newFilesInfo = new FilesInfo();
                newFilesInfo.setOrigFilename(file.getOriginalFilename()); //찐 파일이름
                newFilesInfo.setFileName(file.getName()); //files라는 이름때문인가?
                newFilesInfo.setFilePath(uploadPath); //C:\\uploads -> properties에 작성된 경로
                newFilesInfo.setPostsInfo(newposts); // 게시글의 id불러옴
                service.newFileInfo(newFilesInfo);
                try {
                    file.transferTo(pathz);
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        }

        return newposts;
    }

    @GetMapping("/view/{id}")
    public PostsInfo one(@PathVariable Long id) {
        return service.one(id);
    }

    @PutMapping("/view/{id}")
    public PostsInfo replacePost(@RequestBody PostsInfoDTO newPostsInfoDTO, @PathVariable Long id) {
        PostsInfo newPostsInfo = new PostsInfo();
        newPostsInfo.setTitle(newPostsInfoDTO.getTitle());
        newPostsInfo.setContent(newPostsInfoDTO.getContent());
        newPostsInfo.setType(newPostsInfoDTO.getType()); // type 필드 추가

        return service.replacePost(newPostsInfo, id);
    }

    @DeleteMapping("/view/{id}")
    public void deletePost(@PathVariable Long id) {
        service.deletePost(id);
    }
}
