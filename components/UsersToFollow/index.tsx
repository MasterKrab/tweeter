import type UserToFollow from 'types/user-to-follow'
import { motion } from 'framer-motion'
import Item from 'components/UsersToFollow/Item'
import resetList from 'styles/resetList'
import asideItem, { asideItemAnimation } from 'styles/asideItem'

interface UsersToFollowProps {
  usersToFollow: UserToFollow[]
}

const UsersToFollow = ({ usersToFollow }: UsersToFollowProps) => (
  <>
    <motion.section className="aside-item" {...asideItemAnimation}>
      <h2 className="aside-item__title">Who to follow</h2>
      <ul className="aside-item__list">
        {usersToFollow.map((user) => (
          <Item key={user.id} {...user} />
        ))}
      </ul>
    </motion.section>
    <style jsx>{resetList}</style>
    <style jsx>{asideItem}</style>
  </>
)

export default UsersToFollow
