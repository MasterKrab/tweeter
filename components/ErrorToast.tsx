interface ErrorToastProps {
  message: string
}

const ErrorToast = ({ message }: ErrorToastProps) => (
  <>
    <p className="error-toast">{message}</p>
    <style jsx>{`
      @keyframes show {
        0% {
          transform: translateX(150%);
        }
        20% {
          transform: translateX(0);
        }
        80% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(150%);
        }
      }

      .error-toast {
        position: fixed;
        top: 0;
        right: 0;
        z-index: 10000;
        background-color: var(--red);
        padding: 0.5rem 1rem;
        margin: 1rem;
        color: #fff;
        border-radius: 0.5rem;
        animation: show 3s ease forwards;
      }
    `}</style>
  </>
)

export default ErrorToast
