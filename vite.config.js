import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/TA/', // <-- ჩაამატეთ ეს ხაზი (თქვენი რეპოზიტორიის სახელი)
})
