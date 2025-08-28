import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Swal from "sweetalert2";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "email", type: "email", placeholder: "test@test.com" },
        password: { label: "Password", type: "password", placeholder: "****" },
      },
      async authorize(credentials, req) {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

        if (!backendUrl) {
          console.error("La variable de entorno NEXT_PUBLIC_BACKEND_URL no está definida.");
          return null;
        }

        try {
          new URL(backendUrl);
        } catch (error) {
          console.error(`La URL del backend proporcionada ('${backendUrl}') no es una URL válida.`);
          return null;
        }

        try {
          const res = await fetch(`${backendUrl}/auth`, {
            method: "POST",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: { "Content-Type": "application/json" },
          });

          if (!res.ok) {
            const errorBody = await res.text();
            console.error(`Error de autenticación del backend: ${res.status} ${res.statusText}`, errorBody);
            return null;
          }

          const user = await res.json();

          if (user) {
            return user;
          }
          
          return null;

        } catch (error) {
          console.error("Error al conectar con el servicio de autenticación:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
