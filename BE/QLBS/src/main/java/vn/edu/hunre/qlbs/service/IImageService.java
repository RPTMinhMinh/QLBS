package vn.edu.hunre.qlbs.service;

import org.springframework.web.multipart.MultipartFile;
import vn.edu.hunre.qlbs.model.dto.ImageDto;

import java.io.IOException;

public interface IImageService {
    ImageDto uploadImage(MultipartFile file) throws IOException;
    void deleteImage(String publicId);
}
