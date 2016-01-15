module.exports = {
  sass: {
    src: 'client/stylesheets/base.scss',
    partialsrc: 'client/stylesheets/**/*',
    dest: 'public/css',
    settings: {
      imagePath: 'assets/images', // Used by the image-url helper
      sourceComments: 'map'
    },
    sourcemaps: {
      includeContent: false,
      sourceRoot: 'client/stylesheets'
    }
  },
  webpack: {
    src: [
      'client/lib/app.js'
    ],
    dest: 'public/js',
    options: {
      output: {
        filename: 'app.js'
      }
    }
  },
  eslint: {
    target: [
      'client/lib/**/*.js'
    ]
  },
  mustache: {
    src: 'client/templates/index.html',
    dest: 'public'
  }
};
