/* jshint node:true, indent:2, white:true, laxcomma:true, undef:true, strict:true, unused:true, eqnull:true, camelcase: false, trailing: true */
'use strict';

module.exports = function (app) {

  /**
   *  Requiresssss
  **/
  var spotify = require('spotify');


  /**
   *  Functions for rendering views
  **/

  function index(req, res) {
    res.render('index');
  }


  function getmeth(req, res) {

    var _type = req.body._t
      , _query = req.body._q
      ;


    spotify.search({ type: _type, query: _query }, function (err, data) {
      if (err) {
        res.send('Error occurred: ' + err);
        return;
      }
      res.json(data);

    });

  }



  /**
   *  Routes
  **/


  app.post('/science-bitch', getmeth);
  app.get('/', index);


};