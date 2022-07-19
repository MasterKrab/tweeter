import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { wrapper } from 'app/store'
import { motion } from 'framer-motion'
import ProgressBar from 'components/ProgressBar'
import Header from 'components/Header'
import FloatingFocus from 'components/FloatingFocus'
import CustomCursor from 'components/CustomCursor'
import 'reflect-metadata'
import 'styles/normalize.css'
import '@fontsource/noto-sans'
import '@fontsource/poppins'
import 'styles/globals.css'

const App = ({ Component, pageProps, router: { route } }: AppProps) => (
  <SessionProvider session={pageProps.session}>
    <ProgressBar />
    <Header />
    <motion.div key={route} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <main className="main" data-route={route.slice(1)}>
        <Component {...pageProps} />
      </main>
    </motion.div>
    <FloatingFocus />
    <CustomCursor />
  </SessionProvider>
)

export default wrapper.withRedux(App)
