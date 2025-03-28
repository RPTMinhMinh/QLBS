package vn.edu.hunre.qlbs.utils;

public class Utils<T>{
    private T t;
    private String msg;
    private int code;

    public Utils(int code, String msg, T t) {
        this.code = code;
        this.msg = msg;
        this.t = t;
    }

    public T getT() {
        return t;
    }

    public void setT(T t) {
        this.t = t;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }
}
