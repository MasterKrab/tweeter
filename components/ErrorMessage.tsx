const ErrorMessage = ({ children }: JSX.IntrinsicElements['p']) => (
  <>
    <p className="error" role="alert">
      {children}
    </p>
    <style jsx>{`
      .error {
        font-size: 0.9rem;
        margin-top: 0;
        margin-bottom: 0;
        color: var(--red);
      }
    `}</style>
  </>
)

export default ErrorMessage
