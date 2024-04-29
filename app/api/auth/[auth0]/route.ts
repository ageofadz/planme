import { handleAuth, handleLogin } from '@auth0/nextjs-auth0'

export const GET = handleAuth({
  login: handleLogin({
    authorizationParams: {
      audience: 'planmi-auth', // or AUTH0_AUDIENCE
      scope: 'openid profile email offline_access read:products' // or AUTH0_SCOPE
    }
  })
})
