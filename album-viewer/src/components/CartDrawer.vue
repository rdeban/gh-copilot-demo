<template>
  <Teleport to="body">
    <Transition name="overlay">
      <div v-if="isOpen" class="cart-overlay" @click="closeCart"></div>
    </Transition>
    
    <Transition name="drawer">
      <div v-if="isOpen" class="cart-drawer">
        <div class="drawer-header">
          <h2>{{ t.cart.title }}</h2>
          <button class="close-btn" @click="closeCart" :aria-label="t.cart.close">
            ×
          </button>
        </div>
        
        <div class="drawer-content">
          <div v-if="items.length === 0" class="empty-cart">
            <p>{{ t.cart.empty }}</p>
          </div>
          
          <div v-else class="cart-items">
            <CartItem 
              v-for="item in items" 
              :key="item.album.id" 
              :item="item" 
            />
          </div>
        </div>
        
        <div v-if="items.length > 0" class="drawer-footer">
          <div class="cart-summary">
            <div class="summary-row">
              <span>{{ t.cart.subtotal }}:</span>
              <span>${{ subtotal.toFixed(2) }}</span>
            </div>
            <div class="summary-row">
              <span>{{ t.cart.tax }}:</span>
              <span>${{ tax.toFixed(2) }}</span>
            </div>
            <div class="summary-row total-row">
              <span>{{ t.cart.total }}:</span>
              <span>${{ total.toFixed(2) }}</span>
            </div>
            <div class="summary-row items-count">
              <span>{{ t.cart.itemCount }}:</span>
              <span>{{ itemCount }}</span>
            </div>
          </div>
          
          <div class="cart-actions">
            <button class="btn btn-secondary" @click="handleClearCart">
              {{ t.cart.clearCart }}
            </button>
            <button class="btn btn-primary" @click="handleCheckout">
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

const { t } = useI18n()
const { 
  items, 
  isOpen, 
  itemCount, 
  subtotal, 
  tax, 
  total, 
  clearCart, 
  closeCart 
} = useCart()

const handleClearCart = () => {
  if (confirm(t.value.cart.confirmClear)) {
    clearCart()
  }
}

const handleCheckout = () => {
  alert(t.value.cart.checkoutPlaceholder)
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
}

.cart-drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 400px;
  max-width: 100%;
  background: white;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  flex-direction: column;
}

.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 2px solid #f0f0f0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.drawer-header h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
}

.close-btn {
  width: 36px;
  height: 36px;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 50%;
  cursor: pointer;
  font-size: 2rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: rotate(90deg);
}

.drawer-content {
  flex: 1;
  overflow-y: auto;
}

.empty-cart {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 2rem;
  text-align: center;
}

.empty-cart p {
  font-size: 1.1rem;
  color: #999;
}

.cart-items {
  padding: 0;
}

.drawer-footer {
  border-top: 2px solid #f0f0f0;
  padding: 1.5rem;
  background: #fafafa;
}

.cart-summary {
  margin-bottom: 1rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
  color: #666;
}

.summary-row.total-row {
  font-size: 1.25rem;
  font-weight: 700;
  color: #333;
  padding-top: 0.5rem;
  margin-top: 0.5rem;
  border-top: 1px solid #e0e0e0;
}

.summary-row.items-count {
  font-size: 0.9rem;
  color: #999;
  margin-bottom: 0;
}

.cart-actions {
  display: flex;
  gap: 0.75rem;
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

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.btn-secondary {
  background: white;
  color: #667eea;
  border: 2px solid #667eea;
}

.btn-secondary:hover {
  background: #667eea;
  color: white;
}

/* Transitions */
.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.3s ease;
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

.drawer-enter-active,
.drawer-leave-active {
  transition: transform 0.3s ease;
}

.drawer-enter-from,
.drawer-leave-to {
  transform: translateX(100%);
}

/* Mobile responsive */
@media (max-width: 480px) {
  .cart-drawer {
    width: 100%;
  }
  
  .cart-actions {
    flex-direction: column;
  }
}

/* Scrollbar styling */
.drawer-content::-webkit-scrollbar {
  width: 8px;
}

.drawer-content::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.drawer-content::-webkit-scrollbar-thumb {
  background: #667eea;
  border-radius: 4px;
}

.drawer-content::-webkit-scrollbar-thumb:hover {
  background: #764ba2;
}
</style>
