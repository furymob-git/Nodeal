<script setup lang="ts">
import { ref } from 'vue'

// Modal state
const isModalOpen = ref(false)

const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value
  if (isModalOpen.value) {
    document.body.style.overflow = 'hidden' // Prevent background scrolling
  } else {
    document.body.style.overflow = ''
  }
}
</script>

<template>
  <div class="kofi-widget-wrapper">
    <!-- Floating Action Button -->
    <button @click="toggleModal" class="kofi-fab" title="Support on Ko-fi">
      <div class="kofi-icon-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="kofi-svg">
          <path d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c2.438-.426 2.683-2.566 2.658-3.734 4.352.24 7.422-2.831 6.649-6.916zm-11.062 3.511c-1.246 1.453-4.011 3.976-4.011 3.976s-.121.119-.31.023c-.076-.057-.108-.09-.108-.09-.443-.441-3.368-3.049-4.034-3.954-.709-.965-1.041-2.7-.091-3.71.951-1.01 3.005-1.086 4.363.407 0 0 1.565-1.782 3.468-.963 1.904.82 1.832 3.011.723 4.311zm6.173.478c-.928.116-1.682.028-1.682.028V7.284h1.77s1.971.551 1.971 2.638c0 1.913-.985 2.667-2.059 3.015z"/>
        </svg>
      </div>
      <span class="kofi-text">Support</span>
    </button>

    <!-- Modal Overlay -->
    <Transition name="modal-fade">
      <div v-if="isModalOpen" class="modal-backdrop" @click.self="toggleModal">
        <div class="modal-container">
          <button class="modal-close" @click="toggleModal">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          <div class="iframe-wrapper">
             <iframe 
               id='kofiframe' 
               src='https://ko-fi.com/furymob/?hidefeed=true&widget=true&embed=true&preview=true' 
               title='furymob'
             ></iframe>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* Floating Action Button Container */
.kofi-widget-wrapper {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 100;
}

/* FAB Styling */
.kofi-fab {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: linear-gradient(135deg, #FF5E5B, #eb4d4b);
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(255, 94, 91, 0.4);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  font-family: inherit;
  font-weight: 600;
  font-size: 0.95rem;
  overflow: hidden;
  position: relative;
}

.kofi-fab::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(255,255,255,0.2), transparent);
  opacity: 0;
  transition: opacity 0.3s;
}

.kofi-fab:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 25px rgba(255, 94, 91, 0.6);
}

.kofi-fab:hover::before {
  opacity: 1;
}

.kofi-fab:active {
  transform: translateY(1px) scale(0.98);
}

.kofi-icon-wrapper {
  display: flex;
  align-items: center;
  width: 20px;
  height: 20px;
}

.kofi-svg {
  width: 100%;
  height: 100%;
  animation: heartbeat 2s infinite;
}

@keyframes heartbeat {
  0% { transform: scale(1); }
  5% { transform: scale(1.2); }
  10% { transform: scale(1); }
  15% { transform: scale(1.2); }
  50% { transform: scale(1); }
  100% { transform: scale(1); }
}

/* Modal Backdrop */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

/* Modal Container */
.modal-container {
  position: relative;
  width: 90%;
  max-width: 480px;
  height: 85vh;
  max-height: 712px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  padding: 4px;
}

/* Close Button */
.modal-close {
  position: absolute;
  top: -15px;
  right: -15px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  color: #333333;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.modal-close:hover {
  background-color: #f5f5f5;
  border-color: #467ceb;
  transform: rotate(90deg);
  color: #467ceb;
}

/* Iframe Wrapper */
.iframe-wrapper {
  width: 100%;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  background-color: #ffffff;
}

#kofiframe {
  width: 100%;
  height: 100%;
  border: none;
  /* Attempt to make iframe darker in dark mode if supported by Ko-fi, 
     otherwise this acts as a placeholder background */
}

/* Transitions */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active .modal-container,
.modal-fade-leave-active .modal-container {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-fade-enter-from .modal-container,
.modal-fade-leave-to .modal-container {
  transform: scale(0.95) translateY(10px);
}
</style>
