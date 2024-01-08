package com.example.truck.Posts;


import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import java.nio.file.Path;
import java.nio.file.Paths;


@RestController
public class FileController {

    private final Path fileStorageLocation = Paths.get("src/main/resources/static/uploads");

    @GetMapping("/uploads/{fileName:.+}")
    public Resource downloadFile(@PathVariable String fileName) {
        try {
            Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) {
                return resource;
            } else {
                throw new RuntimeException("File not found " + fileName);
            }
        } catch (Exception ex) {
            throw new RuntimeException("Error: " + ex.getMessage());
        }
    }
}

