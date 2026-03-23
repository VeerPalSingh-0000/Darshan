# Image Loading Optimization Guide

## Overview

Images on your Darshanam website now load **lazily and efficiently** to improve performance. This guide explains the optimizations applied and how to apply them to new images.

---

## 🚀 What's Changed

### 1. **Lazy Loading Added**

All non-critical images now use `loading="lazy"` to defer loading until they're needed.

```jsx
<img
  src={kapilaImg}
  alt="Sage Kapila"
  loading="lazy" // ← Defers loading until image enters viewport
  decoding="async" // ← Prevents blocking render pipeline
/>
```

### 2. **Async Decoding**

Images now use `decoding="async"` to prevent blocking the rendering thread.

### 3. **Netlify Cache Headers**

Images are cached aggressively for 1 year with immutable flag:

```
Cache-Control: public, max-age=31536000, immutable
```

### 4. **Optimized Image Component (Optional)**

Created `OptimizedImage.jsx` component for advanced use cases:

- Blur-up loading effect
- Loading skeleton placeholder
- Proper width/height attributes (prevents CLS)
- Smooth fade-in animation

---

## 📋 Best Practices for Images

### ✅ Above-the-Fold Images (Hero sections)

```jsx
<img
  src={heroImg}
  alt="Hero Image"
  loading="eager" // Load immediately
  decoding="async" // Don't block rendering
/>
```

### ✅ Below-the-Fold Images (Cards, galleries)

```jsx
<img
  src={cardImg}
  alt="Card Image"
  loading="lazy" // Defer until needed
  decoding="async" // Async decode
/>
```

### ✅ Using the OptimizedImage Component

```jsx
import OptimizedImage from "../Components/OptimizedImage";

<OptimizedImage
  src={imagePath}
  alt="Image description"
  width={800}
  height={600}
  loading="lazy"
  className="w-full h-auto rounded-lg"
/>;
```

---

## 🔍 Files Updated

✅ **src/Pages/Schools/SamkhyaPage.jsx**

- Hero image: `loading="eager"` + `decoding="async"`
- Card images (Purusha, Prakriti): `loading="lazy"` + `decoding="async"`

✅ **src/Pages/ExplorePage.jsx**

- Hero image: `loading="eager"` + `decoding="async"`

✅ **netlify.toml**

- Added aggressive image caching (1 year, immutable)
- Added compression headers
- Added security headers

✅ **src/Components/OptimizedImage.jsx**

- New reusable component for advanced image optimization
- Supports blur-up effect, loading skeleton, and error handling

---

## 📝 Apply to Other Pages

For images in other School pages (YogaPage, VedantaPage, etc.), follow this pattern:

### Hero Section Images

```jsx
<img src={sageImg} alt="Sage Name" loading="eager" decoding="async" />
```

### Card/Content Images

```jsx
<img src={illustrationImg} alt="Illustration" loading="lazy" decoding="async" />
```

---

## ⚡ Expected Performance Improvements

- **Faster Initial Page Load**: Hero content loads first, images defer
- **Better Core Web Vitals**: Improved LCP (Largest Contentful Paint)
- **Reduced Bandwidth**: Images load only when needed
- **Better User Experience**: Smoother page transitions

---

## 🧪 Testing

To verify lazy loading works:

1. Open DevTools (F12) → Network tab
2. Filter by "Img"
3. Scroll down the page
4. Watch images load as they enter the viewport
5. Check the timeline - notice images load after the page skeleton

---

## 📚 Learn More

- [MDN: HTML img loading attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#loading)
- [MDN: HTMLImageElement.decoding](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/decoding)
- [Netlify Image Optimization](https://docs.netlify.com/image-optimization/overview/)
- [Web.dev: Optimize Images](https://web.dev/performance-images/)

---

## 🎯 Next Steps (Optional but Recommended)

### 1. Convert Images to WebP

```bash
# Use ImageMagick or online tools to convert PNGs to WebP
# WebP offers 25-35% better compression than PNG
```

### 2. Use Picture Element for Multiple Formats

```jsx
<picture>
  <source srcSet={webpImage} type="image/webp" />
  <img src={fallbackImage} alt="..." loading="lazy" />
</picture>
```

### 3. Use Srcset for Responsive Images

```jsx
<img
  src={image}
  srcSet={`${image}?w=800 800w, ${image}?w=1200 1200w`}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  loading="lazy"
/>
```

---

**Built with ❤️ for better performance**
