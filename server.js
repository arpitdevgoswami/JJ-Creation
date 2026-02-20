const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend files
app.use(express.static(path.join(__dirname, "public")));

// Ensure data folder exists
const dataDir = path.join(__dirname, "data");
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

// Utility function to safely write JSON
const saveToFile = (filePath, newData) => {
    let existingData = [];

    if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath);
        if (fileContent.length > 0) {
            existingData = JSON.parse(fileContent);
        }
    }

    existingData.push(newData);
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
};

// ================= ROUTES =================

// Booking Form Route
app.post("/api/book", (req, res) => {
    try {
        const { name, email, eventType, eventDate, message } = req.body;

        if (!name || !email || !eventType || !eventDate) {
            return res.status(400).json({ success: false, message: "All required fields must be filled." });
        }

        const bookingData = {
            name,
            email,
            eventType,
            eventDate,
            message: message || "",
            createdAt: new Date()
        };

        const filePath = path.join(dataDir, "bookings.json");
        saveToFile(filePath, bookingData);

        res.status(200).json({
            success: true,
            message: "Booking request submitted successfully!"
        });

    } catch (error) {
        console.error("Booking Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});

// Contact Form Route
app.post("/api/contact", (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        const contactData = {
            name,
            email,
            message,
            createdAt: new Date()
        };

        const filePath = path.join(dataDir, "contacts.json");
        saveToFile(filePath, contactData);

        res.status(200).json({
            success: true,
            message: "Message sent successfully!"
        });

    } catch (error) {
        console.error("Contact Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});

// Default Route
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ================= START SERVER =================
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});