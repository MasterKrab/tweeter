import type { NextApiHandler } from 'next'
import NextAuth, { Session, User } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GitHubProvider from 'next-auth/providers/github'
import GitlabProvider from 'next-auth/providers/gitlab'
import prisma from 'lib/db/prisma'

const authHandler: NextApiHandler = (req, res) =>
  NextAuth(req, res, {
    providers: [
      GitHubProvider({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      }),
      GitlabProvider({
        clientId: process.env.GITLAB_CLIENT_ID,
        clientSecret: process.env.GITLAB_CLIENT_SECRET,
      }),
    ],
    adapter: PrismaAdapter(prisma),
    callbacks: {
      session: ({ session, user }: { session: Session; user: User }) => {
        session.user.id = user.id
        return session
      },
    },
  })

export default authHandler
