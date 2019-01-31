# [Still There Modal](https://still-there-modal.herokuapp.com)

<!-- [![NPM Version][npm-image]][npm-url] -->
[![Build Status](https://travis-ci.org/clintonowen/still-there-modal.svg?branch=master)](https://travis-ci.org/clintonowen/still-there-modal)
<!-- [![Downloads Stats][npm-downloads]][npm-url] -->

## [Live App](https://still-there-modal.herokuapp.com)

A customizable React component to check if a user is still active.

<!-- ![](images/screenshot-5.png) -->

<!-- ## Installation

OS X & Linux:

```sh
npm install my-crazy-module --save
```

Windows:

```sh
edit autoexec.bat
``` -->

<!-- ## Usage example

A few motivating and useful examples of how your product can be used. Spice this up with code blocks and potentially more screenshots. -->

<!-- _For more examples and usage, please refer to the [Wiki][wiki]._ -->

## Technology Stack
* React (via [create-react-app](https://github.com/facebook/create-react-app)), React Router
* Redux
* JavaScript
* HTML, CSS
* Jest, Enzyme, MockDate (Testing)
* TravisCI
* Heroku (via [create-react-app-buildpack](https://github.com/mars/create-react-app-buildpack))

## Main Project Structure

```
still-there-modal/
├── node_modules/ (see "Development Setup")
├── public/
│   └── index.html (static markup)
├── src/
│   ├── actions/
│   ├── components/
│   │   └── App.js (top-level component)
│   ├── reducers/
│   ├── index.js (renders `App` to index.html)
│   └── store.js (Redux store)
├── LICENSE (GNU GPLv3)
├── package.json (NPM dependencies)
└── README.md
```

## Development setup

To clone the repo to your local development environment and verify that the test-suite passes, execute the following commands (requires [Node](https://nodejs.org)).

```sh
# Clone the repo
git clone https://github.com/clintonowen/still-there-modal.git

# Move into the project directory
cd still-there-modal

# Install dependencies (in /node_modules/)
npm i

# Run the test-suite:
npm test

# Run the app:
npm start
```

<!-- ## Release History

* 0.2.1
    * CHANGE: Update docs (module code remains unchanged)
* 0.2.0
    * CHANGE: Remove `setDefaultXYZ()`
    * ADD: Add `init()`
* 0.1.1
    * FIX: Crash when calling `baz()` (Thanks @GenerousContributorName!)
* 0.1.0
    * The first proper release
    * CHANGE: Rename `foo()` to `bar()`
* 0.0.1
    * Work in progress -->

<!-- ## Contributing

1. Fork it (<https://github.com/yourname/yourproject/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request -->

## Meta

by Clinton Owen – [@CoderClint](https://twitter.com/CoderClint) │ clint@clintonowen.com │ [https://github.com/clintonowen](https://github.com/clintonowen)

Distributed under the GNU GPLv3 License. See ``LICENSE`` for more information.

<!-- Markdown link & img dfn's -->
[npm-image]: https://img.shields.io/npm/v/datadog-metrics.svg?style=flat-square
[npm-url]: https://npmjs.org/package/datadog-metrics
[npm-downloads]: https://img.shields.io/npm/dm/datadog-metrics.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/dbader/node-datadog-metrics/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/dbader/node-datadog-metrics
[wiki]: https://github.com/yourname/yourproject/wiki