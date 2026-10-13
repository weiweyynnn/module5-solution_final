# Coursera Module 5 — David Chu's China Bistro

This is the **Module 5 Coding Assignment** for the Johns Hopkins University / Coursera course **HTML, CSS, and JavaScript for Web Developers**.

## What was completed

The home page shows the **Menu**, **Specials**, and **Map** tiles. On every page load, JavaScript:

1. Requests the menu categories from the restaurant's live Firebase data source.
2. Chooses a **random category object** with `chooseRandomCategory(categories)`.
3. Extracts that category's `short_name`.
4. Replaces `{{randomCategoryShortName}}` inside the fetched home snippet with a **quoted JavaScript string** via `JSON.stringify(chosenCategoryShortName)` and `insertProperty(...)`.
5. Inserts the completed snippet into `#main-content`.

Clicking **Specials** opens the menu items page for that chosen category. Clicking the **restaurant name/logo** returns to Home and selects again. The **Menu** navigation displays all category tiles.

**Important:** `snippets/home-snippet.html` retains the assignment's exact `{{randomCategoryShortName}}` placeholder. All changes required by the assignment are implemented in `js/script.js` (STEP 0–STEP 4).

## Where the assignment logic lives

- `js/script.js` — completed assignment logic and category/menu rendering.
- `snippets/home-snippet.html` — unchanged assignment home snippet.
- `js/ajax-utils.js` — AJAX helper with offline fallback handling.
- `js/data-fallback.js` — optional representative sample data if the Firebase menu API is unavailable. When the live API works, the site uses real returned categories/menu items.
- `css/styles.css` — responsive restaurant website design.
- `index.html` — home page and navigation.
- `vendor/` — included Bootstrap 3.4.1 and jQuery 3.7.1; no CDN is needed for these scripts.

*Some restaurant imagery and Google Maps content are served from external sources and require an internet connection. Offline fallback menu **items** are demonstration samples, not an official restaurant menu.*

## Run locally

Since the app loads separate HTML snippets with AJAX, open it through an HTTP server, **not by double-clicking** `index.html`.

With Python 3 installed, open a terminal in this folder and run:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000/`. Alternatively use VS Code's **Live Server** extension.

## Test it

1. Open the site. You should see Menu, Specials, and Map.
2. Click **Specials**. A category title and its menu items appear.
3. Click the **David Chu's China Bistro** title to go Home.
4. Click **Specials** again. It will usually show a different category.
5. Try different screen widths and the mobile navigation toggle.

Random means the same category can occasionally repeat; this is expected.

## Publish on GitHub Pages

1. Extract the ZIP archive.
2. Copy the `module5-solution` folder to your GitHub course repository.
3. Commit/push all files **including** `snippets/`, `vendor/`, `css/`, `js/`, and `images/`.
4. In GitHub repository **Settings → Pages**, select **Deploy from a branch**, `main`, `/ (root)`.
5. Visit `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/module5-solution/`.
6. Test Specials and submit that exact URL to Coursera for peer review.

The public live restaurant API is `https://coursera-jhu-default-rtdb.firebaseio.com/`. If it is temporarily unavailable, a small local demonstration dataset ensures menu pages still work.

## Source and licensing

Course assignment and restaurant code architecture: [JHU Coursera `fullstack-course4`](https://github.com/jhu-ep-coursera/fullstack-course4). The required home snippet was preserved. This package includes a recreated, customized layout rather than the full upstream starter archive; `js/script.js` retains the assignment's exact core approach with the TODO steps completed. Bootstrap and jQuery licenses appear in `LICENSES.txt`.

## Verification note (October 2026)

Fixed HTML-attribute escaping for the random Specials link and added system-symbol replacements for Bootstrap icons because font files are not bundled. Node checks and in-browser Chromium DOM interaction tests passed for Menu, Specials, mobile navigation, and the offline fallback. Live API and external Google Maps behavior still depend on network access.
