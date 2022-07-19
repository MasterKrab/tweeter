import Link from 'next/link'
import { useSession } from 'next-auth/react'
import Menu from 'components/Menu'
import User from 'components/User'
import SignInTooltip from 'components/SignIn'

const Header = () => {
  const { data: session } = useSession()

  return (
    <>
      <header className="header">
        <Link href="/">
          <a>
            <picture>
              <source
                srcSet="/assets/images/tweeter-small.svg"
                type="image/svg+xml"
              />
              <source
                srcSet="/assets/images/tweeter.svg"
                type="image/svg+xml"
                media="(min-width: 765px)"
              />
              <img src="/assets/images/tweeter-small.png" alt="Tweeter" />
            </picture>
          </a>
        </Link>
        <Menu />
        {session ? <User /> : <SignInTooltip />}
      </header>
      <style jsx>{`
        .header {
          position: sticky;
          left: 0;
          z-index: 1000;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #fff;
          height: var(--header-height);
          padding: 1.231rem 1.333rem;
        }
      `}</style>
    </>
  )
}

export default Header
