package com.example.truck.Posts;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PostsService {

    private final PostsInfoRepository repository;

    private final FilesInfoRepository filerepository;

    public List<PostsInfo> all() {
        return repository.findAll();
    }

    public PostsInfo newPostInfo(PostsInfo newPostsInfo) {
        return repository.save(newPostsInfo);
    }

    public void newFileInfo(FilesInfo newFilesInfo) { filerepository.save(newFilesInfo); }
    public PostsInfo one(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Could not find post with id " + id));
    }

    public PostsInfo replacePost(PostsInfo newPostsInfo, Long id) {
        return repository.findById(id)
                .map(postsInfo -> {
                    postsInfo.setTitle(newPostsInfo.getTitle());
                    postsInfo.setContent(newPostsInfo.getContent());
                    postsInfo.setType(newPostsInfo.getType()); // type 필드 추가
                    return repository.save(postsInfo);
                })
                .orElseGet(() -> {
                    newPostsInfo.setId(id);
                    return repository.save(newPostsInfo);
                });
    }

    public void deletePost(Long id) {
        repository.deleteById(id);
    }
}
