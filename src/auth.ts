import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { login } from "./actions/login";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const values = { email, password };

          const user = await login(values);
          // console.log(user);
          if (!user) return null;
          return user.user;
        }
        return null;
      },
    }),
  ],
});

/**
 * This function checks if the user credentials are valid and access token is valid
 * - req is the cookies for next/server
 * @param req
 * @type {string | null}
 * @returns
 */

// export async function getCredentials(req: ReadonlyRequestCookies) {
//   // getting the token from the cookie
//   let tokens = req.get("access_token")?.value;
//   if (!tokens) return null;
//   // const decodedToken = jwtDecode(tokens);
//   const credentials = { token: tokens, expires: decodedToken.exp };
//   return credentials;
// }
