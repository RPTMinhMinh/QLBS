package vn.edu.hunre.qlbs.utils;

import java.time.LocalDateTime;

public class GenerateCode {
    public static String generateUniqueCode(String code) {
        code = code.toUpperCase();
        LocalDateTime now = LocalDateTime.now();
        int year = now.getYear() % 100; // Lấy 2 số cuối của năm
        int uniqueNumber = (int) (Math.random() * 90000) + 10000; // Số ngẫu nhiên 5 chữ số
        return String.format(code+"%d%d", year, uniqueNumber);
    }

}
