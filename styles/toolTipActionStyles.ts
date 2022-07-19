import css from 'styled-jsx/css'

const toolTipActionStyles = css`
  .action {
    display: flex;
    align-items: center;
    gap: 0.729rem;
    width: 100%;
    padding: 0.703rem 0.834rem;
    text-align: start;
    font-size: 0.75rem;
    border-radius: 0.5rem;
  }

  @media (hover: hover) {
    .action {
      transition: background-color 0.2s ease-in-out;
    }

    .action:hover {
      background-color: var(--gray-light);
    }
  }
`

export default toolTipActionStyles
