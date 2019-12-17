export default {
  getTodos: async () => {
    const response = await fetch('/employee')
    return response.json()
  },
  deleteEmployee: async (_id) => {
    const response = await fetch(`/employee/${_id}`, {method: 'delete'})
    return response.json()
  },
  updateEmployee: async (employee) => {
    const request = {
      method: 'put', 
      body: JSON.stringify(employee),
      headers: {'Content-Type': 'application/json'}
    }
    const response = await fetch(`/employee/${employee._id}`, request)
    return response.json()
  },
  createEmployee: async (employee) => {
    const request = {
      method: 'post', 
      body: JSON.stringify(employee),
      headers: {'Content-Type': 'application/json'}
    }
    const response = await fetch('/employee', request)
    return response.json()
  }
}