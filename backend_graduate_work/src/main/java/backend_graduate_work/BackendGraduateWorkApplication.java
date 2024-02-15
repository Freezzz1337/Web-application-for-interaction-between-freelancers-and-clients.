package backend_graduate_work;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Base64;

@SpringBootApplication
public class BackendGraduateWorkApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendGraduateWorkApplication.class, args);
	}
	@Bean
	public Base64.Encoder base64Encoder() {
		return Base64.getEncoder();
	}
}
