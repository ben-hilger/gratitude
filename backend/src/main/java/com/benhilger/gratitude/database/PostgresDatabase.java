package com.benhilger.gratitude.database;

import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.Map;

@Configuration
public class PostgresDatabase {

    @Bean
    public Connection getConnection() {
        Map<String, String> env = System.getenv();
        try {
            DataSourceBuilder<?> builder = DataSourceBuilder.create();
            builder.driverClassName(env.get("DB_DRIVER_CLASS"));
            builder.url(env.get("DB_URL"));
            builder.username(env.get("DB_USER"));
            builder.password(env.get("DB_PASS"));
            return builder.build().getConnection();
        } catch (SQLException exception) {
            System.out.println("unable to connect to database: " + exception.getMessage());
            System.exit(1);
            return null;
        }
    }

}

