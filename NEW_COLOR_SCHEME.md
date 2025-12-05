# EventSphere - New Color Scheme

## Updated Colors (Based on Design Mockups)

### Primary Color - Orange/Coral

**Used for**: Hero sections, primary buttons, main CTAs

- `primary-50`: #fff5f0 (Lightest)
- `primary-100`: #ffe8dc
- `primary-200`: #ffd1b9
- `primary-300`: #ffb896
- `primary-400`: #ff9e73
- `primary-500`: #ff6b35 ⭐ **Main Orange**
- `primary-600`: #ff5722
- `primary-700`: #e64a19
- `primary-800`: #d84315
- `primary-900`: #bf360c (Darkest)

### Secondary Color - Pink/Magenta

**Used for**: Event tags, secondary CTAs, highlights

- `secondary-50`: #fce4ec (Lightest)
- `secondary-100`: #f8bbd0
- `secondary-200`: #f48fb1
- `secondary-300`: #f06292
- `secondary-400`: #ec407a
- `secondary-500`: #e91e63 ⭐ **Main Pink**
- `secondary-600`: #d81b60
- `secondary-700`: #c2185b
- `secondary-800`: #ad1457
- `secondary-900`: #880e4f (Darkest)

### Accent Color - Yellow/Gold

**Used for**: "Become an Organizer" section, special highlights

- `accent-50`: #fffef5 (Lightest)
- `accent-100`: #fffde7
- `accent-200`: #fff9c4
- `accent-300`: #fff59d
- `accent-400`: #fff176
- `accent-500`: #ffd700 ⭐ **Main Gold**
- `accent-600`: #ffc107
- `accent-700`: #ffb300
- `accent-800`: #ffa000
- `accent-900`: #ff8f00 (Darkest)

### Dark Color - Navy/Purple

**Used for**: Footer, dark backgrounds, text

- `dark-50`: #e8e9f0 (Lightest)
- `dark-100`: #c8cad9
- `dark-200`: #a5a8c2
- `dark-300`: #8286ab
- `dark-400`: #686d9a
- `dark-500`: #4e5489
- `dark-600`: #474d81
- `dark-700`: #3d4376
- `dark-800`: #353a6c
- `dark-900`: #2d3142 ⭐ **Main Navy** (Footer)

### Status Colors

- `success`: #10b981 (Green)
- `warning`: #f59e0b (Amber)
- `error`: #ef4444 (Red)

---

## Usage Examples

### Hero Section

```jsx
<section className="bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-500">
```

### Primary Button

```jsx
<button className="bg-primary-500 hover:bg-primary-600 text-white">
```

### Yellow CTA Section

```jsx
<section className="bg-accent-500">
  <button className="bg-dark-900 text-white">Become an Organizer</button>
</section>
```

### Event Cards

```jsx
<div className="bg-white border-l-4 border-secondary-500">
```

### Footer

```jsx
<footer className="bg-dark-900 text-white">
```

---

## Color Updates Applied

✅ Primary: Blue → Orange/Coral (#ff6b35)
✅ Secondary: Purple → Pink/Magenta (#e91e63)
✅ Accent: Orange → Yellow/Gold (#ffd700)
✅ Dark: Gray → Navy (#2d3142)

**Note**: All components will automatically use the new colors. Refresh your browser to see the changes!
