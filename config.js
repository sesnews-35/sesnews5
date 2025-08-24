window.SHESH = {
  title: "শেষ নিউজ",
  categories: ["সর্বশেষ","জাতীয়","আন্তর্জাতিক","খেলা","বিনোদন","প্রযুক্তি","অর্থনীতি","রাজনীতি","স্বাস্থ্য","শিক্ষা","ফিচার"],
  dataPath: "./data/news.json", // fallback
  appsScriptFeed: "https://script.google.com/macros/s/AKfycbwB6kbHXP-4t5dMibwN0FiN7zYb9oW-gp69L-Ql2rs-i-TykKnOrzelK76_8eZsK4g1rg/exec",
  pageSize: 12,
  imageFallback: "./assets/img/placeholder.jpg",
  pollMs: 10000,
  tickerCount: 8,
  enablePush: false,
  vapidPublicKey: "",
  maxHomeItems: 15,
  driveIdRegex: /(?:id=|\/d\/)([a-zA-Z0-9_-]{10,})/
};
