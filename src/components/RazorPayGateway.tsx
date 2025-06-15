// RazorpayButton.tsx (React + TS)
import React from 'react';

const RazorpayButton = () => {
  const loadRazorpay = () => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      const options: any = {
        key: import.meta.env.VITE_RAZ, // Use your Razorpay test key here
        amount: 15000, // 150 INR in paise
        currency: 'INR',
        name: 'HealthMitra',
        description: 'Test Payment',
        image: 'https://yourdomain.com/logo.png',
        handler: function (response: any) {
          alert('Payment Successful! ID: ' + response.razorpay_payment_id);
        },
        prefill: {
          name: 'Test User',
          email: 'test@example.com',
          contact: '1234567890',
        },
        notes: {
          address: 'Corporate Office',
        },
        theme: {
          color: '#61dafb',
        },
      };
      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    };
    document.body.appendChild(script);
  };

  return <button onClick={loadRazorpay}>Pay ₹150</button>;
};

export default RazorpayButton;
