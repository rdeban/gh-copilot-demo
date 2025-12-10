<template>
  <div class="cart-item">
    <div class="item-image">
      <img :src="item.album.image_url" :alt="item.album.title" />
    </div>
    
    <div class="item-details">
      <h4 class="item-title">{{ item.album.title }}</h4>
      <p class="item-artist">{{ item.album.artist }}</p>
      <p class="item-price">${{ item.album.price.toFixed(2) }}</p>
    </div>
    
    <div class="item-controls">
      <div class="quantity-controls">
        <button 
          class="qty-btn" 
          @click="decrementQuantity"
          :aria-label="t.cart.decreaseQuantity"
        >
          -
        </button>
        <span class="quantity">{{ item.quantity }}</span>
        <button 
          class="qty-btn" 
          @click="incrementQuantity"
          :aria-label="t.cart.increaseQuantity"
        >
          +
        </button>
      </div>
      
      <div class="item-subtotal">
        ${{ itemSubtotal.toFixed(2) }}
      </div>
      
      <button 
        class="remove-btn" 
        @click="removeItem"
        :aria-label="t.cart.removeItem"
      >
        ×
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CartItem } from '../types/cart'
import { useCart } from '../composables/useCart'
import { useI18n } from '../i18n'

const { t } = useI18n()
const { updateQuantity, removeFromCart } = useCart()

interface Props {
  item: CartItem
}

const props = defineProps<Props>()

const itemSubtotal = computed(() => props.item.album.price * props.item.quantity)

const incrementQuantity = () => {
  updateQuantity(props.item.album.id, props.item.quantity + 1)
}

const decrementQuantity = () => {
  updateQuantity(props.item.album.id, props.item.quantity - 1)
}

const removeItem = () => {
  removeFromCart(props.item.album.id)
}
</script>

<style scoped>
.cart-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid #e0e0e0;
  transition: background-color 0.2s ease;
}

.cart-item:hover {
  background-color: #f9f9f9;
}

.item-image {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
}

.item-title {
  margin: 0 0 0.25rem 0;
  font-size: 0.95rem;
  font-weight: 600;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-artist {
  margin: 0 0 0.25rem 0;
  font-size: 0.85rem;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-price {
  margin: 0;
  font-size: 0.85rem;
  color: #999;
}

.item-controls {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #f0f0f0;
  border-radius: 20px;
  padding: 0.25rem;
}

.qty-btn {
  width: 28px;
  height: 28px;
  border: none;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  color: #667eea;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.qty-btn:hover {
  background: #667eea;
  color: white;
  transform: scale(1.1);
}

.qty-btn:active {
  transform: scale(0.95);
}

.quantity {
  min-width: 30px;
  text-align: center;
  font-weight: 600;
  color: #333;
}

.item-subtotal {
  font-size: 1rem;
  font-weight: 700;
  color: #667eea;
}

.remove-btn {
  width: 28px;
  height: 28px;
  border: none;
  background: #ff4444;
  color: white;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  transition: all 0.2s ease;
}

.remove-btn:hover {
  background: #cc0000;
  transform: scale(1.1);
}

.remove-btn:active {
  transform: scale(0.95);
}

@media (max-width: 480px) {
  .cart-item {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .item-image {
    width: 100%;
    height: 120px;
  }
  
  .item-controls {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
}
</style>
