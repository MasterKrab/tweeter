import Link from 'next/link'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import classnames from 'classnames'
import resetList from 'styles/resetList'

const Menu = () => {
  const router = useRouter()
  const { data: session } = useSession()

  return (
    <>
      <nav className="navigation">
        <ul className="main-menu">
          <li
            className={classnames({
              'main-menu__item': true,
              'main-menu__item--active': router.pathname === '/',
            })}
          >
            <Link href="/">
              <a className="main-menu__link">Home</a>
            </Link>
          </li>
          <li
            className={classnames({
              'main-menu__item': true,
              'main-menu__item--explore': true,
              'main-menu__item--active': router.pathname.startsWith('/explore'),
            })}
          >
            <Link href="/explore">
              <a className="main-menu__link ">Explore</a>
            </Link>
          </li>
          {session && (
            <motion.li
              className={classnames({
                'main-menu__item': true,
                'main-menu__item--bookmark': true,
                'main-menu__item--active':
                  router.pathname.startsWith('/bookmark'),
              })}
              initial={{ scale: 0.75, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <Link href="/bookmarks">
                <a className="main-menu__link">Bookmarks</a>
              </Link>
            </motion.li>
          )}
        </ul>
      </nav>
      <style jsx>{resetList}</style>
      <style jsx>{`
        .navigation {
          position: fixed;
          left: 0;
          bottom: 0;
          background-color: #fff;
          width: 100%;
          height: 4.269rem;
          padding: 0.5rem 1.333rem;
        }

        @media screen and (min-width: 48rem) {
          .navigation {
            position: static;
            width: auto;
          }
        }

        .main-menu {
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          gap: 0.5rem;
          height: 100%;
          font-size: 0.875rem;
          text-align: center;
          color: var(--gray);
        }

        @media screen and (min-width: 48rem) {
          .main-menu {
            gap: 5rem;
            width: 20.313rem;
          }
        }

        .main-menu__link {
          display: block;
          height: 100%;
          color: inherit;
        }

        :global(.main-menu__item) {
          position: relative;
          transition: color 1s ease-in-out;
        }

        @media screen and (min-width: 48rem) {
          :global(.main-menu__item::after) {
            content: '';
            position: absolute;
            top: 2.4rem;
            left: 0;
            width: 150%;
            height: 0.188rem;
            border-top-left-radius: 0.5rem;
            border-top-right-radius: 0.5rem;
            transform: translateX(-15%);
            transition: background-color 1s ease-in-out;
          }

          :global(.main-menu__item--active) {
            color: var(--blue);
          }

          :global(.main-menu__item--active::after) {
            background-color: var(--blue);
          }
        }

        @media screen and (max-width: 48rem) {
          :global(.main-menu__item) {
            background-image: url('/assets/images/home.svg');
            background-repeat: no-repeat;
            background-position: center;
            width: 100%;
            height: 2.573rem;
            color: transparent;
            border-radius: 0.5rem;
          }

          .main-menu__item--explore {
            background-image: url('/assets/images/explore.svg');
          }

          :global(.main-menu__item--bookmark) {
            background-image: url('/assets/images/bookmark-menu.svg');
          }

          @media (hover: hover) {
            .main-menu__item {
              transition: background-color 0.2s ease-in-out;
            }

            .main-menu__item:hover {
              background-color: var(--gray-light);
            }
          }
        }

        .underline {
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          height: 4px;
          border-radius: 15px;
          background: white;
          opacity: 0.85;
        }
      `}</style>
    </>
  )
}

export default Menu
