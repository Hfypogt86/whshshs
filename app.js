const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;

// استخدام body-parser لتحليل بيانات النماذج
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// تحميل الرسائل من ملف JSON
const loadMessages = () => {
    if (fs.existsSync('messages.json')) {
        const data = fs.readFileSync('messages.json');
        return JSON.parse(data);
    }
    return [];
};

// حفظ الرسالة في ملف JSON
const saveMessage = (message) => {
    const messages = loadMessages();
    messages.push(message);
    fs.writeFileSync('messages.json', JSON.stringify(messages, null, 2));
};

// مسار لعرض الصفحة الرئيسية
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// مسار لتخزين الرسالة
app.post('/send', (req, res) => {
    const message = req.body.message;
    saveMessage(message);
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});