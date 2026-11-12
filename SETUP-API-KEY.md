# 🔑 Quick Setup: Geoapify API Key

## ⚡ කෙටි උපදෙස් / Quick Steps

### 1. API Key එක ගන්න / Get API Key
```
🌐 https://www.geoapify.com
   ↓
📝 Sign Up (Free)
   ↓
🔑 Copy your API Key
```

### 2. .env.local File එකට දාන්න / Add to .env.local
```bash
# Open this file: .env.local
# Find this line:
GEOAPIFY_API_KEY=YOUR_KEY_HERE

# Replace YOUR_KEY_HERE with your actual key:
GEOAPIFY_API_KEY=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

### 3. Server එක Restart කරන්න / Restart Server
```bash
# Stop server (Terminal එකේ)
Ctrl + C

# Start again
npm run dev
```

### 4. ✅ Test කරන්න / Test
- Go to "Near" page
- Click "Restaurants"
- Should see nearby places!

---

## 🎯 What You Get / ඔයාට ලැබෙන්නේ

- ✅ **Nearby Places** - අසල ඇති restaurants, hotels, ATMs
- ✅ **Routes** - මාර්ග සහ දුර
- ✅ **Maps** - නිවැරදි maps සහ locations
- ✅ **3,000 calls/day** - FREE!

---

## 📁 File Location / File එක තියෙන තැන

```
journeyready/
├── .env.local          ← මෙතන / HERE
├── package.json
├── src/
└── ...
```

---

## ❓ Problems? / ගැටලු?

**Message still shows?**
1. ✅ File save කරාද? (Ctrl+S)
2. ✅ Server restart කරාද? (Ctrl+C → npm run dev)
3. ✅ Key එක හරියටද copy කරේ?

**No results?**
1. ✅ Internet connection තියෙනවද?
2. ✅ API key activate වෙලාද? (Check dashboard)

---

## 🔗 Full Guide / සම්පූර්ණ උපදෙස්

📖 විස්තරාත්මක උපදෙස් බලන්න:
- Sinhala instructions included
- Step-by-step screenshots
- Troubleshooting tips

Check the detailed guide artifact above! ☝️

---

## 🔒 Security / ආරක්ෂාව

⚠️ `.env.local` file එක GitHub එකට යන්නේ නැහැ - safe! ✅

---

**Need help?** Check browser console (F12) for error messages.
