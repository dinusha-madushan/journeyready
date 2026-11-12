# 🖼️ Quick Background Setup

## ⚡ Quick Steps

1. **Save the Sri Lanka landscape image**
   - Right-click → Save As
   - Location: `public/bg.jpg`
   - Filename: **exactly** `bg.jpg`

2. **Verify location**
   ```
   journeyready/public/bg.jpg  ← Should be here
   ```

3. **Run the app**
   ```bash
   npm run dev
   ```

4. **Open browser**
   ```
   http://localhost:3000
   ```

## ✅ What's Already Configured

The CSS is already set up with:
- ✓ Background image reference (`/bg.jpg`)
- ✓ Dark overlay gradient for text readability
- ✓ Enhanced glass-morphism effect (20px blur)
- ✓ Fixed positioning (stays while scrolling)
- ✓ Cover sizing (fills screen perfectly)
- ✓ Light/dark mode support

## 🎨 Design Features

**Dark Mode** (default):
- Semi-transparent dark gradient overlay
- Shows landscape subtly behind
- Glass cards with strong blur effect

**Light Mode** (auto-detects):
- Light gradient overlay
- Same landscape visible
- Adapts to system preference

## 📏 Image Specs

**Recommended:**
- Format: JPEG (.jpg)
- Dimensions: 1920×1080 or larger
- File size: Under 500KB
- Quality: 80-90%

**The image shows:**
- Sigiriya Rock fortress (left)
- Nine Arch Bridge with train
- Buddhist temple (white stupa)
- Beach with palm trees (right)
- Mountains & blue sky

## 🔧 Need to Adjust?

**Make cards more opaque:**
Edit `src/app/globals.css` line 9:
```css
--gl: rgba(255, 255, 255, 0.20);  /* Increase from 0.15 */
```

**Darken background overlay:**
Edit `src/app/globals.css` lines 34-38:
```css
rgba(11, 42, 36, 0.90) /* Increase from 0.85 */
```

**Change blur strength:**
Edit `src/app/globals.css` around line 70:
```css
backdrop-filter: blur(24px) saturate(180%);  /* Increase from 20px */
```

## 🚨 Troubleshooting

**Image not showing?**
- Check filename is exactly `bg.jpg` (lowercase)
- Check it's in `public/` folder
- Clear browser cache: Ctrl+Shift+R
- Check console for 404 errors

**Background too bright/dark?**
- Adjust gradient overlay alpha values (see above)

**Cards not visible enough?**
- Increase `--gl` transparency value
- Increase blur amount

## 🎯 Result

With the image in place, you'll have:
- 🏞️ Beautiful Sri Lanka landscape
- 🎨 Modern glass-morphism design
- 📱 Responsive on all devices
- 🌓 Dark/light mode adaptive
- ⚡ Fast loading & smooth performance

---

**That's it!** Just save the image to `public/bg.jpg` and your app will look stunning! 🇱🇰✨
