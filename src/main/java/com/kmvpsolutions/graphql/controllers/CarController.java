package com.kmvpsolutions.graphql.controllers;

import com.kmvpsolutions.graphql.services.CarService;
import graphql.ExecutionInput;
import graphql.ExecutionResult;
import graphql.GraphQL;
import graphql.schema.GraphQLSchema;
import io.leangen.graphql.GraphQLSchemaGenerator;
import io.leangen.graphql.metadata.strategy.query.AnnotatedResolverBuilder;
import io.leangen.graphql.metadata.strategy.value.jackson.JacksonValueMapperFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@RestController
@RequestMapping("/cars")
public class CarController {

    @Autowired
    private CarService service;

    private GraphQL graphQL;

    @PostConstruct
    public void init() {
        GraphQLSchema schema = new GraphQLSchemaGenerator()
                .withResolverBuilders(new AnnotatedResolverBuilder())
                .withBasePackages("com.kmvpsolutions.graphql")
                .withOperationsFromSingleton(this.service, CarService.class)
                .withValueMapperFactory(new JacksonValueMapperFactory())
                .generate();

        this.graphQL = GraphQL.newGraphQL(schema).build();
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Map<String, Object> endpoint(@RequestBody Map<String, String> request, HttpServletRequest raw) {
        ExecutionResult result = this.graphQL.execute(
                ExecutionInput.newExecutionInput()
                        .query(request.get("query"))
                        .operationName(request.get("operationName"))
                        .context(raw)
                        .build()
        );

        return result.toSpecification();
    }
}
