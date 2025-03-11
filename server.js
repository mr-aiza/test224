const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// تنظیمات Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// سرو کردن فایل‌های استاتیک
app.use(express.static(path.join(__dirname, 'public')));

// مسیر برای دریافت داده‌های فرم و ذخیره فاکتور
app.post('/submit-form', (req, res) => {
  const invoiceData = req.body;

  // محتوای فاکتور به صورت HTML
  const invoiceContent = `
  <!DOCTYPE html>
  <html lang="fa">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>فاکتور رزرو مراسم</title>
      <style>
          body { font-family: 'Vazir', sans-serif; direction: rtl; }
          .invoice { width: 80%; margin: auto; border: 1px solid #000; padding: 20px; }
          h2, h3 { text-align: center; }
          ul { list-style-type: none; padding: 0; }
          li { margin: 5px 0; }
      </style>
  </head>
  <body>
      <div class="invoice">
          <h2>فاکتور رزرو مراسم</h2>
          <p><strong>تاریخ مراسم:</strong> ${invoiceData.eventDate}</p>
          <p><strong>نوع مراسم:</strong> ${invoiceData.eventType}</p>
          <p><strong>تعداد مهمان‌ها:</strong> ${invoiceData.guestCount}</p>
          <p><strong>محل برگزاری:</strong> ${invoiceData.venue}</p>
          <h3>خدمات انتخاب‌شده</h3>
          <ul>
              <li><strong>آب میوه:</strong> ${invoiceData.juice}</li>
              <li><strong>فینگر فود:</strong> ${invoiceData.fingerFood}</li>
              <li><strong>شام:</strong> ${invoiceData.dinner}</li>
              <li><strong>گل‌آرایی:</strong> ${invoiceData.flowerArrangement}</li>
          </ul>
      </div>
  </body>
  </html>
  `;

  // نام فایل فاکتور
  const fileName = `فاکتور_${Date.now()}.html`;
  const filePath = path.join(__dirname, 'فاکتور', fileName);

  // اطمینان از وجود پوشه 'فاکتور'
  if (!fs.existsSync(path.join(__dirname, 'فاکتور'))) {
    fs.mkdirSync(path.join(__dirname, 'فاکتور'));
  }

  // ذخیره فایل فاکتور
  fs.writeFile(filePath, invoiceContent, (err) => {
    if (err) {
      console.error('خطا در ذخیره فایل:', err);
      res.status(500).send('خطا در ذخیره فاکتور.');
    } else {
      console.log('فاکتور با موفقیت ذخیره شد:', filePath);
      res.status(200).send('فاکتور با موفقیت ذخیره شد.');
    }
  });
});

// شروع سرور
app.listen(PORT, () => {
  console.log(`سرور در حال اجرا در http://localhost:${PORT}`);
});
