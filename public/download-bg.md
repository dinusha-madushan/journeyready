# How to Add the Background Image

## Method 1: Save from Browser (Recommended)
1. Right-click on the Sri Lanka landscape image
2. Select "Save Image As..."
3. Save it as `bg.jpg` in the `public` folder
4. Make sure the filename is exactly `bg.jpg` (lowercase)

## Method 2: Download High-Quality Version
If you need a higher quality version:
1. Search for "Sri Lanka landscape Sigiriya Nine Arch Bridge beach"
2. Find a high-resolution image (at least 1920x1080)
3. Save it as `bg.jpg` in the `public` folder

## Verification
After saving the image, the file should be located at:
```
journeyready/
  public/
    bg.jpg          ← Image should be here
    logo.png
    README-BACKGROUND.md
    download-bg.md
```

## Test the Background
1. Start the dev server: `npm run dev`
2. Open http://localhost:3000
3. You should see the Sri Lanka landscape behind all content
4. The glass cards should have a nice blur effect over the image

## Optimization Tips
- Use JPEG format for photos (smaller file size)
- Recommended dimensions: 1920x1080 or 2560x1440
- Keep file size under 500KB for fast loading
- Compress the image using tools like TinyJPG or Squoosh

## Troubleshooting
- If the image doesn't appear, check the filename is exactly `bg.jpg`
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Check browser console for any errors
- Verify the file is in the `public` folder, not elsewhere
