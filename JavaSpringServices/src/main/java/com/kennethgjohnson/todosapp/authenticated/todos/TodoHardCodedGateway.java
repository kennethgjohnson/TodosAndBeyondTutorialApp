package com.vio.in28.todos.authenticated.todos;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Component;

@Component
public class TodoHardCodedGateway {

	private static List<Todo> todos = new ArrayList<>();
	
	private static int idCounter = 0;
	static {
		todos.add(new Todo(++idCounter, "gjohnson", "Learn Angular", new Date(), false));
		todos.add(new Todo(++idCounter, "gjohnson", "Eat Dinner", new Date(), false));
		todos.add(new Todo(++idCounter, "gjohnson", "Play Games", new Date(), false));
	}
	
	public List<Todo> findAllByUsername(String username) {
		return todos;
	}

	public Todo deleteById(long id) {
		Todo todo=findById(id);
		if (todo == null) return null;
		
		if (!todos.remove(todo)) return null;
		
		return todo;
	}

	public Todo findById(long id) {
		for (Todo todo:todos) {
			if (todo.getId()==id) return todo;
		}
		return null;
	}

	public Todo save(Todo todo) {
		if (this.isNewTodo(todo)) {
			todo.setId(++idCounter);
			todos.add(todo);
			return todo;
		} else {
			Todo todoToUpdate=findById(todo.getId());
			todoToUpdate.setDescription(todo.getDescription());
			todoToUpdate.setDone(todo.isDone());
			todoToUpdate.setTargetDate(todo.getTargetDate());
			todoToUpdate.setUsername(todo.getUsername());
			return todoToUpdate;
		}
	}
	
	private boolean isNewTodo(Todo todo) {
		return ((todo.getId()==-1) || (todo.getId()==0));
		
	}
}
