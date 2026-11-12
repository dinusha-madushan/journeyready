# Background Video Setup

Your JourneyReady app now supports a **background video** instead of the static image!

## 🎬 How to Add Your Background Video

### Step 1: Prepare Your Video

1. **Get your Sri Lanka video** (landscapes, beaches, temples, nature)
2. **Recommended specifications:**
   - Resolution: 1920x1080 (Full HD) or higher
   - Duration: 30-60 seconds (will loop continuously)
   - File size: Keep under 10MB for fast loading
   - Content: Beautiful Sri Lankan scenery (beaches, mountains, temples, tea estates)

### Step 2: Convert to Optimized Formats

For best browser compatibility, provide both formats:

**MP4 format:**
```bash
# Using ffmpeg to compress and optimize
ffmpeg -i original-video.mp4 -vcodec h264 -acodec aac -b:v 2M -b:a 128k bg-video.mp4
```

**WebM format (optional but recommended):**
```bash
# Using ffmpeg
ffmpeg -i original-video.mp4 -c:v libvpx-vp9 -b:v 1.5M -c:a libopus -b:a 128k bg-video.webm
```

### Step 3: Add Files to Your Project

Place your video files in the `public` folder:

```
journeyready/
├── public/
│   ├── bg.jpg          ← Keep this as fallback/poster
│   ├── bg-video.mp4    ← Add your MP4 video here
│   └── bg-video.webm   ← Add your WebM video here (optional)
```

### Step 4: Test

1. Restart your development server
2. Open `http://localhost:3000`
3. You should see your video playing in the background!

## 🎨 Features

- ✅ **Auto-plays** on page load (muted for browser compatibility)
- ✅ **Loops continuously** - seamless playback
- ✅ **Fallback poster** - Shows bg.jpg while video loads
- ✅ **Dark overlay** - Ensures text remains readable
- ✅ **Mobile optimized** - Uses `playsInline` for iOS
- ✅ **Performance** - Fixed position with GPU acceleration

## 🔧 Customization

### Change the overlay darkness

Edit `src/app/globals.css` - find `.video-background::after`:

```css
background: linear-gradient(
  to bottom,
  rgba(11, 42, 36, 0.85) 0%,    /* Top - change 0.85 for darkness */
  rgba(11, 42, 36, 0.75) 50%,   /* Middle */
  rgba(11, 42, 36, 0.85) 100%   /* Bottom */
);
```

- Lower values (0.6-0.7) = Lighter, more video visible
- Higher values (0.9-0.95) = Darker, better text contrast

### Change video playback speed

Edit `src/app/layout.tsx` - add `playbackRate`:

```tsx
<video
  autoPlay
  loop
  muted
  playsInline
  poster="/bg.jpg"
  ref={(video) => {
    if (video) video.playbackRate = 0.75; // 0.5 = slower, 1.5 = faster
  }}
>
```

## 📱 Browser Support

| Browser | Supported |
|---------|-----------|
| Chrome  | ✅ Yes    |
| Firefox | ✅ Yes    |
| Safari  | ✅ Yes    |
| Edge    | ✅ Yes    |
| Mobile  | ✅ Yes    |

## 💡 Tips

1. **Keep video short** - A 30-60 second loop is perfect
2. **Compress heavily** - Users on mobile will thank you
3. **Test on mobile** - Ensure it plays smoothly
4. **Consider a static image fallback** - bg.jpg shows while video loads

## 🎥 Recommended Free Video Sources

- **Pexels**: https://www.pexels.com/search/videos/sri%20lanka/
- **Pixabay**: https://pixabay.com/videos/search/sri%20lanka/
- **Mixkit**: https://mixkit.co/free-stock-video/

## ⚠️ Note

If you don't add video files, the app will still work - it will show the dark overlay with the poster image (bg.jpg) as fallback.

---

**Current Status**: Background video system is ready! Just add your video files to `/public/` folder.
