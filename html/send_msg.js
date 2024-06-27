document.querySelector('#submit-btn').addEventListener('click', function(event) {
    event.preventDefault();
    
    const phone = document.getElementById('phonenumber').value;
    const message = 'We have received your message. We will contact you soon.';

    fetch('http://localhost:3002/send-sms', { // Corrected URL to match your server
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ to: phone, message: message })
    })
    .then(response => response.text())
    .then(data => {
        console.log('Message sent:', data); // Log success message
        alert('Message sent successfully!'); // Alert user
    })
    .catch(error => {
        console.error('Error:', error); // Log any errors
        alert('Error sending message. Please try again.'); // Alert user about error
    });
});
