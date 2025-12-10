<template>
  <Teleport to="body">
    <Transition name="cart-overlay">
      <div 
        v-if="isOpen" 
        class="cart-overlay" 
        @click="closeCart"
      ></div>
    </Transition>
    
    <Transition name="cart-drawer">
      <div v-if="isOpen" class="cart-drawer">
        <div class="cart-header">
          <h2>{{ t.cart.title }}</h2>
          <button 
            class="close-btn" 
            @click="closeCart"
            :aria-label="t.cart.close"
          >
            ✕
          </button>
        </div>
        
        <div v-if="items.length === 0" class="cart-empty">
          <div class="empty-icon">🛒</div>
          <p class="empty-title">{{ t.cart.empty }}</p>
          <p class="empty-description">{{ t.cart.emptyDescription }}</p>
        </div>
        
        <div v-else class="cart-content">
          <div class="cart-items">
            <CartItem 
              v-for="item in items" 
              :key="item.album.id" 
              :item="item" 
            />
          </div>
          
          <div class="cart-summary">
            <div class="summary-row">
              <span>{{ t.cart.subtotal }}:</span>
              <span class="summary-value">${{ subtotal.toFixed(2) }}</span>
            </div>
            <div class="summary-row">
              <span>{{ t.cart.tax }} (10%):</span>
              <span class="summary-value">${{ tax.toFixed(2) }}</span>
            </div>
            <div class="summary-row total-row">
              <span>{{ t.cart.total }}:</span>
              <span class="summary-value">${{ total.toFixed(2) }}</span>
            </div>
          </div>
          
          <div class="cart-actions">
            <button class="btn btn-clear" @click="handleClearCart">
              {{ t.cart.clearCart }}
            </button>
            <button class="btn btn-checkout">
              {{ t.cart.checkout }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useCart } from '../composables/useCart'
import { useI18n } from '../i18n'
import CartItem from './CartItem.vue'

const { items, isOpen, subtotal, tax, total, clearCart, closeCart } = useCart()
const { t } = useI18n()

const handleClearCart = () => {
  if (confirm(t.value.cart.confirmClear)) {
    clearCart()
  }
}
</script>

<style scoped>
.cart-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  backdrop-filter: blur(2px);
}

.cart-drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: 450px;
  background: white;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  display: flex;
  flex-direction: column;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 2px solid #f0f0f0;
  background: #667eea;
  color: white;
}

.cart-header h2 {
  margin: 0;
  font-size: 1.5rem;
}

.close-btn {
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: white;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background 0.2s ease;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.cart-empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  text-align: center;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 0.5rem 0;
}

.empty-description {
  color: #666;
  margin: 0;
}

.cart-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.cart-items {
  flex: 1;
  overflow-y: auto;
}

.cart-summary {
  padding: 1.5rem;
  border-top: 2px solid #f0f0f0;
  background: #f9f9f9;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  font-size: 1rem;
  color: #666;
}

.summary-row:last-child {
  margin-bottom: 0;
}

.total-row {
  font-size: 1.25rem;
  font-weight: bold;
  color: #333;
  padding-top: 0.75rem;
  border-top: 2px solid #e0e0e0;
  margin-top: 0.75rem;
}

.summary-value {
  font-weight: 600;
  color: #333;
}

.cart-actions {
  padding: 1rem 1.5rem 1.5rem;
  display: flex;
  gap: 0.75rem;
  border-top: 1px solid #e0e0e0;
}

.btn {
  flex: 1;
  padding: 0.875rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-clear {
  background: white;
  color: #ff4757;
  border: 2px solid #ff4757;
}

.btn-clear:hover {
  background: #ff4757;
  color: white;
}

.btn-checkout {
  background: #667eea;
  color: white;
}

.btn-checkout:hover {
  background: #5a6fd8;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

/* Transitions */
.cart-overlay-enter-active,
.cart-overlay-leave-active {
  transition: opacity 0.3s ease;
}

.cart-overlay-enter-from,
.cart-overlay-leave-to {
  opacity: 0;
}

.cart-drawer-enter-active,
.cart-drawer-leave-active {
  transition: transform 0.3s ease;
}

.cart-drawer-enter-from,
.cart-drawer-leave-to {
  transform: translateX(100%);
}

@media (max-width: 768px) {
  .cart-drawer {
    max-width: 100%;
  }
  
  .cart-header {
    padding: 1rem;
  }
  
  .cart-header h2 {
    font-size: 1.25rem;
  }
  
  .cart-actions {
    flex-direction: column;
  }
}
</style>
