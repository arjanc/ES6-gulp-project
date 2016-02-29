import "babel-polyfill"; // polyfill for ES6 in the browser. This will emulate a full ES6 environment.
import ExampleModule from './modules/examplemodule';

document.addEventListener('DOMContentLoaded', function(){
	const exampleModule = new ExampleModule();
});