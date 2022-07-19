import { useState, useEffect, useId } from 'react'
import { motion } from 'framer-motion'
import classnames from 'classnames'
import removeNoAlphaNumeric from 'utils/removeNoAlphaNumeric'
import visuallyHidden from 'styles/visuallyHidden'

interface FilterProps {
  value: string
  onChange: (value: string) => void
  values: string[]
  texts: {
    [key: string]: string
  }
}

const Filter = ({ value, onChange, values, texts }: FilterProps) => {
  const [filter, setFilter] = useState(value)

  const id = useId()
  const normalizedId = removeNoAlphaNumeric(id)

  useEffect(() => {
    onChange(filter)
  }, [filter, onChange])

  return (
    <>
      <motion.fieldset
        className="filter"
        aria-label="Filter tweets"
        initial={{ scale: 0.75, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        {values.map((currentFilter) => {
          const itemId = `filter-${normalizedId}-${currentFilter}-label`

          const checked = currentFilter === filter

          return (
            <label
              className={classnames({
                filter__item: true,
                'filter__item--checked': checked,
              })}
              key={itemId}
              id={itemId}
            >
              <input
                className="visually-hidden"
                type="radio"
                name="filter"
                focus-target={itemId}
                value={currentFilter}
                checked={checked}
                onChange={() => setFilter(currentFilter)}
              />
              {texts[currentFilter]}
            </label>
          )
        })}
      </motion.fieldset>
      <style jsx>{visuallyHidden}</style>
      <style jsx>{`
        :global(.filter) {
          display: flex;
          flex-direction: column;
          gap: 1.125rem;
          background-color: #fff;
          height: min-content;
          padding-top: 1.284rem;
          padding-bottom: 1.284rem;
          color: var(--gray);
          border: none;
          box-shadow: 0 0.188rem 0.25rem rgba(0, 0, 0, 0.05);
        }

        .filter__item {
          position: relative;
          display: flex;
          align-items: center;
          height: 2rem;
          padding-left: 1.063rem;
        }

        .filter__item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 0.188rem;
          height: 100%;
          border-top-right-radius: 0.25rem;
          border-bottom-right-radius: 0.25rem;
          transition: background-color 0.25s;
        }

        .filter__item--checked {
          color: var(--blue);
        }

        .filter__item--checked::before {
          background-color: var(--blue);
        }

        @media (hover: hover) {
          .filter__item:hover::before {
            background-color: var(--gray);
          }

          .filter__item--checked:hover::before {
            background-color: var(--blue);
          }
        }
      `}</style>
    </>
  )
}

export default Filter
