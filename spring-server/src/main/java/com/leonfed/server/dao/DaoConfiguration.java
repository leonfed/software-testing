package com.leonfed.server.dao;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.sql.DataSource;
import java.beans.PropertyVetoException;

@Configuration
@PropertySource(value= {"classpath:application.properties"})
public class DaoConfiguration {
    private final Environment environment;

    public DaoConfiguration(Environment environment) {
        this.environment = environment;
    }

    @Bean
    public DataSource datasource() throws PropertyVetoException {
        final DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName(environment.getProperty("spring.datasource.driver-class-name"));
        dataSource.setUrl(environment.getProperty("spring.datasource.url"));
        dataSource.setUsername(environment.getProperty("spring.datasource.username"));
        dataSource.setPassword(environment.getProperty("spring.datasource.password"));
        return dataSource;
    }

    @Bean
    public UserDao jdbcUserDao(DataSource dataSource) {
        return new JdbcUserDao(dataSource);
    }
}
