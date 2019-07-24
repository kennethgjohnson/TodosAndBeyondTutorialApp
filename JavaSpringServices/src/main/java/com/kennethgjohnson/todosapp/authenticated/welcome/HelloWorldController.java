package com.kennethgjohnson.todosapp.authenticated.welcome;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;



@RestController
public class HelloWorldController {

	@GetMapping(path = "/api/hello-world/{name}")
	public String HelloWorld(@PathVariable String name) {
		return String.format("Hello World %s!", name);
	}
	
	@GetMapping(path = "/api/hello-world-bean/{name}")
	public HelloWorldBean HelloWorldBean(@PathVariable String name) {
		return new HelloWorldBean(String.format("Hello World %s!", name));
	}	
	
	

}
