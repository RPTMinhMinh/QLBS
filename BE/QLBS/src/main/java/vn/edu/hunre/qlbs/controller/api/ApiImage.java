package vn.edu.hunre.qlbs.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import vn.edu.hunre.qlbs.model.dto.ImageDto;
import vn.edu.hunre.qlbs.service.IImageService;

import java.io.IOException;

@RestController
@RequestMapping("/api/image")
public class ApiImage {
    @Autowired
    private IImageService imageService;

    @PostMapping("/create")
    public ImageDto upload(@RequestParam(value = "file") MultipartFile file) throws IOException {
        return imageService.uploadImage(file);
    }
}
