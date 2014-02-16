/* jshint indent:2, white:true, laxcomma:true, undef:true, strict:true, unused:true, eqnull:true */
/* globals window, document, _, reqwest, alert */

window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var searchform = document.getElementById('choose-data');


  searchform.addEventListener('submit', function (evt) {
    evt.preventDefault();
    ajaxform(this);
    return false;
  });


  function testing() {
    document.querySelector('#choose-data #what').value = 'track';
    document.querySelector('#choose-data #query').value = 'MIYAVI';
  }
  /*
    uncomment this and you do not have
    to insert datas again again again and again
    when refreshing page for testing
  */
  //  testing();


  function ajaxform(form) {

    var type = form.querySelector('#what').value
      , query = form.querySelector('#query').value
      ;

    if (type !== '' && query !== '') {
      
      reqwest({
        url: '/science-bitch'
      , method: 'post'
      , type: 'json'
      , data: { _t: type, _q: query }
      , success: function (resp) {
          //console.log(resp);

          _.templateSettings.variable = 'bluesky';

          var resultscontainer = document.getElementById('searchresults')
            , typeres = type + 's'
            , bluesky = resp[typeres]
            , listresults = "<% _.each(bluesky, function (s) { %> <li><h2><%= s.name %></h2><input type='text' class='code-to-copy' value='<%= s.href %>' spellcheck='false' /></li> <% }); %>"
            , _template = _.template(listresults, bluesky)
            ;

          resultscontainer.innerHTML = _template;
          addResultListeners();

          if (bluesky.length === 0) {
            resultscontainer.innerHTML = '<li><pre>0 results</pre></li>';
          }

        }
      , error: function (err) {
          //console.log(err);
        }
      });

    } else {
      alert('Yo Mr. White, did you forget anything??!');
    }


  }

  function addResultListeners() {
    _.each(document.querySelectorAll('.code-to-copy'), function (code) {
      code.addEventListener('click', function () {
        this.select();
      });
    });
  }

});