import { createApp } from 'vue'
import '@/main.ts'
import './style.css'
import { bootstrapDirective } from '@/directives/bootstrap.ts'
import App from './App.vue'

createApp(App).directive('bs', bootstrapDirective).mount('#app')
