# Title

[![GitHub version](https://img.shields.io/badge/version-v1.0.0-blue.svg)](https://github.com/davidkuyk/sudokuSolver)
[![License](https://img.shields.io/github/license/davidkuyk/sudokuSolver.svg)](https://github.com/davidkuyk/sudokuSolver/blob/main/LICENSE)

A full stack Javascript sudoku-solving app with Mocha and Chai testing.

## Table of Contents

- [Title](#title)
  - [Table of Contents](#table-of-contents)
  - [Background](#background)
  - [Future Feature Ideas](#future-feature-ideas)
  - [Installation](#installation)
  - [Scaffolding](#scaffolding)
  - [Usage](#usage)
  - [Bugs](#bugs)
  - [Author](#author)
  - [License](#license)

## Background

This was a project built as part of the freeCodeCamp curriculum, but I added my own styling to make the layout neater.

## Future Feature Ideas
* Add input straight in the squares instead of the textarea. 
* Make puzzle bigger.
* Make mobile friendly.

## Installation

[Click here](https://sudoku-solver-dk.davidkuyk.repl.co/) to go to the site. Or, if you want to clone this repository, open your terminal and type:

```sh
$ git clone https://github.com/davidkuyk/sudokuSolver.git
$ cd sudokuSolver
```

## Scaffolding

```text
sudokuSolver
├── controllers
|   └── puzzle-string.js
|   └── sudoku-solver.js
├── public
│   └── index.js
│   └── style.css
├── routes
|   └── api.js
├── tests
|   └── 1_unit-tests.js
|   └── 2_functional-tests.js
├── views
|   └── index.html
├── server.js
├── package.json
├── package-lock.json
├── LICENSE
└── README.md
```

## Usage

* Input your incomplete sudoku puzzle in the text area at the top of the page
* Click "Solve" and the large puzzle will display your solved sudoku
* If you want to check the placement of a single number, you can enter its coordinate and value in the two text boxes and click "Check Placement"

## Bugs

If you have questions, feature requests or a bug you want to report, please click [here](https://github.com/davidkuyk/sudokuSolver/issues) to open an issue.

## Author

* [**David Kuyk**](https://www.davidkuyk.com/) [![GitHub followers](https://img.shields.io/github/followers/davidkuyk.svg?style=social)](https://github.com/davidkuyk)

## License

Copyright (c) 2021 David Kuyk.

Usage is provided under the MIT License. See [LICENSE](https://github.com/davidkuyk/sudokuSolver/blob/main/LICENSE) for the full details.
