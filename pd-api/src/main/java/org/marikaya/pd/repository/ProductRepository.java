package org.marikaya.pd.repository;

import org.marikaya.pd.dto.ProductDTO;
import org.marikaya.pd.entity.ProductEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends BaseRepository<ProductDTO, ProductEntity, Long> {
}
