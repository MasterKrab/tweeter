import css from 'styled-jsx/css'

const visuallyHidden = css`
  .visually-hidden {
    position: absolute;
    left: -9999px;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`

export default visuallyHidden
