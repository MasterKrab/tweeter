import type Hashtag from 'types/hashtag'
import { motion } from 'framer-motion'
import kFormatter from 'utils/kFormatter'
import resetList from 'styles/resetList'
import asideItem, { asideItemAnimation } from 'styles/asideItem'

interface TrendsProps {
  hashtags: Hashtag[]
}

const Trends = ({ hashtags }: TrendsProps) => (
  <>
    <motion.section className="aside-item" {...asideItemAnimation}>
      <h2 className="aside-item__title">Trends for you</h2>
      <ul className="aside-item__list">
        {hashtags.map(({ id, name, tweetsCount }) => (
          <li className="aside-item__item" key={id}>
            <p className="aside-item__name">#{name}</p>
            <p className="aside-item__amount">
              {kFormatter(tweetsCount)} tweets
            </p>
          </li>
        ))}
      </ul>
    </motion.section>
    <style jsx>{resetList}</style>
    <style jsx>{asideItem}</style>
    <style jsx>{`
      .aside-item__name {
        margin-top: 0;
        margin-bottom: 0.5rem;
        font-weight: bold;
        color: var(--gray-4);
      }

      .aside-item__amount {
        margin-top: 0;
        margin-bottom: 0;
        font-size: 0.75rem;
      }
    `}</style>
  </>
)

export default Trends
