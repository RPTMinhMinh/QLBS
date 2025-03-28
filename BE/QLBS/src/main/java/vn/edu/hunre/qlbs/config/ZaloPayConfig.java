package vn.edu.hunre.qlbs.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ZaloPayConfig {
    @Value("2554")
    private String appId;
    @Value("sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn")
    private String key1;
    @Value("trMrHtvjo6myautxDUiAcYsVtaeQ8nhf")
    private String key2;
    @Value("https://sb-openapi.zalopay.vn/v2/create")
    private String endPoint;
    @Value("https://sb-openapi.zalopay.vn/v2/query")
    private String orderstatus;

    public String getAppId() {
        return appId;
    }

    public void setAppId(String appId) {
        this.appId = appId;
    }

    public String getKey1() {
        return key1;
    }

    public void setKey1(String key1) {
        this.key1 = key1;
    }

    public String getKey2() {
        return key2;
    }

    public void setKey2(String key2) {
        this.key2 = key2;
    }

    public String getEndPoint() {
        return endPoint;
    }

    public void setEndPoint(String endPoint) {
        this.endPoint = endPoint;
    }

    public String getOrderstatus() {
        return orderstatus;
    }

    public void setOrderstatus(String orderstatus) {
        this.orderstatus = orderstatus;
    }
}
