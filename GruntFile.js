module.exports = function (grunt) {
  grunt.initConfig({
    nodewebkit: {
                  options: {
                            version: '0.8.3',
                            build_dir: './webkitbuilds',
                            mac: true,
                            win: true,
                            linux32: true,
                            linux64: true
                },
                src: [
                  './src/**/*',
                  './node_modules/**/*',
                ]
            },
    });

    grunt.loadNpmTasks('grunt-node-webkit-builder');
									

