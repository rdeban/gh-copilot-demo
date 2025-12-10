<template>
  <div class="cart-item">
    <div class="cart-item-image">
      <img :src="item.album.image_url" :alt="item.album.title" />
    </div>
    
    <div class="cart-item-details">
      <h4 class="cart-item-title">{{ item.album.title }}</h4>
      <p class="cart-item-artist">{{ item.album.artist }}</p>
      <p class="cart-item-price">${{ item.album.price.toFixed(2) }}</p>
    </div>
    
    <div class="cart-item-controls">
      <div class="quantity-controls">
        <button 
          class="quantity-btn" 
          @click="decrementQuantity"
          :aria-label="`Decrease quantity`"
        >
          -
        </button>
        <span class="quantity">{{ item.quantity }}</span>
        <button 
          class="quantity-btn" 
          @click="incrementQuantity"
          :aria-label="`Increase quantity`"
        >
          +
        </button>
      </div>
      
      <button 
        class="remove-btn" 
        @click="handleRemove"
        :aria-label="t.cart.remove"
      >
        {{ t.cart.remove }}
      </button>
    </div>
    
    <div class="cart-item-subtotal">
      ${{ (item.album.price * item.quantity).toFixed(2) }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CartItem } from '../types/cart'
import { useCart } from '../composables/useCart'
import { useI18n } from '../i18n'

interface Props {
  item: CartItem
}

const props = defineProps<Props>()
const { updateQuantity, removeFromCart } = useCart()
const { t } = useI18n()

const incrementQuantity = () => {
  updateQuantity(props.item.album.id, props.item.quantity + 1)
}

const decrementQuantity = () => {
  if (props.item.quantity > 1) {
    updateQuantity(props.item.album.id, props.item.quantity - 1)
  }
}

const handleRemove = () => {
  removeFromCart(props.item.album.id)
}
</script>

<style scoped>
.cart-item {
  display: grid;
  grid-template-columns: 80px 1fr auto auto;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid #e0e0e0;
  align-items: center;
  transition: background 0.2s ease;
}

.cart-item:hover {
  background: #f9f9f9;
}

.cart-item-image {
  width: 80px;
  height: 80px;
  overflow: hidden;
  border-radius: 8px;
}

.cart-item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cart-item-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.cart-item-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  color: #333;
}

.cart-item-artist {
  font-size: 0.875rem;
  color: #666;
  margin: 0;
}

.cart-item-price {
  font-size: 0.875rem;
  color: #667eea;
  font-weight: 600;
  margin: 0;
}

.cart-item-controls {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #f5f5f5;
  border-radius: 8px;
  padding: 0.25rem;
}

.quantity-btn {
  width: 28px;
  height: 28px;
  border: none;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  color: #667eea;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantity-btn:hover {
  background: #667eea;
  color: white;
}

.quantity {
  min-width: 30px;
  text-align: center;
  font-weight: 600;
  color: #333;
}

.remove-btn {
  background: transparent;
  border: none;
  color: #ff4757;
  cursor: pointer;
  font-size: 0.875rem;
  padding: 0.25rem 0.5rem;
  transition: all 0.2s ease;
  text-decoration: underline;
}

.remove-btn:hover {
  color: #ff3838;
  text-decoration: none;
}

.cart-item-subtotal {
  font-size: 1.125rem;
  font-weight: bold;
  color: #333;
  text-align: right;
  min-width: 80px;
}

@media (max-width: 768px) {
  .cart-item {
    grid-template-columns: 60px 1fr;
    gap: 0.75rem;
  }
  
  .cart-item-image {
    width: 60px;
    height: 60px;
  }
  
  .cart-item-controls {
    grid-column: 1 / -1;
    flex-direction: row;
    justify-content: space-between;
  }
  
  .cart-item-subtotal {
    grid-column: 1 / -1;
    text-align: left;
  }
}
</style>
