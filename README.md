# Password Generator

A modern, secure password generator built with vanilla JavaScript, HTML, and CSS. This application allows users to generate strong, customizable passwords with various character options and provides real-time strength indication.

## 🔗 Live Demo

[View Live Demo](https://dean2424.github.io/Password-Generator-Frontend-Mentor-/)

## 📸 Screenshot

![Password Generator Screenshot](<./screenshots/Screenshot%20(9).png>)

## ✨ Features

- **Customizable Length**: Generate passwords between 6-20 characters
- **Character Options**:
  - Uppercase letters (A-Z)
  - Lowercase letters (a-z)
  - Numbers (0-9)
  - Symbols (!@#$%^&\*()...)
- **Visual Slider**: Interactive range slider with real-time updates
- **Password Strength Indicator**: Color-coded strength meter with 5 levels
- **One-Click Copy**: Copy generated password to clipboard
- **Local Storage**: Remembers your preferences between sessions
- **Clear Function**: Reset all settings and generated password
- **Cross-Browser Compatible**: Works on Chrome, Firefox, Safari, and Edge
- **Responsive Design**: Mobile-friendly interface

## 🛠️ Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with custom properties and flexbox
- **JavaScript (ES6+)**: Vanilla JavaScript with modern features
- **Google Fonts**: JetBrains Mono font family
- **Local Storage API**: For persistent user preferences

## 🚀 Getting Started

### Prerequisites

- A modern web browser
- No additional dependencies required

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Dean2424/Password-Generator-Frontend-Mentor-.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Password-Generator-Frontend-Mentor-
   ```

3. Open `index.html` in your web browser or serve it using a local server:

   ```bash
   # Using Python
   python -m http.server 8000

   # Using Node.js
   npx serve .

   # Using Live Server extension in VS Code
   Right-click on index.html > "Open with Live Server"
   ```

## 💻 Usage

1. **Set Password Length**: Use the slider to choose your desired password length (6-20 characters)
2. **Select Character Types**: Check the boxes for the types of characters you want to include:
   - Uppercase Letters
   - Lowercase Letters
   - Numbers
   - Symbols
3. **Generate Password**: Click the "GENERATE" button to create a new password
4. **Copy Password**: Click the copy icon to copy the password to your clipboard
5. **Check Strength**: View the strength indicator to see how secure your password is
6. **Clear Settings**: Use the "CLEAR" button to reset all settings and the generated password

## 🎨 Design Features

- **Dark Theme**: Modern dark color scheme for comfortable viewing
- **Interactive Elements**: Hover effects and smooth transitions
- **Visual Feedback**:
  - Color-coded strength indicator
  - Copy confirmation message
  - Hover states for all interactive elements
- **Typography**: JetBrains Mono for excellent readability and modern appearance

## 🔧 Technical Implementation

### Password Generation

- Cryptographically secure random number generation
- Character pool building based on user selections
- Validation to ensure at least one character type is selected

### Strength Calculation

The strength meter evaluates passwords based on:

- Presence of uppercase letters
- Presence of lowercase letters
- Presence of numbers
- Presence of special characters
- Password length (bonus for 12+ characters)

### Browser Compatibility

- Cross-browser form state management
- Chrome-specific fixes for form persistence issues
- Firefox and Safari compatibility optimizations

## 📁 Project Structure

```
password-generator/
├── index.html          # Main HTML file
├── style.css           # Stylesheet
├── app.js             # JavaScript functionality
├── imgs/
│   └── images/
│       ├── icon-arrow-right.svg
│       ├── icon-check.svg
│       └── icon-copy.svg
└── README.md          # This file
```

## 🌟 Key Features Explained

### Local Storage Integration

- Automatically saves user preferences (length, character options)
- Remembers last generated password
- Restores settings on page refresh

### Responsive Design

- Mobile-first approach
- Flexible layouts that work on all screen sizes
- Touch-friendly interface elements

### Accessibility Features

- Semantic HTML structure
- Proper form labels and associations
- Keyboard navigation support
- High contrast color scheme

## 🐛 Browser-Specific Notes

### Chrome

- Enhanced form reset functionality to prevent unwanted form state persistence
- Multiple initialization attempts to handle Chrome's aggressive form restoration
- Autocomplete attributes to prevent auto-filling

### Firefox & Edge

- Standard implementation works without additional fixes
- Full feature compatibility

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Dean2424**

- GitHub: [@Dean2424](https://github.com/Dean2424)
- Project: [Password Generator Frontend Mentor](https://github.com/Dean2424/Password-Generator-Frontend-Mentor-)

## 🙏 Acknowledgments

- Design inspiration from Frontend Mentor challenges
- Google Fonts for the JetBrains Mono font family
- Icons and visual elements for enhanced user experience

---

### 🔒 Security Note

This password generator runs entirely in your browser. No passwords are sent to any server, ensuring your generated passwords remain completely private and secure.
