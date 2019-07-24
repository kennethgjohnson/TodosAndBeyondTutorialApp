package com.kennethgjohnson.todosapp.unauthenticated.login;

import java.util.ArrayList;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BasicAuthenticationController {
	
	@GetMapping(path = "/api/login/basicauth")
	public UserPrincipal AuthenticatedUser() {
		ArrayList<String> resources=new ArrayList();
		resources.add("Welcome");
		resources.add("Todos");
		resources.add("TodosDelete");
		resources.add("TodosUpdate");
		resources.add("TodosCreate");
		return new UserPrincipal("gjohnson", resources);
	}	
	
	

}
