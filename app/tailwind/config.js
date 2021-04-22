/*global module require*/
module.exports = {
  darkMode: 'class',
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
        '112': '28rem',
        '128': '32rem',
        '144': '36rem'
      },
      cursor: {
        'zoom-in': 'zoom-in',
        'zoom-out': 'zoom-out'
      },
      backgroundImage: () => ({
        'marble': "url('/assets/images/marble_texture.png')",
      }),
      typography: (theme) => ({
        dark: {
          css: {
            color: theme('colors.white'),
            a: {
              color: theme('colors.red.500'),
              '&:hover': {
                color: theme('colors.red.500'),
              },
            },

            h1: {
              color: theme('colors.white'),
            },
            h2: {
              color: theme('colors.white'),
            },
            h3: {
              color: theme('colors.white'),
            },
            h4: {
              color: theme('colors.white'),
            },
            h5: {
              color: theme('colors.white'),
            },
            h6: {
              color: theme('colors.white'),
            },

            strong: {
              color: theme('colors.white'),
            },

            code: {
              color: theme('colors.white'),
            },

            figcaption: {
              color: theme('colors.white'),
            },
          },
        },
      })
    },
  },
  variants: {
    extend: {
      maxHeight: ['hover'],
      backgroundImage: ['dark'],
      typography: ["dark"]
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  purge: [
    './app/**/*.html',
    './app/**/*.hbs',
    './app/**/*.js'
  ],
};
