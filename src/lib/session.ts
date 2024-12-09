import GithubProvider from 'next-auth/providers/github'

const OPTIONS_SESSION  =  {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    })
  ]
}

export { OPTIONS_SESSION }