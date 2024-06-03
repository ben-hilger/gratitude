package com.benhilger.gratitude;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@ConfigurationPropertiesScan
@SpringBootApplication
public class GratitudeApplication {

	public static void main(String[] args) {
		SpringApplication.run(GratitudeApplication.class, args);
	}

}
