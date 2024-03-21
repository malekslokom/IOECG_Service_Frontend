package com.rid.ioecg_app.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry
                .addResourceHandler("/static/assets/**")
                .addResourceLocations("classpath:/static/assets/");
        registry
                .addResourceHandler("/static/frontend/**")
                .addResourceLocations("classpath:/static/frontend/");
    }
}
