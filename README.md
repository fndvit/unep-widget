# UNEP climate widget

Install the dependencies...

```bash
npm install
```

# Development

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

# Production build

```bash
npm run build
```

The entire `public/` folder should be hosted statically

# Embedding

An example of this can be seen in `index.html`:
```html
<script defer src='<base_url>/embed.js'></script>
```

This will inject the widget iframe into the DOM wherever the `<script>` tag is located.
