package org.marikaya.pd.dao;

import org.marikaya.pd.dto.ProductDTO;
import org.marikaya.pd.entity.ProductEntity;
import org.marikaya.pd.mapper.ProductMapper;
import org.marikaya.pd.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ProductDAO extends BaseDAO<ProductEntity, ProductDTO, Long, ProductRepository, ProductMapper> {

    @Autowired
    public ProductDAO(ProductRepository repository, ProductMapper mapper) {
        super(repository, mapper);
    }
}
