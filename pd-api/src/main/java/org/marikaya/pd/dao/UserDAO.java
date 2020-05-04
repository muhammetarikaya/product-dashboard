package org.marikaya.pd.dao;

import org.marikaya.pd.dto.UserDTO;
import org.marikaya.pd.entity.UserEntity;
import org.marikaya.pd.mapper.UserMapper;
import org.marikaya.pd.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserDAO extends BaseDAO<UserEntity, UserDTO, Long, UserRepository, UserMapper> {

    @Autowired
    public UserDAO(UserRepository repository, UserMapper mapper) {
        super(repository, mapper);
    }

    public UserDTO findByEmail(String email) {
        UserEntity userEntity = this.repository.findByEmail(email);
        if (userEntity != null) {
            return this.mapper.mapToDTO(userEntity);
        }
        return null;
    }

}
