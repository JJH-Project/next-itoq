import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}', // Next.js app 디렉토리 기준
        './pages/**/*.{js,ts,jsx,tsx}', // (만약 pages 폴더도 있다면)
        './components/**/*.{js,ts,jsx,tsx}', 
    ],
    theme: {
    extend: {},
    },
    plugins: [],
}

export default config
    