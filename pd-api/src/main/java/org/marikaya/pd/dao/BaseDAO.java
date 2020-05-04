package org.marikaya.pd.dao;

import org.marikaya.pd.dto.BaseDTO;
import org.marikaya.pd.entity.BaseEntity;
import org.marikaya.pd.mapper.BaseMapper;
import org.marikaya.pd.repository.BaseRepository;

import java.util.List;
import java.util.Optional;

public abstract class BaseDAO<
        E extends BaseEntity,
        D extends BaseDTO,
        K,
        R extends BaseRepository<D, E, K>,
        M extends BaseMapper<E, D>> {

    protected R repository;
    protected M mapper;

    public BaseDAO(R repository, M mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    public D findById(K id) {
        Optional<E> entity = this.repository.findById(id);
        if (entity.isPresent()) {
            return this.mapper.mapToDTO(entity.get());
        }
        return null;
    }

    public D save(D dto) {
        E e = this.mapper.mapToEntity(dto);
        E saved = this.repository.save(e);
        return this.mapper.mapToDTO(saved);
    }

    public List<D> findAll() {
        List<E> all = this.repository.findAll();
        return this.mapper.mapToDTO(all);
    }

}
