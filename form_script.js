async function handleSubmit(event) {
    event.preventDefault();
    
    if (!validateForm()) {
        return;
    }
    
    const formData = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        age: document.getElementById("age").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        eircode: document.getElementById("eircode").value
    };
    
    try {
        const response = await fetch('/api/userdata', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            alert('Data submitted successfully');
        }
    } catch (error) {
        console.error('Error submitting form:', error);
    }
}


function validateForm() {
    const nameRegex = /^[a-zA-Z0-9]{1,20}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const eircodeRegex = /^[a-zA-Z0-9]{6}$/;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const eircode = document.getElementById("eircode").value;

    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
        alert("First and last name must be alphanumeric and max 20 characters.");
        return false;
    }
    if (!emailRegex.test(email)) {
        alert("Invalid email address.");
        return false;
    }
    if (!phoneRegex.test(phone)) {
        alert("Phone number must be numeric and exactly 10 digits.");
        return false;
    }
    if (!eircodeRegex.test(eircode)) {
        alert("Eircode must 6 alphanumeric characters.");
        return false;
    }
    return true;
}

console.log("Form validated");
