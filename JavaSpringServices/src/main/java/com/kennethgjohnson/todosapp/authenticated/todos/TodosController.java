package com.kennethgjohnson.todosapp.authenticated.todos;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
public class TodosController {

	@Autowired
	private TodoHardCodedGateway todoGateway;

	@GetMapping(path = "/api/user/{username}/todos")
	public List<Todo> GetAllTodosForUser(@PathVariable String username) {
		return todoGateway.findAllByUsername(username);
	}

	@DeleteMapping(path = "/api/user/{username}/todos/{id}")
	public ResponseEntity<Void> DeleteTodo(@PathVariable String username, @PathVariable long id) {
		Todo todo = todoGateway.deleteById(id);
		if (todo != null) {
			return ResponseEntity.noContent().build();
		}

		return ResponseEntity.notFound().build();

	}
	
	@GetMapping(path = "/api/user/{username}/todos/{id}")
	public ResponseEntity<Todo> GetTodo(@PathVariable String username, @PathVariable long id) {
		Todo todo = todoGateway.findById(id);
		if (todo == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(todo);

	}
	
	@PutMapping(path = "/api/user/{username}/todos/{id}")
	public ResponseEntity<Todo> UpdateTodo(@PathVariable String username, @PathVariable long id, @RequestBody Todo todo) {
		todo.setId(id);
		todo.setUsername(username);
		return ResponseEntity.ok(todoGateway.save(todo));
	}
	
	@PostMapping(path = "/api/user/{username}/todos")
	public ResponseEntity<Void> UpdateTodo(@PathVariable String username, @RequestBody Todo todo) {
		todo.setId(-1);
		todo.setUsername(username);
		Todo createdTodo=todoGateway.save(todo);
		URI uri=ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createdTodo.getId()).toUri();
		return ResponseEntity.created(uri).build();
	}

	
	
}
