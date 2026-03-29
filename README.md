# Happy Birthday Mom Mayla

A multi-page birthday card website built as a **Single Page Application** for
GitHub Pages. Music plays continuously — it never pauses between pages.

---

## Folder Structure

```
birthday-card/
├── index.html      ← Entire site (all 3 "pages" live here as sections)
├── style.css       ← All styles, fully responsive
├── app.js          ← Navigation, music, gallery, no-button logic
├── fireworks.js    ← Canvas fireworks (Page 1)
├── stars.js        ← Twinkling stars (Page 1)
│
├── music/
│   └── birthday.mp3     ← ADD YOUR MUSIC FILE HERE
│
└── images/
    ├── photo1.jpg        ← ADD YOUR 10 PHOTOS HERE
    ├── photo2.jpg
    ├── photo3.jpg
    ├── photo4.jpg
    ├── photo5.jpg
    ├── photo6.jpg
    ├── photo7.jpg
    ├── photo8.jpg
    ├── photo9.jpg
    └── photo10.jpg
```

---

## Step-by-Step Setup

### 1. Add Background Music
- Get a free MP3 from https://pixabay.com/music (search "happy birthday" or "celebration")
- Rename the file to `birthday.mp3`
- Place it inside the `music/` folder

### 2. Add Photos
- Collect 10 photos of/with Mom
- Rename them `photo1.jpg` through `photo10.jpg`
- Place them all in the `images/` folder
- Recommended size: 800×600px or similar (resize before uploading for speed)

### 3. Customize Captions (Optional)
- Open `app.js`
- Find the `captions` array near the top
- Edit the text strings — keep them without emoji (emojis removed by design)

---

## Deploy to GitHub Pages

1. Create a new GitHub repository (e.g. `birthday-mom-mayla`)
2. Upload all files keeping the exact folder structure above
3. Go to **Settings → Pages**
4. Set Source to: `main` branch, folder `/` (root)
5. Click **Save**
6. Your site goes live at: `https://yourusername.github.io/birthday-mom-mayla/`

---

## Features

| Feature | Details |
|---------|---------|
| Continuous music | Audio element is never reloaded — music plays through all pages |
| Responsive | Works on any screen size — phone, tablet, desktop |
| Page 1 | Purple space background, canvas fireworks, twinkling stars, shooting stars, animated envelope |
| Page 2 | Animated sky with CSS-only clouds, message card, Bible verse, runaway No button (stays in viewport) |
| Page 3 | Floating petals, gallery with pop-in animation, full lightbox with back button |
| No button | Runs away from cursor on hover/touch, always stays within screen bounds |
