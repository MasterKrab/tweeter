import css from 'styled-jsx/css'

export const asideItemAnimation = {
  initial: { top: 10, opacity: 0 },
  animate: { top: 0, opacity: 1 },
  transition: { duration: 0.25, ease: 'easeInOut' },
}

const asideItem = css`
  :global(.aside-item) {
    position: relative;
    background-color: #fff;
    padding: 0.682rem 1.25rem 1.064rem;
    font-family: var(--font-secondary);
    border-radius: 0.5rem;
    box-shadow: 0 0.188rem 0.25rem rgba(0, 0, 0, 0.05);
  }

  .aside-item__title {
    margin-top: 0;
    margin-bottom: 0.5rem;
    padding-bottom: 0.5rem;
    font-size: 0.75rem;
    border-bottom: 1px solid var(--gray-light-2);
  }

  .aside-item__list {
    margin-top: 1.5rem;
  }

  .aside-item__item {
    margin-bottom: 1.5rem;
  }
`

export default asideItem
