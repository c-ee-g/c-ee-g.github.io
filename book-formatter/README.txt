Book Formatter - standalone copy

This folder is the whole app. It needs to be served by a web server
(opening index.html by double-clicking won't load the fonts).

Easiest ways to run it:

1. Cloudflare Pages / Netlify: drag this folder onto Netlify Drop
   (app.netlify.com/drop) or create a Cloudflare Pages project and
   upload the folder. You get a private web address.

2. On your own computer, with Python installed: open a terminal in
   this folder and run
       python3 -m http.server 8000
   then visit http://localhost:8000 in Chrome.

Your books are saved in the browser, separately for each address.
To move a book, use Export > Download project, then in the other
copy choose the book menu > Open project file.

For PDFs that match the preview exactly, use Chrome, Edge or Safari.
