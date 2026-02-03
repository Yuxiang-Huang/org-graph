import { betterAuth } from "better-auth";
import { genericOAuth, keycloak } from "better-auth/plugins";
import { env } from "../env.ts";

// https://www.better-auth.com/docs/installation#create-a-better-auth-instance
export const auth = betterAuth({
  // biome-ignore lint/style/useNamingConvention: defined by better-auth
  baseURL: env.SERVER_URL,
  trustedOrigins: [env.BETTER_AUTH_URL],
  advanced: {
    useSecureCookies: true,
    defaultCookieAttributes: {
      sameSite: "none", // allow cross-site cookies since web and server are on different domains
      secure: true,
    },
  },
  plugins: [
    // https://www.better-auth.com/docs/plugins/generic-oauth#pre-configured-provider-helpers
    genericOAuth({
      config: [
        keycloak({
          clientId: env.AUTH_CLIENT_ID,
          clientSecret: env.AUTH_CLIENT_SECRET,
          issuer: env.AUTH_ISSUER,
          // biome-ignore lint/style/useNamingConvention: defined by better-auth
          redirectURI: `${env.SERVER_URL}/api/auth/oauth2/callback/keycloak`,
          scopes: ["openid", "email", "profile", "offline_access"],
        }),
      ],
    }),
  ],
});
