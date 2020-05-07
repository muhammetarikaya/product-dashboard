package org.marikaya.pd.repository;


import org.marikaya.pd.dto.UserDTO;
import org.marikaya.pd.entity.UserEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends BaseRepository<UserDTO, UserEntity, Long> {
    UserEntity findByEmail(String email);

    @Query("select u.password from UserEntity u where u.email = :email")
    String getPasswordByEmail(@Param("email") String email);
}
