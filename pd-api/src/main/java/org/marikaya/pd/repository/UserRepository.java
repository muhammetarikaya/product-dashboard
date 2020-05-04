package org.marikaya.pd.repository;


import org.marikaya.pd.dto.UserDTO;
import org.marikaya.pd.entity.UserEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends BaseRepository<UserDTO, UserEntity, Long> {
    UserEntity findByEmail(String email);
}
