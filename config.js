window.SHESH = {
  title: "শেষ নিউজ",
  categories: ["সর্বশেষ","জাতীয়","আন্তর্জাতিক","খেলা","বিনোদন","প্রযুক্তি","অর্থনীতি","রাজনীতি","স্বাস্থ্য","শিক্ষা","ফিচার"],
  dataPath: "./data/news.json", // fallback
  appsScriptFeed: "https://script.google.com/macros/s/AKfycbxwk3EJXyeD1tlGdo1KBNQEfXPC9DekKaR4JcVXTP2W9BzaAXBkV_iMUmAO1bjex9KwoQ/exec",
  pageSize: 12,
  imageFallback: "./assets/img/placeholder.jpg",
  pollMs: 10000,
  tickerCount: 8,
  enablePush: false,
  vapidPublicKey: "",
  maxHomeItems: 15,
  driveIdRegex: /(?:id=|\/d\/)([a-zA-Z0-9_-]{10,})/
};
