export interface LoginRequest {
  client_id: string;
  client_secret: string;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  token_type: string;
}