package org.marikaya.pd.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Table(name = "PD_PRODUCT")
@Entity
public class ProductEntity extends BaseEntity {

    @Column(name = "NAME", length = 60)
    private String name;

    @Column(name = "PRICE")
    private Double price;

    @Column(name = "AVAILABLE")
    private Boolean available;

    @Column(name = "DESCRIPTION", length = 1500)
    private String description;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Boolean getAvailable() {
        return available;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
