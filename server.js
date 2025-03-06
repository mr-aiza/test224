const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// تنظیمات multer برای ذخیره فایل‌ها
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'invoices/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// ایجاد پوشه برای فاکتورها اگر وجود نداشته باشد
if (!fs.existsSync('invoices')) {
    fs.mkdirSync('invoices');
}

// Endpoint برای دریافت فاکتور
app.post('/upload-invoice', upload.single('invoice'), (req, res) => {
    const filePath = path.join(__dirname, 'invoices', req.file.filename);
    
    // اینجا می‌توانید کد برای ارسال فایل به GitHub را اضافه کنید
    // به عنوان مثال، با استفاده از GitHub API

    res.send('فاکتور با موفقیت ذخیره شد.');
});

// راه‌اندازی سرور
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
