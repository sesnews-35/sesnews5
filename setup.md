# শেষ নিউজ — Ultra ProMax (A→Z)

এই প্যাকেজ শুধু GitHub Pages-এ আপলোড করুন। তারপর `config.js`-এ Apps Script URL আগে থেকেই বসানো আছে।
Google Form → Google Sheet → Apps Script → সাইট — সব অটো-ওয়ার্ক করবে।

## কীভাবে কাজ করে
- সাইট প্রথমে Apps Script URL (config.js > appsScriptFeed) থেকে JSON লোড করে
- যদি কোনো কারণে সেটি কাজ না করে, `data/news.json` fallback নেয়
- Google Drive ইমেজ লিঙ্ক দিলে অটো-ভিউ লিঙ্কে কনভার্ট হয়

## দরকার হলে যা পরিবর্তন করবেন
- `config.js` > `appsScriptFeed` — আপনার Apps Script নতুন হলে এখানে URL দিন
- `assets/img/placeholder.jpg` — আপনার লোগো/ডিফল্ট ছবি দিতে পারেন
- `assets/css/styles.css` — ডিজাইন কাস্টমাইজ

## নোট
- আপনার শিটে উপযুক্ত কলাম থাকলেই সাইট শো করবে। টাইটেল/বিবরণ/ক্যাটাগরি/ইমেজ/তারিখ—সব বাংলা বা ইংরেজি নামে থাকলে কোড নিজে থেকেই ধরতে পারবে।
