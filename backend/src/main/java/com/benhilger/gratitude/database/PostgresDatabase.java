package com.benhilger.gratitude.database;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.sql.Connection;
import java.sql.SQLException;

@Configuration
public class PostgresDatabase {

    @Autowired
    private Database environment;

    @Bean
    public Connection getConnection() {
        try {
            DataSourceBuilder<?> builder = DataSourceBuilder.create();
            builder.driverClassName(this.environment.getDriverClassName());
            builder.url(this.environment.getUrl());
            builder.username(this.environment.getUsername());
            builder.password(this.environment.getPassword());
            return builder.build().getConnection();
        } catch (SQLException exception) {
            System.out.println("unable to connect to database: " + exception.getMessage());
            System.exit(1);
            return null;
        }
    }

}

