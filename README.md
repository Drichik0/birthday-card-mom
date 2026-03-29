# 🎂 Happy Birthday Mom Mayla — Birthday Card Site

A beautiful multi-page birthday card website, deployable via GitHub Pages.

---

## 📁 Folder Structure

```
birthday-card/
├── index.html        ← Page 1: Space/Fireworks landing page
├── page2.html        ← Page 2: Birthday message + sky/clouds
├── page3.html        ← Page 3: Photo gallery
├── style.css         ← Shared styles for all pages
├── music.js          ← Shared music player logic
├── fireworks.js      ← Fireworks animation (Page 1)
├── stars.js          ← Twinkling stars (Page 1)
│
├── music/
│   └── birthday.mp3  ← ⚠️ YOU MUST ADD THIS FILE
│
├── images/
│   ├── photo1.jpg    ← ⚠️ YOU MUST ADD THESE FILES
│   ├── photo2.jpg
│   ├── photo3.jpg
│   ├── photo4.jpg
│   ├── photo5.jpg
│   ├── photo6.jpg
│   ├── photo7.jpg
│   ├── photo8.jpg
│   ├── photo9.jpg
│   └── photo10.jpg
│
└── README.md
```

---

## 🎵 Adding Background Music

1. Get any birthday/celebration MP3 you like (e.g. from YouTube converter or royalty-free sites like pixabay.com/music).
2. Rename it to `birthday.mp3`.
3. Place it inside the `music/` folder.

> Note: Browsers may block autoplay. The site handles this gracefully — music will start on the user's first click if autoplay is blocked.

---

## 📸 Adding Photos (Page 3 Gallery)

1. Collect 10 photos of/with Mom.
2. Name them exactly: `photo1.jpg`, `photo2.jpg`, ... `photo10.jpg`
3. Place them all inside the `images/` folder.
4. Photos can be JPG, PNG, or WebP — just update the file extensions in `page3.html` if needed.

> Tip: Resize photos to ~800x600px before uploading to keep the site fast.

---

## 🚀 Deploying to GitHub Pages

1. Create a new repository on GitHub (e.g. `birthday-mom`).
2. Upload all files maintaining the folder structure above.
3. Go to **Settings → Pages**.
4. Under **Source**, select `main` branch, root folder `/`.
5. Click **Save**.
6. Your site will be live at: `https://yourusername.github.io/birthday-mom/`

---

## ✨ Features

| Page | Features |
|------|----------|
| Page 1 | Space/purple background, animated fireworks, twinkling stars, shooting stars, animated envelope button |
| Page 2 | Animated sky with floating clouds, birthday message, Bible verse, runaway "No" button |
| Page 3 | Falling petals background, gallery button, 5×2 photo grid with pop-in animation, lightbox full view |
| All Pages | Persistent background music with pause button, smooth page transitions |

---

## 🔧 Customization Tips

- **Change captions** in gallery: Edit the `captions` array in `page3.html`
- **Change message text**: Edit the `<p class="message-text">` in `page2.html`
- **More/fewer photos**: Adjust the `images` array in `page3.html` and update the grid columns in `style.css`
