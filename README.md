# ✨ Darśana

> _Where Ancient Wisdom Meets Modern Understanding_

A beautifully crafted platform exploring the profound philosophical traditions of India. Darśana is your gateway to understanding the six major schools of Indian philosophy and the eternal wisdom of the Bhagavad Gita.

---

## 🌟 Features

### 📚 **Nine Philosophical Schools**

Explore the rich tapestry of Indian philosophical thought:

- **Samkhya** - Philosophy of enumeration and dualism
- **Yoga** - The path of discipline and union
- **Nyaya** - Logic and epistemology
- **Vaisheshika** - Atomistic philosophy
- **Purva Mimamsa** - Ritual philosophy
- **Uttara Mimamsa (Vedanta)** - Non-dualism and ultimate reality
- And more...

### 📖 **Bhagavad Gita**

Dive into all 18 chapters of Lord Krishna's timeless teachings:

- Complete Adhyay (chapter) wise navigation
- Sanskrit verses with translations
- Deep philosophical insights
- Audio narration support
- Beautiful verse highlighting

### 💬 **Ask Krishna**

Ask philosophical questions and receive crisp, poetic responses powered by AI:

- Grounded in Gita wisdom
- References to sacred verses
- Instant answers to spiritual queries

### 📝 **Interactive Features**

- 🧠 **Knowledge Quiz** - Test your philosophical understanding
- 📅 **Timeline** - Evolution of Indian philosophy through ages
- 🕉️ **Sanskrit** - Learn the sacred language
- 🎯 **Structured Learning** - Progressive knowledge path

### 🌓 **Dark & Light Mode**

Beautiful aesthetics in both themes for optimal viewing experience

---

## 🛠️ Technology Stack

| Category       | Technologies                            |
| -------------- | --------------------------------------- |
| **Frontend**   | React 19, React Router 7, Vite          |
| **Styling**    | Tailwind CSS 4, Framer Motion           |
| **Backend**    | Netlify Functions (Serverless)          |
| **APIs**       | Google Generative AI (Gemini 2.5 Flash) |
| **Build Tool** | Vite, PWA Plugin                        |
| **Icons**      | Heroicons React                         |
| **Animation**  | Framer Motion 12                        |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/VeerPalSingh-0000/Darshan.git
cd Darshan
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

```bash
# Create .env.local file in the root directory
cp .env.example .env.local
```

4. **Add your Gemini API key**

```
VITE_GEMINI_API_KEY=your_api_key_here
```

5. **Start the development server**

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

---

## 📁 Project Structure

```
Darshanam/
├── src/
│   ├── Components/          # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── GooeyNav.jsx
│   │   └── ...
│   ├── Pages/               # Page components
│   │   ├── Home.jsx         # Landing page
│   │   ├── Gita/            # Bhagavad Gita sections
│   │   ├── Schools.jsx      # Philosophy schools
│   │   └── ...
│   ├── context/             # React Context (Theme, Auth)
│   ├── data/                # Static data files
│   ├── lib/                 # Utility functions
│   ├── App.jsx              # Main app component
│   └── main.jsx
├── netlify/
│   └── functions/           # Serverless functions
│       └── gemini-proxy.js  # Secure AI API proxy
├── public/                  # Static assets
├── scripts/                 # Data processing scripts
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## 🔐 Security Features

### Secure API Key Management

- Gemini API key is **never exposed** to the frontend
- All API calls go through a secure Netlify Function proxy
- Production environment variables are isolated and safe

### Architecture

```
Frontend → Netlify Function (server-side) → Google Generative AI
```

---

## 📱 Responsive Design

Beautifully optimized for all screen sizes:

- ✅ Mobile phones
- ✅ Tablets
- ✅ Desktop displays
- ✅ Ultra-wide screens

---

## 🎨 Design Philosophy

Darśana follows a modern, minimalist aesthetic:

- **Color Palette**: Warm ambers with dark/light contrast
- **Typography**: Elegant serif for headings, clean sans-serif for body
- **Animations**: Smooth, purposeful Framer Motion transitions
- **Spacing**: Generous whitespace for clarity and focus
- **Accessibility**: WCAG compliant with proper contrast and keyboard navigation

---

## 🌐 Live Demo

Visit [Darshanam](https://darshanam.netlify.app) to explore the platform.

---

## 📚 Learning Resources

### Documentation by Section

#### Bhagavad Gita (18 Adhyays)

1. **Arjuna Visada Yoga** - The Yoga of Arjuna's Despair
2. **Sankhya Yoga** - The Yoga of Knowledge
3. **Karma Yoga** - The Yoga of Action
   ... and 15 more chapters of divine wisdom

#### Philosophy Schools

Deep dives into each of the six Indian philosophical schools with historical context, key concepts, and practical applications.

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## 👨‍💻 Built with ❤️ by Veer Pal Singh

### Get in Touch

- **GitHub**: [@VeerPalSingh-0000](https://github.com/VeerPalSingh-0000)
- **Location**: Jodhpur, Rajasthan 🇮🇳

### Acknowledgments

- 🙏 The ancient philosophers whose wisdom forms the foundation
- 📖 All spiritual teachers and scholars
- 🌍 The global community of knowledge seekers

---

## 🔍 Philosophy Behind Darśana

**Darśana** (दर्शन) literally means "vision" or "perspective" in Sanskrit. Just as different perspectives offer unique insights into reality, each philosophical school presents a unique viewpoint on the nature of existence, consciousness, and truth.

This platform is dedicated to preserving and sharing these timeless perspectives with the modern world.

> _"The greatest philosophy is expressed not in words, but in the living example."_ — Sri Aurobindo

---

## ✨ Future Roadmap

- 🎓 Advanced learning tracks
- 👥 Community discussions and forums
- 📱 Mobile app (iOS & Android)
- 🗣️ Multi-language support
- 🎤 Expert interviews and podcasts
- 📊 Progress tracking and personalized learning paths

---

## 📞 Support

Have questions or need help? Feel free to:

- Open an [Issue](https://github.com/VeerPalSingh-0000/Darshan/issues)
- Check existing documentation
- Reach out to the creator

---

<div align="center">

**"In every tradition, there is wisdom. In every perspective, there is truth."**

_Built for seekers, by a seeker._ ✨

</div>
