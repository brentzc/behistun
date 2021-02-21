/*global module*/
module.exports = {
  theme: {
    /** anything at the top level will replace tailwind default */
    fontFamily: {
      display: ['Raleway', 'sans-serif'],
      body: ['Montserrat', 'sans-serif'],
    },
    maxWidth: {
      '1/4': '25%',
      '1/3': '33%',
      '1/2': '50%',
      '3/4': '75%',
    },
    container: {
      maxWidth: {
        lg: '1024px'
      }
    },
    extend: {
      // anything in extend will be merged with tailwind defaults
      fontFamily: {
        ultra: ['Ultras'],
      },
      padding: {
        'full': '100%'
      },
      maxHeight: {
        '124': '28rem'
      },
      cursor: {
        'zoom-in': 'zoom-in',
        'zoom-out': 'zoom-out'
      },
      backgroundImage: () => ({
        'marble': "url('/assets/images/marble_texture.png')"
      })
    },
  },
  variants: {
    extend: {
      maxHeight: ['hover']
    }
  },
  corePlugins: {
    container: false
  },
  plugins: [
    ({ addComponents, theme }) => {
      addComponents({
        ".container": {
          width: "100%",
          "@screen sm": {
            "maxWidth": theme("screens.sm")
          },
          "@screen md": {
            "maxWidth": theme("screens.md")
          },
          "@screen lg": {
            "maxWidth": theme("screens.lg")
          },
          "@screen xl": {
            "maxWidth": theme("screens.lg")
          }
        }
      })
    }
  ],
  purge: [
    './app/**/*.html',
    './app/**/*.hbs',
    './app/**/*.js'
  ],
};
