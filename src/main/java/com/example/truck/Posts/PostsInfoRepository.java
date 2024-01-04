package com.example.truck.Posts;

import com.example.truck.Posts.PostsInfo;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PostsInfoRepository extends JpaRepository<PostsInfo, Long> {

    @EntityGraph(attributePaths = {"files"})
    Optional<PostsInfo> findById(Long id);

}
