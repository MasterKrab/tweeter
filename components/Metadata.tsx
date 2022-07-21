import Head from 'next/head'

interface MetadataProps {
  title?: string
  description?: string
}

const Metadata = ({
  title,
  description = 'Share your thoughts with the world.',
}: MetadataProps) => (
  <Head>
    <title>{title ? `${title} | Tweeter` : 'Tweeter'}</title>
    <meta name="description" content={description} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={process.env.NEXT_PUBLIC_URL} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="twitter:url" content={process.env.NEXT_PUBLIC_URL} />
    <meta property="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
  </Head>
)

export default Metadata
