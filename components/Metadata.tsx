import Head from 'next/head'
import isProduction from 'utils/isProduction'

interface MetadataProps {
  title?: string
  description?: string
}

const Metadata = ({
  title,
  description = 'Share your thoughts with the world.',
}: MetadataProps) => {
  const protocol = isProduction ? 'https' : 'http'
  const url = `${protocol}://${process.env.NEXT_PUBLIC_VERCEL_URL}`

  return (
    <Head>
      <title>{title ? `${title} | Tweeter` : 'Tweeter'}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Head>
  )
}

export default Metadata
