(function () {
  console.log("HELLO");
  $('#contact-submit').click(function (event) {
    if (event) {
      event.preventDefault()

      var visitor = {
        name: $('#contact-form-name').val(),
        email: $('#contact-form-email').val(),
        message: $('#contact-form-message').val()
      }

      if (visitor.name === "" || visitor.email === "" || visitor.message === "") {
        $("#successmessage").text("");
        console.log('Check that all the field are filled out')
        const errormessage = "Your message couldn't be sent, please check that all the fields are filled out.";
        $("#errormessage").text(errormessage);
      }
        
      else{
        console.log('Contact form submitted ' + JSON.stringify(visitor));
        $.ajax({
          url: '/api/subscriber',
          type: 'POST',
          data: visitor,
          success: function (res) {
            $("#errormessage").text("");
            console.log('SUBSCRIBER CREATED: ' + JSON.stringify(res))
            const successmessage = 'Your message has been succesfully sent';
            $("#successmessage").text(successmessage);
          },
          error: function (res) {
            res.status(400);
          }
        })
      }
    }
  })
})()