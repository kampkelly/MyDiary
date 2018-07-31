module.exports = function(grunt) {
    require("load-grunt-tasks")(grunt); // npm install --save-dev load-grunt-tasks
    grunt.initConfig({
      "babel": {
	        options: {
	          sourceMap: true
	        },
	        dist: {
				files: [{
			      expand: true,
			      cwd: 'es6',
			      src: ['*.js'],
			      dest: 'FULLCONNECTION/javascripts',
			      ext: '.js'
			  }]
	        }
		},
		eslint: {
			// options: {
			// 	fix: true
			// },
            target: ['es6/*.js']
       	},
		watch: {
			scripts: {
				files: ["es6/*.js"],
				tasks: ["eslint", "babel"]
			}
		}
    });

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-mocha-test');
    grunt.registerTask("default", ["eslint", "babel"]);
};
