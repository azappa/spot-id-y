/* jshint indent:2, white:true, laxcomma:true, undef:true, strict:true, unused:true, eqnull:true */
/* globals window, document, _ */

window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  var searchform = document.getElementById('choose-data');


  searchform.addEventListener('submit', function (evt) {
    evt.preventDefault();
    ajaxform(this);
    return false;
  });


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
          console.log(resp);

          _.templateSettings.variable = 'bluesky';

          var resultscontainer = document.getElementById('searchresults')
            , typeres = type + 's'
            , bluesky = resp[typeres]
            , listresults = "<% _.each(bluesky, function (s) { %> <li><h3><%= s.name %></h3><pre><%= s.href %></pre></li> <% }); %>"
            , _template = _.template(listresults, bluesky)
            ;

          resultscontainer.innerHTML = _template;

          if (bluesky.length === 0) {
            resultscontainer.innerHTML = '<li><pre>0 results</pre></li>';
          }

        }
      , error: function (err) {
          console.log(err);
        }
      });

    } else {
      alert('Yo Mr. White, did you forgot anything??!');
    }


  }

});