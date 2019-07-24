package com.vio.in28.todos.unauthenticated.login;

import java.util.List;

public class UserPrincipal {

	private String username;
	private List<String> resources; 
	
	public UserPrincipal(String username, List<String> resources) {
		this.setUsername(username);
		this.setResources(resources);
	}
	
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public List<String> getResources() {
		return resources;
	}

	public void setResources(List<String> resources) {
		this.resources = resources;
	}

	@Override
	public String toString() {
		return String.format("UserPrincipal [username=%s]", username);
	}

}
