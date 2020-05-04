package org.marikaya.pd.mapper;

import org.marikaya.pd.dto.UserDTO;
import org.marikaya.pd.entity.UserEntity;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component
@Scope("singleton")
public class UserMapper extends BaseMapper<UserEntity, UserDTO> {
    @Override
    public UserDTO mapToDTO(UserEntity entity) {
        UserDTO dto = new UserDTO();
        dto.setEmail(entity.getEmail());
        dto.setFullName(entity.getFullName());
        dto.setPassword(entity.getPassword());
        dto.setTitle(entity.getTitle());
        this.mapCommons(dto, entity);
        return dto;
    }

    @Override
    public UserEntity mapToEntity(UserDTO dto) {
        UserEntity entity = new UserEntity();

        entity.setEmail(dto.getEmail());
        entity.setFullName(dto.getFullName());
        entity.setPassword(dto.getPassword());
        entity.setTitle(dto.getTitle());

        this.mapCommons(entity, dto);
        return entity;
    }
}
