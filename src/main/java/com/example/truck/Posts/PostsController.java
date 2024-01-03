package com.example.truck.Posts;

import com.example.truck.DTO.PageDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import java.time.LocalDateTime; // LocalDateTime import 추가
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

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

    @PostMapping
    public PostsInfo newPostInfo(@RequestBody PostsInfoDTO newPostsInfoDTO) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();
        PostsInfo newPostsInfo = new PostsInfo();
        newPostsInfo.setTitle(newPostsInfoDTO.getTitle());
        newPostsInfo.setContent(newPostsInfoDTO.getContent());
        newPostsInfo.setType(newPostsInfoDTO.getType()); // type 필드 추가
        newPostsInfo.setCreatedBy(email);
        newPostsInfo.setCreatedAt(LocalDateTime.now()); // 'createdAt' 필드 설정. 현재 시간을 사용함

        return service.newPostInfo(newPostsInfo);
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
