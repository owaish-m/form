document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('signinForm').addEventListener('submit', function (event) {
        event.preventDefault();

        // Collect form data
        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        fetch('http://localhost:3000/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(data)
        })
        .then(response => response.text())
        .then(result => {
            alert(result); 
            if (result === 'Sign-in successful!') {
                window.location.href = 'https://www.google.com';//Koi Dusri Link add karna hoto after SignIn Successful
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Sign-in failed!');
        });
    });
});
