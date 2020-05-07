package org.marikaya.pd.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.marikaya.pd.dto.UserDTO;
import org.marikaya.pd.properties.JWTProperties;
import org.marikaya.pd.request.LoginRequest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;

public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final JWTProperties jwtProperties;

    public JWTAuthenticationFilter(AuthenticationManager authenticationManager, JWTProperties jwtProperties) {
        this.authenticationManager = authenticationManager;
        this.jwtProperties = jwtProperties;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest req,
                                                HttpServletResponse res) throws AuthenticationException {
        try {
            LoginRequest loginRequest = new ObjectMapper().readValue(req.getInputStream(), LoginRequest.class);

            return authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword(),
                            new ArrayList<>())
            );
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest req,
                                            HttpServletResponse res,
                                            FilterChain chain,
                                            Authentication auth) throws IOException, ServletException {
        String token = Jwts.builder()
                .setSubject(((UserDTO) auth.getPrincipal()).getUsername())
                .setExpiration(new Date(System.currentTimeMillis() + this.jwtProperties.getExpirationTime() * 1000))
                .signWith(SignatureAlgorithm.HS512, this.jwtProperties.getSecretKey().getBytes())
                .compact();
        res.addHeader(this.jwtProperties.getHeaderKey(), this.jwtProperties.getPrefix() + " " + token);
    }
}
