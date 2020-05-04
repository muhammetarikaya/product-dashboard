package org.marikaya.pd.util;

import org.marikaya.pd.dao.ProductDAO;
import org.marikaya.pd.dao.UserDAO;
import org.marikaya.pd.dto.ProductDTO;
import org.marikaya.pd.dto.UserDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class MockDataGenerator {
    private static final Logger logger = LoggerFactory.getLogger(MockDataGenerator.class);
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public MockDataGenerator(BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Bean
    CommandLineRunner generateData(UserDAO userDAO, ProductDAO productDAO) {
        return (args) -> {
            if (logger.isInfoEnabled()) {
                logger.info("[MockDataGenerator][generateData] -> User is being created");
            }
            UserDTO userDTO = new UserDTO();
            userDTO.setTitle("Mr.");
            userDTO.setFullName("Muhammet ARIKAYA");
            userDTO.setEmail("m.arikayaw@gmail.com");
            userDTO.setPassword(bCryptPasswordEncoder.encode("password"));

            userDTO = userDAO.save(userDTO);


            ProductDTO productDTO = new ProductDTO();
            productDTO.setName("Product 1");
            productDTO.setAvailable(true);
            productDTO.setPrice(12.99);
            productDTO.setDescription("The Most Beautiful Product In The World @1");

            productDAO.save(productDTO);

            ProductDTO productDTO2 = new ProductDTO();
            productDTO2.setName("Product 2");
            productDTO2.setAvailable(true);
            productDTO2.setPrice(1.99);
            productDTO2.setDescription("The Most Beautiful Product In The World @2");

            productDAO.save(productDTO2);

            ProductDTO productDTO3= new ProductDTO();
            productDTO3.setName("Product 3");
            productDTO3.setAvailable(true);
            productDTO3.setPrice(16.99);
            productDTO3.setDescription("The Most Beautiful Product In The World @3");

            productDAO.save(productDTO3);

        };
    }
}
