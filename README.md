#ECMAScript 6 Project Boilerplate with GULP

## Introductie

Basis opzet voor een ECMAScript 6 project met GULP als task manager.

Bij het runnen van je project wordt er een 'dest' folder aangemaakt. Dit is de plek waar alle gecompileerde code neergezet
zal worden. Pas geen code aan in deze folder. Doe dat in de 'src' folder.

# Getting Started

#### 1. Installeer Gulp globaal:
__Als je al een versie van gulp globaal hebt geinstalleerd, run dan `npm rm --global gulp`
om zeker te weten dat je oude versie niet botst met gulp-cli.__

```sh
$ npm install --global gulp-cli
```

#### 2. Installeer gulp in je project devDependencies:

```sh
$ npm install --save-dev gulp
```

#### 3. Installeer alle npm packages:

```sh
$ npm install
```

#### 4. Installeer Bower globaal:
__Bower gebruiken we om externe bibliotheken te beheren. Dit zijn o.a. Jquery en Bourbon (sass mixins).
  Wanneer je nog geen bower op je systeem hebt geinstalleerd, doe dit dan eerst.__

```sh
$ npm install -g bower

```

#### 5. Installeer Bower dependencies:

```sh
$ bower install
```

#### 6. Installeer Lodash:
__Voor het genereren van de template voor de icon font sass bestand wordt Lodash gebruikt.__

```sh
$ npm install lodash --save
```

#### 7. Run gulp:

```sh
$ gulp
```

##TTFAUTOHINT
We gebruiken TTFAUTOHINT voor de icons fonts.
```bash
$ brew install ttfautohint fontforge --with-python
```
voor windows gebruikers: installeer ttfautohint (http://www.freetype.org/ttfautohint/#download)

## ICON FONTS
Je kan een extra icon toevoegen aan de src/assets/icon map. Dit moet een svg bestand zijn van 512x512 pixels. De naam is ook de classnaam die je in de css gebruikt.

## Gulp devDependencies
Use the ``npm`` command to download the Gulp dependencies : ``npm install``.

| Devdependencies                                                           | Versions |
| ------------------------------------------------------------------------- | -------- |
| [babel-core]                                                              | ^6.7.0   |
| [babel-eslint]                                                            | ^5.0.0-beta6   |
| [babel-polyfill]                                                          | ^6.5.0   |
| [babel-preset-es2015]												    													| ^6.3.13   |
| [babelify]											    																			| ^7.2.0   |
| [eslint]													 					    													| ^1.10.3   |
| [gulp]                                                                    | ~3.9.0   |
| [gulp-consolidate]                                                        | ^0.1.2   |
| [gulp-cssnano]                          		                              | ^2.0.1   |
| [gulp-iconfont]                                                           | ^5.0.1   |
| [gulp-jade]       				                                                | ^1.1.0   |
| [gulp-modernizr]																										      | ^1.0.0-alpha   |
| [gulp-plumber]													 					    										| ^1.0.1   |
| [gulp-rename]					 									 					    										| ^1.2.2   |
| [gulp-sass]				 																												| ^2.1.1   |
| [gulp-sourcemaps]			 									 					    										| ^1.6.0   |
| [gulp-uglify]																															| ^1.5.1   |
| [gulp-webserver]																										 			| ^0.9.1   |
| [gulp-sequence]					 								 					    										| ^1.1.5   |
| [vinyl-buffer]				                                                    | ^1.0.0   |
| [vinyl-source-stream]										    															| ^1.1.0   |


## Gulp dependencies

| Dependencies                                                           | Versions |
| ------------------------------------------------------------------------- | -------- |
| [babel]					                                                          | ^6.5.2   |
| [browserify]                                                      		    | ^13.0.0  |
| [gulp-lodash]                                                 		        | ^0.1.2   |
| [jquery]      			                                           		        | ^2.1.4   |
| [lodash]				                                                          | ^4.5.1   |

## Usefull links
- [Readme Markdown](https://help.github.com/articles/markdown-basics/)
- [Aria Roles](http://www.w3.org/TR/html-aria/#document-conformance-requirements-for-use-of-aria-attributes-in-html)