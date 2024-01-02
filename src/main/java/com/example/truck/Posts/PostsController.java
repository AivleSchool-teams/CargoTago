package com.example.truck.Posts;

import com.example.truck.Posts.PostsInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/posts")
@RequiredArgsConstructor
public class PostsController {

    private final PostsInfoRepository repository;

    // 모든 게시글 조회
    @GetMapping
    public List<PostsInfo> all() {
        return repository.findAll();
    }

    // 게시글 작성
    @PostMapping
    public PostsInfo newPostInfo(@RequestBody PostsInfo newPostsInfo) {
        return repository.save(newPostsInfo);
    }

    // 특정 게시글 조회
    @GetMapping("/{id}")
    public PostsInfo one(@PathVariable Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Could not find post with id " + id));
    }

    // 특정 게시글 수정
    @PutMapping("/{id}")
    public PostsInfo replacePost(@RequestBody PostsInfo newPostsInfo, @PathVariable Long id) {
        return repository.findById(id)
                .map(postsInfo -> {
                    postsInfo.setTitle(newPostsInfo.getTitle());
                    postsInfo.setContent(newPostsInfo.getContent());
                    return repository.save(postsInfo);
                })
                .orElseGet(() -> {
                    newPostsInfo.setId(id);
                    return repository.save(newPostsInfo);
                });
    }

    // 특정 게시글 삭제
    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
