package com.kmvpsolutions.graphql.services;

import com.kmvpsolutions.graphql.entities.Car;
import com.kmvpsolutions.graphql.repository.CarRepository;
import io.leangen.graphql.annotations.GraphQLContext;
import io.leangen.graphql.annotations.GraphQLMutation;
import io.leangen.graphql.annotations.GraphQLQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CarService {

    @Autowired
    private CarRepository repository;
    @Autowired
    private GiphyService giphyService;

    @GraphQLQuery(name = "cars", description = "Query all cars on the database")
    public List<Car> getCars() {
        return this.repository.findAll();
    }

    @GraphQLQuery(name = "car", description = "Query specific car")
    public Optional<Car> getById(Long id) {
        return this.repository.findById(id);
    }

    @GraphQLMutation(name = "saveCar", description = "Save a car to the database")
    public Car save(Car car) {
        return this.repository.save(car);
    }

    @GraphQLMutation(name = "deleteCar", description = "Delete a car from the database")
    public boolean delete(Long id) {
        this.repository.deleteById(id);
        return true;
    }

    @GraphQLQuery(name = "isCool")
    public boolean isCool(@GraphQLContext Car car) {
        return !car.getName().equals("Ferrari") &&
                !car.getName().equals("Honda");
    }

    @GraphQLQuery(name = "giphyUrl")
    public String getGiphyUrl(@GraphQLContext Car car) {
        return this.giphyService.getGiphyUrl(car.getName());
    }
}