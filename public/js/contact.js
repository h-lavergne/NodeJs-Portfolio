(function() {
    console.log("HELLO");
    $('#contact-submit').click(function(event) {
      if (event) {
        event.preventDefault()
        
        var visitor = {
          name: $('#contact-form-name').val(),
          email: $('#contact-form-email').val(),
          message: $('#contact-form-message').val()
        }

        console.log('Contact form submitted ' + JSON.stringify(visitor));

      $.ajax({
        url: '/api/subscriber',
        type: 'POST',
        data: visitor,
        success: function(res){
          console.log('SUBSCRIBER CREATED: ' + JSON.stringify(res))
        },
        error:function(res){
          
        }
      })
      }
    })
  })()