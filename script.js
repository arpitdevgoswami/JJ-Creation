// ================= BOOKING FORM =================

const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {
    bookingForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const formData = {
            name: this.name.value.trim(),
            email: this.email.value.trim(),
            eventType: this.eventType.value.trim(),
            eventDate: this.eventDate.value,
            message: this.message.value.trim()
        };

        try {
            const response = await fetch("/api/book", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message || "Booking submitted successfully!");
                this.reset();
            } else {
                alert(result.message || "Failed to submit booking.");
            }

        } catch (error) {
            console.error("Booking Error:", error);
            alert("Server error. Please try again later.");
        }
    });
}


// ================= CONTACT FORM (If You Add One Later) =================

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const formData = {
            name: this.name.value.trim(),
            email: this.email.value.trim(),
            message: this.message.value.trim()
        };

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message || "Message sent successfully!");
                this.reset();
            } else {
                alert(result.message || "Failed to send message.");
            }

        } catch (error) {
            console.error("Contact Error:", error);
            alert("Server error. Please try again later.");
        }
    });
}
