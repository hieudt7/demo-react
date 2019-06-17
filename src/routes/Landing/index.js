import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: '/s/:id',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const LandingView = require('./containers/LandingContainer').default
      const reducer = require('./modules/reducer').default

      /*  Add the reducer to the store on key 'posts'  */
      injectReducer(store, { key: 'landing', reducer })


      /*  Return getComponent   */
      cb(null, LandingView)

    /* Webpack named bundle   */
    }, 'landing')
  }
})
