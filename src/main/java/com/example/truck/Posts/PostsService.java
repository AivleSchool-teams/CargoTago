package com.example.truck.Posts;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
@RequiredArgsConstructor
public class PostsService {

    private final PostsInfoRepository repository;
    private final FilesInfoRepository filerepository;
    // 파일 저장 위치
    private final String uploadDir = "/uploads";

    public List<PostsInfo> all() {
        return repository.findAll();
    }

    public PostsInfo newPostInfo(PostsInfo newPostsInfo, MultipartFile[] files) {
        // 게시글 저장
        PostsInfo savedPost = repository.save(newPostsInfo);

        // 파일 저장
        if (files != null && files.length > 0) {
            for (MultipartFile file : files) {
                if (file.isEmpty()) {
                    continue; // 비어있는 파일은 무시
                }

                try {
                    // 파일 저장 위치를 확인하고, 없다면 생성
                    Path uploadPath = Paths.get(uploadDir);
                    if (!Files.exists(uploadPath)) {
                        Files.createDirectories(uploadPath);
                    }

                    // 파일 저장 (uploadDir/파일명)
                    Path filePath = uploadPath.resolve(file.getOriginalFilename());
                    Files.copy(file.getInputStream(), filePath);

                    // 파일 정보 저장
                    FilesInfo newFilesInfo = new FilesInfo();
                    newFilesInfo.setFileName(file.getOriginalFilename());
                    newFilesInfo.setFilePath(filePath.toString());
                    newFilesInfo.setPostsInfo(savedPost); // 게시글 정보 설정
                    filerepository.save(newFilesInfo);
                } catch (Exception e) {
                    throw new RuntimeException("Could not store the file. Error: " + e.getMessage());
                }
            }
        }

        return savedPost;
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
