const purgecss = require('@fullhuman/postcss-purgecss')({
    content: [
      './src/**/*.html',
      './src/**/*.ts' // Inclut également les fichiers TypeScript
    ],
    defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
  });
  
  module.exports = {
    plugins: [
      require('autoprefixer'),
      ...process.env.NODE_ENV === 'production' ? [purgecss] : []
    ]
  };
  