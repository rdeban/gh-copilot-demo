<template>
  <div class="cart-icon-wrapper">
    <button 
      class="cart-icon-btn" 
      @click="toggleCart"
      :aria-label="t.cart.openCart"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      >
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
      </svg>
      
      <Transition name="badge">
        <span v-if="itemCount > 0" class="cart-badge" :class="{ shake: badgeShake }">
          {{ itemCount }}
        </span>
      </Transition>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useCart } from '../composables/useCart'
import { useI18n } from '../i18n'

const { t } = useI18n()
const { itemCount, toggleCart } = useCart()

const badgeShake = ref(false)

// Animate badge when item count changes
watch(itemCount, (newCount, oldCount) => {
  if (newCount > oldCount) {
    badgeShake.value = true
    setTimeout(() => {
      badgeShake.value = false
    }, 500)
  }
})
</script>

<style scoped>
.cart-icon-wrapper {
  position: relative;
}

.cart-icon-btn {
  position: relative;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  padding: 0.75rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  color: white;
}

.cart-icon-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.cart-icon-btn:active {
  transform: translateY(0);
}

.cart-icon-btn svg {
  width: 24px;
  height: 24px;
}

.cart-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
  color: white;
  border-radius: 50%;
  min-width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  border: 2px solid white;
}

.cart-badge.shake {
  animation: shake 0.5s ease-in-out;
}

/* Badge transition */
.badge-enter-active,
.badge-leave-active {
  transition: all 0.3s ease;
}

.badge-enter-from {
  transform: scale(0);
  opacity: 0;
}

.badge-leave-to {
  transform: scale(0);
  opacity: 0;
}

/* Shake animation */
@keyframes shake {
  0%, 100% {
    transform: rotate(0deg) scale(1);
  }
  25% {
    transform: rotate(-15deg) scale(1.1);
  }
  50% {
    transform: rotate(15deg) scale(1.1);
  }
  75% {
    transform: rotate(-10deg) scale(1.05);
  }
}

@media (max-width: 768px) {
  .cart-icon-btn {
    padding: 0.625rem;
  }
  
  .cart-icon-btn svg {
    width: 20px;
    height: 20px;
  }
  
  .cart-badge {
    min-width: 20px;
    height: 20px;
    font-size: 0.7rem;
  }
}
</style>
