package org.marikaya.pd.repository;

import org.marikaya.pd.dto.BaseDTO;
import org.marikaya.pd.entity.BaseEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BaseRepository<D extends BaseDTO, E extends BaseEntity, K> extends JpaRepository<E, K> {

}
