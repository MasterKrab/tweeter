import Router from 'next/router'

const createPushClickEvents = (route: string) => ({
  onClick: () => Router.push(route),
  onMouseEnter: () => Router.prefetch(route),
})

export default createPushClickEvents
