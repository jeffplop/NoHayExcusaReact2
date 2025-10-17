module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],

    files: [
      'src/tests/*.spec.js' 
    ],

    preprocessors: {
      'src/tests/*.spec.js': ['webpack', 'coverage'],
      'src/components/Portafolio/*.jsx': ['webpack', 'coverage'] 
    },
    
    webpack: {
        mode: 'development',
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react']
                        }
                    }
                }
            ]
        },
        resolve: {
            extensions: ['.js', '.jsx']
        }
    },
    
    plugins: [
        'karma-jasmine',
        'karma-chrome-launcher',
        'karma-webpack',
        'karma-coverage' 
    ],

    reporters: ['progress', 'coverage'],
    coverageReporter: {
        dir: 'coverage/',
        reporters: [
            { type: 'html', subdir: 'html' },
            { type: 'text-summary' }
        ]
    },

    port: 9876,
    browsers: ['ChromeHeadless'], 
    singleRun: true,
    autoWatch: false
  });
};