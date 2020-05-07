package org.marikaya.pd.controller;

import org.marikaya.pd.dao.ProductDAO;
import org.marikaya.pd.dto.ProductDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "products")
public class ProductsController {

    private static final Logger logger = LoggerFactory.getLogger(ProductsController.class);

    private final ProductDAO productDAO;

    @Autowired
    public ProductsController(ProductDAO productDAO) {
        this.productDAO = productDAO;
    }

    @RequestMapping
    public List<ProductDTO> products() {
        return this.productDAO.findAll();
    }

    @RequestMapping(path = "/{id}")
    public ProductDTO getProduct(
            @PathVariable("id") Long productId) {
        return this.productDAO.findById(productId);
    }

    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public ProductDTO saveProduct(Authentication authentication, @RequestBody ProductDTO productDTO) {
        ProductDTO savedProductDTO = this.productDAO.save(productDTO);
        String loggedUserEmail = (String) authentication.getPrincipal();
        if (logger.isInfoEnabled()) {
            logger.info("[ProductsController][saveProduct] -> Product >> {} is updated by >> {}", savedProductDTO.getId(), loggedUserEmail);
        }
        return savedProductDTO;
    }
}
