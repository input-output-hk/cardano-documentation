const baseTheme = {
  fonts: {
    mono: '"SF Mono", "Roboto Mono", Menlo, monospace',
  },
}

const lightTheme = {
  ...baseTheme,
  label: 'light',
  colors: {
    background: '#fff',
    panelBackground: 'rgba(0, 0, 0, 0.05)',
    accent: 'rgba(0, 0, 0, 0.1)',
    heading: '#000',
    text: '#1d1e21',
    preFormattedText: 'rgb(245, 247, 249)',
    link: 'rgba(0,51,173,1)',
    info: '#5281f7',
    warn: '#FFD166',
    alert: '#ff5553',
    primary: 'rgba(0,51,173,1)',
    secondary: '#fff',
    primaryAccent: 'rgba(0,51,173,0.05)',
  },
}

const darkTheme = {
  ...baseTheme,
  label: 'dark',
  colors: {
    background: '#1d1e21',
    panelBackground: 'rgba(255, 255, 255, 0.1)',
    accent: 'rgba(255, 255, 255, 0.2)',
    heading: '#fff',
    text: '#fff',
    preFormattedText: '#000',
    link: '#ff5553',
    info: '#5281f7',
    warn: '#FFD166',
    alert: '#ff5553',
    primary: 'rgba(0,51,173,1)',
    secondary: '#fff',
    primaryAccent: 'rgba(0,51,173,0.05)',
  },
}

export { lightTheme, darkTheme }
