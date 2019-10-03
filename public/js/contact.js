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
        $("#errormessage").text(errormessage).addClass("text-danger font-weight-bold");

        if (visitor.name.length == 0) {
          alert("Please enter a name")
          return
        }

        if (visitor.email.length == 0) {
          alert("Please enter a valide email")
          return
        }

        if (visitor.message.length == 0) {
          alert("Please enter a message")
          return
        }

      }

      else {
        console.log('Contact form submitted ' + JSON.stringify(visitor));
        $.ajax({
          url: "/send-email",
          type: 'POST',
          data: visitor,
          success: function (res) {
            res.status(201);
            console.log('yes life')
          },
          
          error: function () {
            console.log('error')
          }
        })
      }
      $("#errormessage").text("");
      $('#contact-form-name').removeClass("border border-danger").val("");
      $('#contact-form-email').removeClass("border border-danger").val("");
      $('#contact-form-message').removeClass("border border-danger").val("");
      const successmessage = 'Your message has been succesfully sent !';
      $("#successmessage").text(successmessage).addClass("text-success font-weight-bold");
    }
  })
})()