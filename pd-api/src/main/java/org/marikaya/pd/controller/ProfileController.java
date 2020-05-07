package org.marikaya.pd.controller;

import org.marikaya.pd.dao.UserDAO;
import org.marikaya.pd.dto.UserDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/profile")
public class ProfileController {
    private static final Logger logger = LoggerFactory.getLogger(ProfileController.class);
    private final UserDAO userDAO;


    @Autowired
    public ProfileController(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    @RequestMapping
    public UserDTO getProfile(Authentication authentication) {
        String loggedUserEmail = (String) authentication.getPrincipal();
        UserDTO loggedUser = this.userDAO.findByEmail(loggedUserEmail);
        return loggedUser;
    }

    @RequestMapping(method = RequestMethod.POST)
    public UserDTO saveProfile(Authentication authentication, @RequestBody UserDTO userDTO) {
        String loggedUserEmail = (String) authentication.getPrincipal();
        if (userDTO.getEmail().equals(loggedUserEmail)) {
            String userPassword = this.userDAO.getUserPassword(loggedUserEmail);
            userDTO.setPassword(userPassword);
            UserDTO savedUserDTO = this.userDAO.save(userDTO);
            if (logger.isInfoEnabled()) {
                logger.info("[ProfileController][saveProfile] -> Profile is updated, EMAIL >>  {} ", loggedUserEmail);
            }
        }
        return null;
    }
}
