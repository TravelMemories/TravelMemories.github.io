package sr.tm.configurations;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import sr.tm.models.*;

@Configuration
public class DataRestConfig implements RepositoryRestConfigurer {
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        config.exposeIdsFor(Likes.class);
        config.exposeIdsFor(User.class);
        config.exposeIdsFor(Photo.class);
        config.exposeIdsFor(Stage.class);
        config.exposeIdsFor(Travel.class);
        String theAllowedOrigins = "http://localhost:8080";
        cors.addMapping(config.getBasePath() + "/**" ).allowedOrigins(theAllowedOrigins);
    }
}
