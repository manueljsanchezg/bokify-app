
export interface registerRequest {
    email: String,
    password: String
}

export interface loginResponse {
    jwt: String,
    userId: String,
    email: String,
    role: String

}