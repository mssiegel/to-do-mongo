export default {
  getTodos: async () => {
    const response = await fetch('/api/todos')
    const todos = await response.json()
    const categories = {
      Blocked: [],
      Todo: [],
      "In-Progress": [],
      Completed: []
    }
    for (const todo of todos) 
      categories[todo.category].push(todo)
    return categories
  },
  deleteTodo: async (_id) => {
    const response = await fetch(`/api/todos/${_id}`, {method: 'delete'})
    return response.json()
  },
  addTodo: async (todo) => {
    const request = {
      method: 'post', 
      body: JSON.stringify(todo),
      headers: {'Content-Type': 'application/json'}
    }
    const response = await fetch('/api/todos', request)
    return response.json()
  }
}