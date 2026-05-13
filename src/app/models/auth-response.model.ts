export interface AuthResult {
  accesToken: string;
  refreshToken: string;
  expiration: string;
}

export interface AuthResponse {
  result: AuthResult;
  success: boolean;
  message: string | null;
  statusCode: number;
  errors: any | null;
}
