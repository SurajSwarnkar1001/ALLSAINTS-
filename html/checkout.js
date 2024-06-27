
    var options = {
        key: 'your_key_id', // Replace with your Razorpay key_id
        amount: 10000,      // Amount in paise (e.g., 10000 for ₹100)
        currency: 'INR',    // Currency code (INR for Indian Rupees)
        name: 'AllSaints',
        description: 'Payment for Order',
        image: 'https://cdn.worldvectorlogo.com/logos/allsaints.svg',  // URL of your company logo
        handler: function(response) {
            alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
        },
        prefill: {
            name: 'John Doe',
            email: 'john.doe@example.com'
        },
        notes: {
            merchant_order_id: 'order_id_1234'
        },
        theme: {
            color: '#F37254'  // Customize the color theme
        }
    };

    var rzp1 = new Razorpay(options);
    document.getElementById('checkout-btn').onclick = function(e){
        rzp1.open();
        e.preventDefault();
    }
