import Image from 'next/image'
import { motion } from 'framer-motion'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'
import Spinner from 'components/Spinner'
import resetButton from 'styles/resetButton'

export interface SearchForm {
  query: string
}

interface SearchBoxProps {
  onSearch: SubmitHandler<SearchForm>
  form: UseFormReturn<SearchForm>
}

const SearchBox = ({ onSearch, form }: SearchBoxProps) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = form

  return (
    <>
      <motion.form
        className="search-box"
        onSubmit={handleSubmit(onSearch)}
        initial={{ scale: 0.75, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <Image src="/assets/images/search.svg" alt="" width={17} height={17} />
        <input
          className="search-box__input"
          type="search"
          aria-label="Search"
          placeholder="Search"
          {...register('query')}
        />
        <button className="search-box__submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <Spinner
              ariaLabel="Searching"
              size="1.25rem"
              marginLeft="auto"
              marginRight="auto"
            />
          ) : (
            'Search'
          )}
        </button>
      </motion.form>
      <style jsx>{resetButton}</style>
      <style jsx>{`
        :global(.search-box) {
          display: grid;
          grid-template-columns: 1.5rem 1fr 4.5rem;
          gap: 0.5rem;
          background-color: #fff;
          padding: 0.692rem 0.683rem;
          height: 3.375rem;
          border-radius: 0.5rem;
          box-shadow: 0 0.188rem 0.25rem rgba(0, 0, 0, 0.05);
        }

        @media screen and (min-width: 48rem) {
          :global(.search-box) {
            grid-template-columns: 2.581rem 1fr 5.313rem;
          }
        }

        .search-box__input {
          background: none;
          padding: 0;
          width: 100%;
          height: 100%;
          border: none;
          color: var(--gray-3);
        }

        .search-box__input::placeholder {
          color: var(--gray-2);
        }

        .search-box__submit {
          background-color: var(--blue);
          font-size: 0.75rem;
          color: #fff;
          border-radius: 0.25rem;
        }
      `}</style>
    </>
  )
}

export default SearchBox
