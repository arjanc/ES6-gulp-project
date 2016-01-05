import $ from 'jquery';

export default class ExampleModule {

	constructor() {
		this.$el = $('#header');

		console.log('example module loaded: ' + this.$el);
	}

}