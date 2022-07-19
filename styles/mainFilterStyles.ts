import css from 'styled-jsx/css'

const mainFilterStyles = css`
  :global(.main) {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  @media screen and (min-width: 64rem) {
    :global(.main) {
      grid-template-columns: 19rem 1fr;
    }
  }
`

export default mainFilterStyles
