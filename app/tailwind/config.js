/*global module*/
module.exports = {
  theme: {
    /** anything at the top level will replace tailwind default */
    fontFamily: {
      'display': [ 'Raleway', 'sans-serif' ],
      'body': [ 'Montserrat', 'sans-serif' ]
    },
    extend: {
      // anything in extend will be merged with tailwind defaults
      fontFamily: {
        'ultra': [ 'Ultras' ]
      }
    }
  },
  variants: {},
  plugins: []
}
