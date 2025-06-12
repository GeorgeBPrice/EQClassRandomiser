# ⚔️ EQ Class Randomiser

A fun web page for randomly generating EverQuest character classes and race combinations, with support for the exciting Heroes Journey multi-class system.

## 🎮 About

This application allows players to randomly generate authentic EverQuest character combinations up to the Planes of Power expansion. It features a dramatic reveal system with animations, confetti celebrations, and support for the innovative Heroes Journey 3-class system.

## 🌟 Features

### Core Randomisation
- **Authentic EQ Restrictions**: Respects original EverQuest race/class limitations up to Planes of Power
- **Dramatic Reveal System**: Sequential reveal of Gender → Race → Class with animations
- **Countdown Animation**: Exciting 3-2-1 countdown with spinning dice
- **Confetti Celebration**: Colorful confetti explosion when the class is revealed

### Heroes Journey 3 Classes
- **Toggle Mode**: Switch between single class and 3-class generation
- **Base Class Rules**: First class follows authentic EQ race/class restrictions
- **Additional Classes**: Second and third classes can be any class (no restrictions)

### Visual Effects
- **Glassmorphism Design**: Modern glass-like card interface
- **Gradient Backgrounds**: Beautiful purple-to-blue gradients
- **Smooth Animations**: Framer Motion powered transitions
- **Responsive Design**: Works on desktop and mobile devices
- **Custom Toggle**: Green gradient toggle for Heroes Journey mode

## 🛠️ Technology Stack

### Frontend
- **Next.js 15.3.3**: React framework with App Router
- **React 19.0.0**: Latest React with concurrent features
- **Framer Motion 12.16.0**: Advanced animations and transitions
- **Tailwind CSS 3.4.17**: Utility-first CSS framework

### Development
- **ESLint**: Code linting and formatting
- **Turbopack**: Fast development bundler
- **PostCSS**: CSS processing with autoprefixer

### Styling
- **Glassmorphism**: Modern glass-like UI effects
- **CSS Animations**: Custom keyframe animations
- **Gradient Backgrounds**: Dynamic color transitions
- **Responsive Design**: Mobile-first approach

## 🚀 Getting Started

### Prerequisites
- Node.js 19+ 
- npm or yarn package manager

### Installation for Developers
```bash
# Clone the repository
git clone https://github.com/GeorgeBPrice/EQClassRandomiser.git
cd hero-class-randomiser

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts
```bash
npm run dev      # Start development server with Turbopack
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🎨 Customization

### Adding New Classes
Edit `app/lib/data.js`:
```javascript
export const classes = [
  "YourNewClass",
  // ... existing classes
];

export const classRaces = {
  YourNewClass: ["Human", "High Elf", "Dark Elf"],
  // ... existing restrictions
};
```

### Modifying Animations
Edit `app/globals.css` for custom CSS animations or modify Framer Motion components in the React components.

### Styling Changes
- **Colors**: Modify Tailwind classes and CSS custom properties
- **Animations**: Adjust timing in `RandomiserCard.js`
- **Layout**: Update component structure and Tailwind classes

## 📁 Project Structure

```
app/
├── components/
│   ├── RandomiserCard.js    # Main randomisation component
│   └── Confetti.js          # Confetti animation component
├── lib/
│   ├── data.js              # EQ class/race data and restrictions
│   └── icons.js             # Emoji icons for classes/races
├── globals.css              # Global styles and animations
├── layout.js                # Root layout component
└── page.js                  # Main page component
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🎯 How Heroes Journey Works (bonus section)

Heroes Journey is an innovative EverQuest system that allows characters to master multiple classes, `https://wiki.heroesjourneyemu.com/`:

### Base Class (First Class)
- **Follows EQ Rules**: Must respect original race/class restrictions
- **Examples**: 
  - Human can be Warrior, Cleric, Paladin, etc.
  - Dark Elf can be Enchanter, Necromancer, Shadowknight, etc.
  - Iksar can be Warrior, Shaman, Necromancer, etc.

### Additional Classes (Second & Third)
- **No Restrictions**: Can be any class regardless of race
- **Flexible Combinations**: Allows creative multi-class builds
- **Strategic Depth**: Opens up new gameplay possibilities

### Example Combinations
- **Berserker/Rogue/Necromancer**: High damage + stealth + magic
- **Cleric/Druid/Monk**: Healing + nature magic + martial arts
- **Warrior/Enchanter/Shaman**: Combat + crowd control + buffs

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Happy adventuring! May your random rolls bring you exciting new character Heroes!** 🎲⚔️
