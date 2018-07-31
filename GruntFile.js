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
			      cwd: 'FULLCONNECTION/javascripts/es6',
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
            target: ['FULLCONNECTION/javascripts/es6/*.js']
       	},
		watch: {
			scripts: {
				files: ["FULLCONNECTION/javascripts/es6/*.js"],
				tasks: ["eslint", "babel"]
			}
		}
    });

	grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask("default", ["eslint", "babel"]);
};
