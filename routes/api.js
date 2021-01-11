'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      if(req.body.puzzle == undefined || req.body.coordinate == undefined || req.body.value == undefined) {
        return res.json({error: 'Required field(s) missing'})
      }
      let answer = solver.validate(req.body);
      return res.json(answer)
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      if(!req.body.puzzle) {return res.json({ error: 'Required field missing' })}
      let solution = solver.solve(req.body.puzzle);
      return res.json(solution)
    });
};