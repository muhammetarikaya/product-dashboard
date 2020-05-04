package org.marikaya.pd.mapper;

import org.marikaya.pd.dto.ProductDTO;
import org.marikaya.pd.entity.ProductEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component
@Scope("singleton")
public class ProductMapper extends BaseMapper<ProductEntity, ProductDTO> {
    private static final Logger logger = LoggerFactory.getLogger(ProductMapper.class);

    @Override
    public ProductDTO mapToDTO(ProductEntity entity) {
        ProductDTO dto = new ProductDTO();
        dto.setName(entity.getName());
        dto.setPrice(entity.getPrice());
        dto.setAvailable(entity.getAvailable());
        dto.setDescription(entity.getDescription());
        this.mapCommons(dto, entity);
        if (logger.isTraceEnabled()) {
            logger.trace("[ProductMapper][mapToDTO] ENTITY >> [{}], DTO >> [{}]", entity, dto);
        }
        return dto;
    }

    @Override
    public ProductEntity mapToEntity(ProductDTO dto) {
        ProductEntity entity = new ProductEntity();
        entity.setName(dto.getName());
        entity.setPrice(dto.getPrice());
        entity.setAvailable(dto.getAvailable());
        entity.setDescription(dto.getDescription());
        this.mapCommons(entity, dto);
        if (logger.isTraceEnabled()) {
            logger.trace("[ProductMapper][mapToEntity] ENTITY >> [{}], DTO >> [{}]", entity, dto);
        }
        return entity;
    }
}
