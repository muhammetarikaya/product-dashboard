package org.marikaya.pd.mapper;

import org.marikaya.pd.dto.BaseDTO;
import org.marikaya.pd.entity.BaseEntity;

import java.util.ArrayList;
import java.util.List;

public abstract class BaseMapper<E extends BaseEntity, D extends BaseDTO> {
    public abstract D mapToDTO(E entity);

    public abstract E mapToEntity(D dto);

    protected D mapCommons(D firstObj, E secondObj) {
        firstObj.setLastUpdatedDate(secondObj.getLastUpdatedDate());
        firstObj.setId(secondObj.getId());
        firstObj.setCreatedDate(secondObj.getCreatedDate());
        firstObj.setVersion(secondObj.getVersion());
        return firstObj;
    }

    protected E mapCommons(E firstObj, D secondObj) {
        firstObj.setLastUpdatedDate(secondObj.getLastUpdatedDate());
        firstObj.setId(secondObj.getId());
        firstObj.setCreatedDate(secondObj.getCreatedDate());
        firstObj.setVersion(secondObj.getVersion());
        return firstObj;
    }

    public List<D> mapToDTO(List<E> entityList) {
        List<D> dtoList = new ArrayList<>();
        for (E entity : entityList) {
            dtoList.add(this.mapToDTO(entity));
        }
        return dtoList;
    }

    public List<E> mapToEntity(List<D> dtoList) {
        List<E> entityList = new ArrayList<>();
        for (D dto : dtoList) {
            entityList.add(this.mapToEntity(dto));
        }
        return entityList;
    }

}
