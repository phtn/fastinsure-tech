import { type Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";
import tw3d from "tailwindcss-3d";

export const nextUIconfig = {
  themes: {
    light: {
      colors: {
        default: "#14141b",
        background: "#FAFAFA",
        foreground: "#14141b",
        primary: {
          DEFAULT: "#14141b",
          foreground: "#FAFAFA",
          50: "#fafafa",
          100: "#e0e0e1",
          200: "#c7c7c8",
          300: "#adadb0",
          400: "#949497",
          500: "#7a7a7e",
          600: "#616165",
          700: "#47474d",
          800: "#2e2e34",
          900: "#14141b",
        },
        secondary: {
          DEFAULT: "#419CFF",
          foreground: "#FAFAFA",
          50: "#FAFAFA",
          100: "#E5F0FB",
          200: "#D1E5FB",
          300: "#BCDBFC",
          400: "#A8D0FC",
          500: "#93C6FD",
          600: "#7FBBFD",
          700: "#6AB1FE",
          800: "#56A6FE",
          900: "#419CFF",
        },
        warning: {
          DEFAULT: "#FDB856",
          50: "#FBE4C2",
          100: "#FBDBAC",
          200: "#FCD297",
          300: "#FCCA81",
          400: "#FDC16C",
          500: "#FDB856",
          600: "#FEAF41",
          700: "#FEA72B",
          800: "#FF9E16",
          900: "#FF9500",
        },
        danger: {
          DEFAULT: "#F53329",
          foreground: "#FAFAFA",
          50: "#FAFAFA",
          100: "#F9E4E3",
          200: "#F9CECC",
          300: "#F8B8B4",
          400: "#F8A29D",
          500: "#F78B86",
          600: "#F7756F",
          700: "#F65F57",
          800: "#F64940",
          900: "#F53329",
        },
        success: {
          DEFAULT: "#00D469",
          foreground: "#FAFAFA",
          50: "#FAFAFA",
          100: "#DEF6EA",
          200: "#C2F2DA",
          300: "#A7EDCA",
          400: "#8BE9BA",
          500: "#6FE5A9",
          600: "#53E199",
          700: "#38DC89",
          800: "#1CD879",
          900: "#00D469",
        },
      },
    },
    dark: {
      colors: {
        background: "#14141B",
        foreground: "#FAFAFA",
        primary: {
          DEFAULT: "#FAFAFA",
          foreground: "#14141B",
          50: "#14141B",
          100: "#2E2E34",
          200: "#47474D",
          300: "#616165",
          400: "#7A7A7E",
          500: "#949497",
          600: "#ADADB0",
          700: "#C7C7C8",
          800: "#E0E0E1",
          900: "#FAFAFA",
        },
        secondary: {
          DEFAULT: "#419CFF",
          foreground: "#FAFAFA",
          50: "#419CFF",
          100: "#56A6FE",
          200: "#6AB1FE",
          300: "#7FBBFD",
          400: "#93C6FD",
          500: "#A8D0FC",
          600: "#BCDBFC",
          700: "#D1E5FB",
          800: "#E5F0FB",
          900: "#FAFAFA",
        },
        warning: {
          DEFAULT: "#FFB33F",
          foreground: "#FAFAFA",
          50: "#FBE4C2",
          100: "#FBDFB3",
          200: "#FCD9A5",
          300: "#FCD496",
          400: "#FDCE88",
          500: "#FDC979",
          600: "#FEC36B",
          700: "#FEBE5C",
          800: "#FFB84E",
          900: "#FFB33F",
        },
        danger: {
          DEFAULT: "#FF6861",
          foreground: "#FAFAFA",
          50: "#FAFAFA",
          100: "#FBEAE9",
          200: "#FBDAD8",
          300: "#FCC9C7",
          400: "#FCB9B6",
          500: "#FDA9A5",
          600: "#FD9994",
          700: "#FE8883",
          800: "#FE7872",
          900: "#FF6861",
        },
        success: {
          DEFAULT: "#2FDB5B",
          foreground: "#FAFAFA",
          50: "#FAFAFA",
          100: "#E3F7E8",
          200: "#CDF3D7",
          300: "#B6F0C5",
          400: "#A0ECB3",
          500: "#89E9A2",
          600: "#73E590",
          700: "#5CE27E",
          800: "#46DE6D",
          900: "#2FDB5B",
        },
      },
    },
    dev: {
      colors: {
        default: "#E1E2E2",
        background: "#FAFAFA",
        foreground: "#14141B",
        primary: {
          DEFAULT: "#14141B",
          foreground: "#FAFAFA",
          50: "#FAFAFA",
          100: "#E1E2E2",
          200: "#C8C9CA",
          300: "#B0B1B2",
          400: "#97999A",
          500: "#7E8082",
          600: "#65686A",
          700: "#4D5052",
          800: "#34373A",
          900: "#14141B",
        },
        secondary: {
          DEFAULT: "#8B77CB",
          foreground: "#FAFAFA",
          50: "#F5D0FE",
          100: "#E0BEF4",
          200: "#CBACEA",
          300: "#B69BE0",
          400: "#A189D6",
          500: "#8B77CB",
          600: "#7665C1",
          700: "#6154B7",
          800: "#4C42AD",
          900: "#3730A3",
        },
      },
    },
    devdark: {
      colors: {
        background: "#14141B",
        foreground: "#FAFAFA",
        primary: {
          DEFAULT: "#FAFAFA",
          foreground: "#14141B",
          50: "#14141B",
          100: "#34373A",
          200: "#4D5052",
          300: "#65686A",
          400: "#7E8082",
          500: "#97999A",
          600: "#B0B1B2",
          700: "#C8C9CA",
          800: "#E1E2E2",
          900: "#FAFAFA",
        },
        secondary: {
          DEFAULT: "#A189D6",
          foreground: "#FAFAFA",
          50: "#3730A3",
          100: "#4C42AD",
          200: "#6154B7",
          300: "#7665C1",
          400: "#8B77CB",
          500: "#A189D6",
          600: "#B69BE0",
          700: "#CBACEA",
          800: "#E0BEF4",
          900: "#F5D0FE",
        },
      },
    },
  },
};

export default {
  content: [
    "./src/**/*.tsx",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  mode: "jit",
  theme: {
  	extend: {
  		backgroundSize: {
  			'size-200': '200% 200%'
  		},
  		backgroundPosition: {
  			'pos-0': '0% 0%',
  			'pos-100': '100% 100%'
  		},
  		fontFamily: {
  			sans: [
  				'var(--font-geist)'
  			],
  			mono: [
  				'var(--font-mono)'
  			],
  			inter: [
  				'var(--font-inter)'
  			],
  			jet: [
  				'var(--font-jet)'
  			],
  			inst: [
  				'var(--font-inst)'
  			]
  		},
  		animation: {
  			ripp: 'ripp .750s ease-out',
  			enter: 'enter 0.275s ease-out normal both',
  			focus: 'enter 0.275s ease-out normal both',
  			back: 'back 0.25s ease-out normal both',
  			shimmer: 'shimmer 5s linear infinite',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			marquee: 'marquee var(--duration) linear infinite',
  			'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
  			grid: 'grid 35s linear infinite',
  			ripple: 'ripple var(--duration,2s) ease calc(var(--i, 0)*.2s) infinite'
  		},
  		keyframes: {
  			ripp: {
  				'0%': {
  					opacity: '1'
  				},
  				'100%': {
  					transform: 'scale(2)',
  					opacity: '0'
  				}
  			},
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
  			back: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateZ(0) scale(1.05)'
  				},
  				'60%': {
  					opacity: '0.75',
  					transform: 'translateZ(0) scale(1.025)',
  					backfaceVisibility: 'hidden',
  					webkitFontSmoothing: 'antialiased'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateZ(0) scale(1)'
  				}
  			},
  			enter: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateZ(0) scale(0.95)'
  				},
  				'60%': {
  					opacity: '0.75',
  					transform: 'translateZ(0) scale(1.01)',
  					backfaceVisibility: 'hidden',
  					webkitFontSmoothing: 'antialiased'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateZ(0) scale(1)'
  				}
  			},
  			focus: {
  				'0%': {
  					transform: 'translateZ(0) scale(0.90)'
  				},
  				'60%': {
  					transform: 'translateZ(0) scale(1.5)',
  					webkitFontSmoothing: 'antialiased'
  				},
  				'100%': {
  					transform: 'translateZ(0) scale(1)'
  				}
  			},
  			shimmer: {
  				from: {
  					backgroundPosition: '0 0'
  				},
  				to: {
  					backgroundPosition: '-200% 0'
  				}
  			},
  			skate: {
  				from: {
  					transform: 'translateX(-2rem)'
  				},
  				to: {
  					transform: 'translateX(0)'
  				}
  			},
  			marquee: {
  				from: {
  					transform: 'translateX(0)'
  				},
  				to: {
  					transform: 'translateX(calc(-100% - var(--gap)))'
  				}
  			},
  			'marquee-vertical': {
  				from: {
  					transform: 'translateY(0)'
  				},
  				to: {
  					transform: 'translateY(calc(-100% - var(--gap)))'
  				}
  			},
  			grid: {
  				'0%': {
  					transform: 'translateY(-50%)'
  				},
  				'100%': {
  					transform: 'translateY(0)'
  				}
  			},
  			ripple: {
  				'0%, 100%': {
  					transform: 'translate(-50%, -50%) scale(1)'
  				},
  				'50%': {
  					transform: 'translate(-50%, -50%) scale(0.9)'
  				}
  			}
  		},
  		transitionDuration: {
  			'2000': '2000ms',
  			'3000': '3000ms',
  			'4000': '4000ms',
  			'5000': '5000ms'
  		},
  		boxShadow: {
  			'i-tl-lg': 'inset 15px 30px 60px -25px rgba(125, 125, 125, 0.15)',
  			'i-br-lg': 'inset -10px -30px 60px -10px rgba(125, 125, 125, 0.15)',
  			'i-br-li': 'inset -15px -30px 40px -30px rgba(203, 213, 225, 0.35)',
  			'i-tl-li-hv': 'inset 20px 20px 60px -30px rgba(100, 116, 139, 0.20)',
  			'i-br-dk': 'inset -15px -30px 40px -30px rgba(255, 255, 255, 0.50)',
  			'i-tl-dk-hv': 'inset 25px 15px 60px -30px rgba(225, 225, 225, 0.8)',
  			'i-tl-li': 'inset 20px 20px 40px -30px rgba(125, 125, 125, 0.15)',
  			'i-br-li-hv': 'inset -20px -20px 40px -30px rgba(125, 125, 125, 0.20)',
  			'i-tl-dk': 'inset 20px 20px 40px -30px rgba(255, 255, 255, 0.85)',
  			'i-br-dk-hv': 'inset -20px -20px 40px -30px rgba(255, 255, 255, 0.70)',
  			'i-br-md-m': 'inset -15px -30px 40px -20px rgba(175, 175, 175, 0.8)'
  		},
  		colors: {
  			'macl-red': '#FF3B2F',
  			'macd-red': '#FE453A',
  			'macl-orange': '#FF9500',
  			'macd-orange': '#FF9E0B',
  			'macl-yellow': '#FFCC01',
  			'macd-yellow': '#FFD608',
  			'macl-green': '#26CD41',
  			'macd-green': '#32D74B',
  			'macl-mint': '#02C7BE',
  			'macd-mint': '#66D4CF',
  			'macl-teal': '#59ADC4',
  			'macd-teal': '#69C4DC',
  			'macl-cyan': '#54BEF0',
  			'macd-cyan': '#5AC8F4',
  			'macl-blue': '#007AFE',
  			'macd-blue': '#0A84FF',
  			'macl-indigo': '#5856D6',
  			'macd-indigo': '#5E5CE6',
  			'macl-purple': '#AE52DE',
  			'macd-purple': '#BE5AF2',
  			'macl-pink': '#FF375F',
  			'macd-pink': '#FF6482',
  			'macl-brown': '#A2845E',
  			'macd-brown': '#AC8E68',
  			'macl-gray': '#8E8E93',
  			'macd-gray': '#98989D',
  			void: '#14141B',
  			darkvoid: '#09090c',
  			chalk: '#fafafa',
  			toolbar: '#383836',
  			'dock-dark': '#2c2c2c',
  			'dock-dark-fade': '#383838',
  			'icon-dark': '#b8b8b6',
  			'shadow-dark': '#161616',
  			'fade-dark': '#6a6a68',
  			'chrome-dark': '#3f3f3f',
  			'dark-content': '#1e1e1e',
  			'dock-border': '#CBCAC8',
  			shadow: '#f2f2f2',
  			icon: '#6B6A68',
  			fade: '#f5f5f5',
  			scrollbar: '#2b2b2b',
  			'border-fade': '#f2f2f2',
  			'border-fade-dark': '#3e3e3e',
  			figma: '#0c8ce9',
  			'figma-light': '#41a4ed',
  			steel: '#9ca3af',
  			adam: '#52525b',
  			dock: '#d9d9d9',
  			demigod: '#d9d9d9',
  			goddess: '#F7F6F4',
  			god: '#EAE9E7',
  			coolgray: '#eceff1',
  			cake: '#F3F1FF',
  			ice: '#ECEEFF',
  			coolice: '#D6E3FF',
  			coolbreeze: '#E3FAED',
  			vanilla: '#F3FCEE',
  			army: '#AAB5B5',
  			darkarmy: '#4C5C67',
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
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  darkMode: ["class", "class"],
  plugins: [tw3d({}), nextui(nextUIconfig), require("tailwindcss-animate")],
} satisfies Config;
