const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

suite('UnitTests', () => {
/*
*/
  test('Logic handles a valid puzzle string of 81 characters', function(done) {
      let input = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      let solution = "769235418851496372432178956174569283395842761628713549283657194516924837947381625";
      assert.equal((solver.solve(input)).solution, solution);
      done();
    });

  test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', function(done) {
      let input = '..9..5.1.85.4....2432.X....1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      let error = "Invalid characters in puzzle";
      assert.equal((solver.solve(input)).error, error);
      done();
    });

  test('Logic handles a puzzle string that is not 81 characters in length', function(done) {
      let input = '..9..5.1.85.4....2432....1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      let error = "Expected puzzle to be 81 characters long";
      assert.equal((solver.solve(input)).error, error);
      done();
    });

  test('Logic handles a valid row placement', function(done) {
      let puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      let coordinate = 'A2';
      let value = '6';
      let input = {puzzle, coordinate, value};
      let result = true;
      assert.equal((solver.validate(input)).valid, result);
      done();
    });

  test('Logic handles an invalid row placement', function(done) {
      let puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      let coordinate = 'A2';
      let value = '5';
      let input = {puzzle, coordinate, value};
      let result = {"valid": false, "conflict": ["row", "column", "region"]};
      assert.isNotTrue(solver.validate(input).valid);
      assert.include(solver.validate(input).conflict, 'row');
      done();
    });

  test('Logic handles a valid column placement', function(done) {
      let puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      let coordinate = 'A9';
      let value = '8';
      let input = {puzzle, coordinate, value};
      let result = true;
      assert.equal((solver.validate(input)).valid, result);
      done();
    });

  test('Logic handles an invalid column placement', function(done) {
      let puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      let coordinate = 'A9';
      let value = '3';
      let input = {puzzle, coordinate, value};
      let result = {"valid": false, "conflict": ["row", "column", "region"]};
      assert.isNotTrue(solver.validate(input).valid);
      assert.include(solver.validate(input).conflict, 'column');
      done();
    });
  
  test('Logic handles a valid region (3x3 grid) placement', function(done) {
      let puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      let coordinate = 'A1';
      let value = '7';
      let input = {puzzle, coordinate, value};
      let result = true;
      assert.equal((solver.validate(input)).valid, result);
      done();
    });

  test('Logic handles an invalid region (3x3 grid) placement', function(done) {
      let puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      let coordinate = 'A1';
      let value = '2';
      let input = {puzzle, coordinate, value};
      let result = {"valid": false, "conflict": ["row", "column", "region"]};
      assert.isNotTrue(solver.validate(input).valid);
      assert.include(solver.validate(input).conflict, 'region');
      done();
    });

  test('Valid puzzle strings pass the solver', function(done) {
      let input = '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3';
      let solution = "568913724342687519197254386685479231219538467734162895926345178473891652851726943";
      assert.equal((solver.solve(input)).solution, solution);
      done();
    });

  test('Invalid puzzle strings fail the solver', function(done) {
      let input = '5..91372.2...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3';
      let error = "Puzzle cannot be solved";
      assert.equal((solver.solve(input)).error, error);
      done();
    });

  test('Solver returns the expected solution for an incomplete puzzle', function(done) {
      let input = '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51';
      let solution = "827549163531672894649831527496157382218396475753284916962415738185763249374928651";
      assert.equal((solver.solve(input)).solution, solution);
      done();
    });

});
