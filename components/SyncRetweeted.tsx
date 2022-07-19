import Image from 'next/image'

interface SyncRetweetedProps {
  name: string
  id?: string
}

const SyncRetweeted = ({ name, id }: SyncRetweetedProps) => (
  <>
    <h2 className="title" id={id}>
      <Image src="/assets/images/sync.svg" width={17} height={17} alt="Sync" />
      {name} Retweeted
    </h2>
    <style jsx>{`
      .title {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        margin-top: 0;
        margin-bottom: 0;
        font-weight: normal;
        font-size: 0.875rem;
        color: var(--gray);
      }
    `}</style>
  </>
)

export default SyncRetweeted
