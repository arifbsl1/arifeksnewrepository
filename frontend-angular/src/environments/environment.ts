export const environment = {
  production: false,
  // Add the base URL for your local development API
  apiUrl: 'http://localhost:8080/api',
  apiUrlEmployees: 'http://localhost:8080/api/employees',
  apiUrlUsers : 'http://localhost:8080/api/users',
  apiUrlOrder: 'http://localhost:8081/api/orders',
  apiUrlProduct: 'http://localhost:8082/api/products',
  apiUrlInventory: 'http://localhost:8083/api/inventory', 
  tokenKey: 'auth_token',
  // Add the roles array here
  roles: ['ADMIN', 'SUPERVISOR', 'ENGINEER', 'USER']
};