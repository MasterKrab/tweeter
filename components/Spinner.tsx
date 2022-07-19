interface SpinnerProps {
  ariaLabel?: string
  size?: string
  borderWidth?: string
  primaryColor?: string
  secondaryColor?: string
  marginTop?: string
  marginLeft?: string
  marginRight?: string
  marginBottom?: string
}

const Spinner = ({
  ariaLabel = 'Loading',
  size = '5rem',
  borderWidth = '0.25rem',
  primaryColor = 'var(--gray-light-3)',
  secondaryColor = 'var(--gray-2)',
  marginTop,
  marginLeft,
  marginRight,
  marginBottom,
}: SpinnerProps) => (
  <>
    <p className="spinner" role="alert" aria-label={ariaLabel}></p>
    <style jsx>{`
      .spinner {
        margin: 0;
        border-radius: 50%;
        border-style: solid;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        0% {
          transform: rotate(0);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `}</style>
    <style jsx>{`
      .spinner {
        width: ${size};
        height: ${size};
        border-width: ${borderWidth};
        border-color: ${primaryColor};
        border-top-color: ${secondaryColor};
        ${marginTop ? `margin-top: ${marginTop};` : ''}
        ${marginLeft ? `margin-left: ${marginLeft};` : ''}
        ${marginRight ? `margin-right: ${marginRight};` : ''}
        ${marginBottom ? `margin-bottom: ${marginBottom};` : ''};
      }
    `}</style>
  </>
)

export default Spinner
