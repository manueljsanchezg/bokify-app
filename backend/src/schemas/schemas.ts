import S from "fluent-json-schema";

// The login and register request are the same, we will use the same body

const loginBody = S.object()
    .prop('email', S.string().format(S.FORMATS.EMAIL).required())
    .prop('password', S.string().minLength(4).required())

export const loginSchema = {
    body: loginBody
}

const authorizedHeaders = S.object()
    .prop('Authorization', S.string().required())

export const authorizedSchema = {
    headers: authorizedHeaders
};