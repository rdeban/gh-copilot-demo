<template>
  <div class="cart-icon-container">
    <button 
      class="cart-icon-button" 
      @click="toggleCart"
      :aria-label="t.cart.title"
    >
      <svg 
        class="cart-icon" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="2"
      >
        <path d="M9 2L7 6H2l3 13h14l3-13h-5L15 2H9z"/>
        <path d="M9 6v12"/>
        <path d="M15 6v12"/>
      </svg>
      <span v-if="itemCount > 0" class="cart-badge">{{ itemCount }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useCart } from '../composables/useCart'
import { useI18n } from '../i18n'

const { itemCount, toggleCart } = useCart()
const { t } = useI18n()
</script>

<style scoped>
.cart-icon-container {
  position: relative;
}

.cart-icon-button {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.5);
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.cart-icon-button:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: white;
  transform: scale(1.05);
}

.cart-icon {
  width: 24px;
  height: 24px;
  color: white;
}

.cart-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ff4757;
  color: white;
  border-radius: 50%;
  min-width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: bold;
  padding: 0 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  animation: badge-pop 0.3s ease;
}

@keyframes badge-pop {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

@media (max-width: 768px) {
  .cart-icon-button {
    padding: 0.4rem;
  }
  
  .cart-icon {
    width: 20px;
    height: 20px;
  }
}
</style>
