export interface User {
  id?: number;
  username: string;
  password?: string; // Password is optional, especially for updates
  role: string;
}