/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
        // Custom space-themed animations
        'float': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-15px) rotate(1deg)' },
          '66%': { transform: 'translateY(-5px) rotate(-1deg)' },
        },
        'shoot-star': {
          '0%': { transform: 'translateX(-100vw) rotate(45deg)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateX(100vw) rotate(45deg)', opacity: '0' },
        },
        'shoot-star-delayed': {
          '0%': { transform: 'translateX(-100vw) rotate(45deg)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateX(100vw) rotate(45deg)', opacity: '0' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-up-delayed': {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'orbit': {
          from: { transform: 'rotate(0deg) translateX(50px) rotate(0deg)' },
          to: { transform: 'rotate(360deg) translateX(50px) rotate(-360deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 5px rgba(6, 182, 212, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(6, 182, 212, 0.8)' },
        }
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
        // Custom space-themed animations
        'float': 'float 6s ease-in-out infinite',
        'shoot-star': 'shoot-star 3s linear infinite',
        'shoot-star-delayed': 'shoot-star-delayed 4s linear infinite 2s',
        'spin-slow': 'spin-slow 20s linear infinite',
        'fade-in-up': 'fade-in-up 1s ease-out forwards',
        'fade-in-up-delayed': 'fade-in-up-delayed 1s ease-out 0.5s forwards',
        'orbit': 'orbit 10s linear infinite',
        'pulse-glow': 'pulse-glow 2s infinite',
  		},
      // Custom space-themed gradients
      backgroundImage: {
        'space-gradient': 'linear-gradient(135deg, #0f172a 0%, #581c87 50%, #0f172a 100%)',
        'nebula-gradient': 'linear-gradient(45deg, #06b6d4 0%, #8b5cf6 50%, #ec4899 100%)',
        'cosmic-gradient': 'radial-gradient(ellipse at center, #1e1b4b 0%, #0f172a 70%)',
      },
      // Custom box shadows
      boxShadow: {
        'space': '0 25px 50px -12px rgba(6, 182, 212, 0.25)',
        'cosmic': '0 25px 50px -12px rgba(139, 92, 246, 0.25)',
        'nebula': '0 25px 50px -12px rgba(236, 72, 153, 0.25)',
        'glow-cyan': '0 0 20px rgba(6, 182, 212, 0.5)',
        'glow-purple': '0 0 20px rgba(139, 92, 246, 0.5)',
        'glow-pink': '0 0 20px rgba(236, 72, 153, 0.5)',
      }
  	}
  },
  plugins: [require("tailwindcss-animate")],
};