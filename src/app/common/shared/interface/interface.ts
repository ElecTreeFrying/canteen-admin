export interface User {
  email: string;
  password: string;
  repeatPassword: string;
  firstName: string;
  lastName: string;
  employeeId: number;
}

export interface SignIn {
  email: string;
  password: string;
}
