Screen Recorder Frontend (React + Vite + Tailwind)

A modern web app that records your current browser tab + microphone (up to 3 minutes), previews the result, downloads as .webm, uploads to the backend, and lists/playbacks prior recordings stored on Cloudinary.

🚀 Features

🎥 Record tab + mic audio (mixed together)

⏱ Live timer (3-minute cap)

🔍 Preview video before upload

💾 Download .webm locally

☁️ Upload to backend → Cloudinary (via Multer/SQLite)

📜 List uploaded recordings with size, format, duration

▶️ Stream videos directly from Cloudinary CDN

🧹 Delete recordings (if backend route enabled)

📱 Responsive, clean Tailwind UI

⚙️ Prerequisites

Node.js 18+

npm (comes with Node)

Backend running at http://localhost:5000
 (or wherever you deployed it)

🔑 Environment Variables

Create .env in the project root:

VITE_API_URL=http://localhost:5000


Change this if your backend runs on another host/port.

🛠️ Installation & Setup
# 1. Install dependencies
npm install

# 2. Copy env file
cp .env.example .env
# (or create .env manually with VITE_API_URL)

# 3. Start dev server
npm run dev
# → http://localhost:5173

# 4. Build for production
npm run build

# 5. Preview production build locally
npm run preview
# → http://localhost:3000

📌 Usage

Click Start Recording → choose tab/window to record.

Speak into your mic; both video and mic audio are captured.

Timer counts up to 3 minutes (auto-stops).

When stopped:

Preview recording

Download .webm locally

Upload to backend/Cloudinary

Uploaded videos appear in the Uploaded Recordings list:

Play inline

Open on CDN

Delete (if backend supports DELETE /api/recordings/:id)

🎨 UI Notes

TailwindCSS powers all styling.

Custom utility classes (.btn, .card, .badge) are defined in src/styles.css.

Mobile-first responsive layout.

🔍 Debugging Tips

If uploads fail, check the browser console and backend logs.

Ensure VITE_API_URL points to a running backend.

Backend must have CORS enabled for http://localhost:5173.