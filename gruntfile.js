module.exports = function (grunt) {

    grunt.loadNpmTasks("grunt-ts");

    grunt.initConfig({
        ts: {
            default: {
                tsconfig: true
            }
        }
    });

    grunt.registerTask("default", ["ts"]);

};