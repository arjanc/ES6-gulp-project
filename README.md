#LUMC Frontend Redesign 2016 Project

## Introductie

In dit project staan alles frontend codes die nodig zijn voor het LUMC redesign 2016 project.

Bij het runnen van je project wordt er een 'dest' folder aangemaakt. Dit is de plek waar alle gecompileerde code neergezet
zal worden. Pas geen code aan in deze folder. Doe dat in de 'src' folder.

## Installatie
Om het project op te starten doe je het volgende:

Installeer Gulp als je dat nog niet eerder gedaan hebt.
```
$ npm install --g gulp
```

Installeer alle dependencies via NPM.
```
$ npm install
```

## Bower
Bower gebruiken we om externe bibliotheken te beheren. Dit zijn o.a. Jquery en Bourbon (sass mixins).
Wanneer je nog geen bower op je systeem hebt geinstalleerd, doe dit dan eerst.
```
$ npm install -g bower
```
Vervolgens installeren we de dependencies.
```bash
$ bower install
```

##TTFAUTOHINT
We gebruiken TTFAUTOHINT voor de icons fonts.
```bash
$ brew install ttfautohint fontforge --with-python
```
voor windows gebruikers: installeer ttfautohint (http://www.freetype.org/ttfautohint/#download)


## Runnen
Om met het project te werken draaien we gulp taken voor o.a. het genereren van CSS bestanden en het concatenaten en minifien van javascript bestanden.
```
$ gulp
```

## ICON FONTS
Je kan een extra icon toevoegen aan de src/assets/icon map. Dit moet een svg bestand zijn van 512x512 pixels. De naam is ook de classnaam die je in de css gebruikt.

## Gulp devDependencies
Use the ``npm`` command to download the Gulp dependencies : ``npm install``.

| Devdependencies                                                           | Versions |
| ------------------------------------------------------------------------- | -------- |
| [gulp]                                                                    | ~3.9.0   |
| [gulp-consolidate]                                                        | ^0.1.2   |
| [gulp-cssnano]                          		                              | ^2.0.1   |
| [gulp-iconfont]                                                           | ^5.0.1   |
| [gulp-jade]       				                                                | ^1.1.0   |
| [gulp-modernizr]																										      | ^1.0.0-alpha   |
| [gulp-sass]				 																												| ^2.1.1   |
| [gulp-uglify]																															| ^1.5.1   |
| [gulp-webserver]																										 			| ^0.9.1   |
| [gulp-plumber]													 					    										| ^1.0.1   |
| [gulp-rename]					 									 					    										| ^1.2.2   |
| [vinyl-buffer]				                                                    | ^1.0.0   |
| [vinyl-source-stream]										    															| ^1.1.0   |
| [babel-eslint]                                                            | ^5.0.0-beta6   |
| [babel-preset-es2015]												    													| ^6.3.13   |
| [babelify]											    																			| ^7.2.0   |
| [eslint]													 					    													| ^1.10.3   |

## Gulp dependencies

| Dependencies                                                           | Versions |
| ------------------------------------------------------------------------- | -------- |
| [gulp-browserify]                                                         | ^0.5.1   |
| [gulp-lodash]                                                 		        | ^0.1.2   |
| [jquery]      			                                           		        | ^2.1.4   |

## Usefull links
- [Readme Markdown](https://help.github.com/articles/markdown-basics/)
- [Aria Roles](http://www.w3.org/TR/html-aria/#document-conformance-requirements-for-use-of-aria-attributes-in-html)