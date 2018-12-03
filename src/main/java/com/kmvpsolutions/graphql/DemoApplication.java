package com.kmvpsolutions.graphql;

import com.kmvpsolutions.graphql.entities.Car;
import com.kmvpsolutions.graphql.services.CarService;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.stream.Stream;

@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    @Bean
    ApplicationRunner init(CarService service) {
        return args -> {
            Stream.of("Ferrari", "Jaguar", "Honda", "Lamborghini").forEach(
                    name -> {
                        service.save(new Car(name));
                    }
            );

            service.getCars().forEach(System.out::println);
        };
    }
}
