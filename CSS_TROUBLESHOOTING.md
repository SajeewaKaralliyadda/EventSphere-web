# CSS Troubleshooting Guide - Text Visibility Issues

## 🚨 Problem: White text on white background or text not visible

### Quick Fixes

#### 1. **Clear Browser Cache & Hard Reload** ⚡

**Most common issue!**

**Windows/Linux:**

```
Ctrl + Shift + R
```

**Mac:**

```
Cmd + Shift + R
```

Or completely clear cache:

- Chrome: `Ctrl+Shift+Delete` → Clear cached images and files
- Firefox: `Ctrl+Shift+Delete` → Clear cache
- Edge: `Ctrl+Shift+Delete` → Clear cache

---

#### 2. **Restart Vite Dev Server** 🔄

Sometimes Tailwind doesn't recompile properly.

**Stop the server:**

```powershell
Ctrl + C
```

**Start again:**

```powershell
npm run dev
```

---

#### 3. **Force Tailwind Rebuild** 🔨

Delete the generated Tailwind cache and rebuild:

```powershell
# Stop the dev server (Ctrl+C)

# Remove node_modules/.vite directory
Remove-Item -Recurse -Force node_modules/.vite

# Restart dev server
npm run dev
```

---

## 🔍 Diagnosis Steps

### Check 1: Is Tailwind CSS Loading?

Open browser DevTools (F12) → Network tab → Reload page

**Look for:**

- CSS files loading
- No 404 errors for CSS
- index.css should be loaded

**If CSS not loading:**

1. Check `src/main.jsx` has `import './index.css'` ✅ (Already correct)
2. Check `src/index.css` has `@import "tailwindcss";` ✅ (Already correct)
3. Check `vite.config.js` has `tailwindcss()` plugin ✅ (Already correct)

---

### Check 2: Are Classes Being Applied?

Open DevTools (F12) → Elements tab → Inspect an element

**What to look for:**

- Check if Tailwind classes like `bg-white`, `text-gray-900` are in the HTML
- Check if those classes have actual CSS rules in the Computed tab
- If classes exist but no styles, Tailwind isn't compiling

**Example:**

```html
<!-- Good: Classes applied -->
<h1 class="text-4xl font-bold text-gray-900">Title</h1>

<!-- Bad: Classes missing -->
<h1>Title</h1>
```

---

### Check 3: Color Inheritance Issues

**Problem:** Sometimes colors don't inherit properly.

**Solution:** Added to index.css:

```css
/* Ensure text is always visible */
p,
span,
div,
a,
button,
input,
select,
textarea,
label {
  color: inherit;
}

/* Dark backgrounds should have light text */
.bg-dark-800,
.bg-dark-900,
.bg-gray-900 {
  color: #f1f5f9 !important;
}

/* Light backgrounds should have dark text */
.bg-white,
.bg-gray-50,
.bg-gray-100 {
  color: #1e293b;
}
```

---

## 🎨 Common CSS Issues & Solutions

### Issue 1: All Text is White

**Cause:** Base color not set or being overridden

**Fix:** ✅ Already applied in `index.css`:

```css
:root {
  color: #1e293b; /* Dark gray text */
}

body {
  color: #1e293b;
}
```

---

### Issue 2: Footer Text Not Visible

**Cause:** Footer has dark background but text color not light

**Check:** Footer component should have:

```jsx
<footer className="bg-dark-800 text-gray-300">{/* Footer content */}</footer>
```

**Fix:** ✅ Already correct in `Footer.jsx`

---

### Issue 3: Card Text Not Visible

**Cause:** Card component might not have proper text colors

**Check:** Cards should use:

```jsx
<Card>
  <h3 className="text-gray-900">Dark heading</h3>
  <p className="text-gray-600">Gray text</p>
</Card>
```

**Fix:** ✅ Already correct in components

---

### Issue 4: Button Text Not Visible

**Cause:** Button variant colors not working

**Check:** Button component in `Button.jsx`:

```javascript
const variants = {
  primary: "bg-primary-600 text-white", // ✅
  white: "bg-white text-gray-700", // ✅
};
```

**Fix:** ✅ Already correct

---

## 🔧 Nuclear Option: Complete Reset

If nothing else works, do a complete rebuild:

```powershell
# Stop dev server (Ctrl+C)

# Delete all cache and dependencies
Remove-Item -Recurse -Force node_modules
Remove-Item -Recurse -Force .vite
Remove-Item -Force package-lock.json

# Reinstall everything
npm install

# Start dev server
npm run dev
```

---

## 📊 Expected Color Scheme

### Text Colors (from light to dark):

```css
.text-gray-300  /* #d1d5db - Very light (for dark backgrounds) */
/* #d1d5db - Very light (for dark backgrounds) */
.text-gray-400  /* #9ca3af - Light gray */
.text-gray-500  /* #6b7280 - Medium gray */
.text-gray-600  /* #4b5563 - Dark gray (body text) */
.text-gray-700  /* #374151 - Darker gray */
.text-gray-900; /* #111827 - Almost black (headings) */
```

### Background Colors:

```css
.bg-white       /* #ffffff - White */
/* #ffffff - White */
.bg-gray-50     /* #f9fafb - Very light gray */
.bg-gray-100    /* #f3f4f6 - Light gray */
.bg-dark-800; /* #1e293b - Dark (footer) */
```

### Brand Colors:

```css
.bg-primary-600   /* #0284c7 - Blue */
/* #0284c7 - Blue */
.bg-secondary-600 /* #c026d3 - Purple */
.text-primary-600; /* Blue text */
```

---

## 🎯 Page-Specific Color Guide

### Landing Page (LandingPage.jsx)

- Hero section: `bg-gradient-to-br from-primary-600 to-secondary-600 text-white` ✅
- Features: `bg-gray-50` with `text-gray-900` headings ✅
- Body text: `text-gray-600` ✅

### Events Page (EventsPage.jsx)

- Page background: `bg-gray-50` ✅
- Page title: `text-gray-900` ✅
- Event cards: `bg-white` with `text-gray-900` headings ✅
- Event descriptions: `text-gray-600` ✅

### Navbar (Navbar.jsx)

- Background: `bg-white` ✅
- Links: `text-gray-700` ✅
- Logo: Gradient text ✅

### Footer (Footer.jsx)

- Background: `bg-dark-800` (dark) ✅
- Text: `text-gray-300` (light) ✅
- Headings: `text-white` ✅

---

## 🐛 Debugging Checklist

- [ ] Hard reload browser (Ctrl+Shift+R)
- [ ] Dev server restarted
- [ ] Check browser console for errors (F12 → Console)
- [ ] Check Network tab for CSS loading (F12 → Network)
- [ ] Inspect element to see if classes applied (F12 → Elements)
- [ ] Check if Tailwind colors visible in Computed tab
- [ ] Clear browser cache completely
- [ ] Delete `.vite` folder and restart
- [ ] Run `npm install` again
- [ ] Check if other Tailwind classes work (try changing `bg-red-500` manually)

---

## 🎬 Step-by-Step Fix Process

### Step 1: Verify Tailwind is Working

1. Open `src/pages/public/LandingPage.jsx`
2. Find any element
3. Temporarily change its class to `bg-red-500 text-white`
4. Save and check if it turns red

**If NO:**

- Tailwind isn't loading → Restart dev server → Clear cache

**If YES:**

- Tailwind works → Issue is with specific classes → Continue...

### Step 2: Check Specific Page

1. Open the page where text isn't visible
2. Inspect element with DevTools (F12)
3. Check "Computed" tab for actual color value
4. If color is `rgb(255, 255, 255)` (white), that's the issue

### Step 3: Fix the Colors

Add explicit text color classes:

```jsx
// Before (might be invisible):
<h1 className="text-4xl font-bold">Title</h1>

// After (definitely visible):
<h1 className="text-4xl font-bold text-gray-900">Title</h1>

// For paragraphs:
<p className="text-gray-600">Content</p>

// For dark backgrounds:
<div className="bg-dark-800">
  <p className="text-gray-300">Light text on dark background</p>
</div>
```

---

## ✅ Verification

After fixes, your pages should look like:

### ✅ Good Color Contrast Examples:

**Headers:**

- `text-gray-900` on `bg-white` ✓
- `text-white` on `bg-primary-600` ✓
- `text-gray-100` on `bg-dark-800` ✓

**Body Text:**

- `text-gray-600` on `bg-white` ✓
- `text-gray-300` on `bg-dark-800` ✓

**Buttons:**

- Primary: `bg-primary-600 text-white` ✓
- Secondary: `bg-white text-gray-700 border-gray-300` ✓

---

## 📝 Quick Reference: Text Color Classes

Use these for proper contrast:

```jsx
// On white/light backgrounds:
<h1 className="text-gray-900">Heading</h1>
<p className="text-gray-700">Body text</p>
<span className="text-gray-600">Secondary text</span>
<small className="text-gray-500">Muted text</small>

// On dark backgrounds:
<h1 className="text-white">Heading</h1>
<p className="text-gray-200">Body text</p>
<span className="text-gray-300">Secondary text</span>
<small className="text-gray-400">Muted text</small>

// Colored text:
<span className="text-primary-600">Blue text</span>
<span className="text-success">Green text</span>
<span className="text-error">Red text</span>
```

---

## 🆘 Still Not Working?

### Last Resort Solutions:

#### Option 1: Check if Vite port is correct

Default is `http://localhost:5173` but yours might be `5174`

#### Option 2: Try a different browser

Sometimes browser extensions block CSS. Try:

- Chrome (Incognito mode)
- Firefox
- Edge

#### Option 3: Check for CSS conflicts

Look for any other CSS files that might be overriding Tailwind.

#### Option 4: Create a test page

Create a simple test to verify Tailwind works:

```jsx
// src/pages/test/TestPage.jsx
const TestPage = () => {
  return (
    <div className="p-8">
      <div className="bg-red-500 text-white p-4 mb-4">
        Red background, white text
      </div>
      <div className="bg-white text-gray-900 p-4 mb-4 border">
        White background, dark text
      </div>
      <div className="bg-gray-900 text-white p-4 mb-4">
        Dark background, white text
      </div>
      <button className="bg-primary-600 text-white px-4 py-2 rounded">
        Primary Button
      </button>
    </div>
  );
};
```

Add route: `/test` → If this displays correctly, Tailwind works!

---

## 💡 Prevention Tips

1. **Always specify text colors explicitly** when using background colors
2. **Use semantic color names** (`text-gray-900` not `text-black`)
3. **Test in multiple browsers** during development
4. **Hard reload frequently** when changing CSS
5. **Check DevTools regularly** to verify classes are applied

---

**Last Updated:** December 4, 2025  
**Status:** CSS fixes applied - Restart dev server and hard reload browser

---

## 🎯 Next Steps

1. **Stop your dev server** (Ctrl+C)
2. **Delete `.vite` folder:** `Remove-Item -Recurse -Force node_modules/.vite`
3. **Restart dev server:** `npm run dev`
4. **Hard reload browser:** `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
5. **Check if text is now visible**

If still not working, check DevTools (F12) → Console for any errors and share them!
