import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions = {
  secret: process.env.NEXTAUTH_SECRET || 'lab2-development-secret',
  trustHost: true,
  session: {
    strategy: 'jwt'
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || 'github-client-id',
      clientSecret: process.env.GITHUB_SECRET || 'github-client-secret'
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'google-client-id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'google-client-secret'
    }),
    CredentialsProvider({
      name: 'Demo Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (credentials?.email === 'demo@lab2.dev' && credentials?.password === 'password123') {
          return {
            id: 'demo-user',
            name: 'Demo User',
            email: credentials.email,
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80'
          };
        }

        return null;
      }
    })
  ],
  pages: {
    signIn: '/signin'
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.user = user;
      }

      if (account?.provider && !token.provider) {
        token.provider = account.provider;
      }

      if (profile?.login && !token.username) {
        token.username = profile.login;
      }

      return token;
    },
    async session({ session, token }) {
      if (token?.user) {
        session.user = token.user;
      }

      if (token?.provider) {
        session.provider = token.provider;
      }

      if (token?.username) {
        session.username = token.username;
      }

      return session;
    }
  }
};

export default authOptions;