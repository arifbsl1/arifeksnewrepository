export const environment = {
  production: true,
  // Add the base URL for your local development API
  apiUrl: 'http://localhost:8080/api',
  apiUrlEmployees: 'http://localhost:8080/api/employees',
  apiUrlUsers : 'http://localhost:8080/api/users',
  apiUrlOrder: 'http://localhost:8081/api/orders',
  apiUrlProduct: 'http://localhost:8082/api/products',
  tokenKey: 'auth_token',
  // Add the roles array here
  roles: ['ADMIN', 'SUPERVISOR', 'ENGINEER', 'USER']
};