package org.marikaya.pd.properties;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;


@Component
public class JWTProperties {
    @Value("${app.jwt.expirationTime}")
    private long expirationTime;

    @Value("${app.jwt.headerKey}")
    private String headerKey;

    @Value("${app.jwt.prefix}")
    private String prefix;

    @Value("${app.jwt.secret}")
    private String secretKey;

    @Value("${app.jwt.loginUrl}")
    private String loginUrl;

    public long getExpirationTime() {
        return expirationTime;
    }

    public void setExpirationTime(long expirationTime) {
        this.expirationTime = expirationTime;
    }

    public String getHeaderKey() {
        return headerKey;
    }

    public void setHeaderKey(String headerKey) {
        this.headerKey = headerKey;
    }

    public String getPrefix() {
        return prefix;
    }

    public void setPrefix(String prefix) {
        this.prefix = prefix;
    }

    public String getSecretKey() {
        return secretKey;
    }

    public void setSecretKey(String secretKey) {
        this.secretKey = secretKey;
    }

    public String getLoginUrl() {
        return loginUrl;
    }

    public void setLoginUrl(String loginUrl) {
        this.loginUrl = loginUrl;
    }
}
