import { ref, computed, watch } from 'vue'
import type { Album } from '../types/album'
import type { CartItem } from '../types/cart'

const CART_STORAGE_KEY = 'shopping-cart'

// Shared state
const items = ref<CartItem[]>([])
const isOpen = ref(false)

// Load cart from localStorage on initialization
const loadCart = () => {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY)
    if (saved) {
      items.value = JSON.parse(saved)
    }
  } catch (error) {
    console.error('Failed to load cart from localStorage:', error)
  }
}

// Save cart to localStorage
const saveCart = () => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items.value))
  } catch (error) {
    console.error('Failed to save cart to localStorage:', error)
  }
}

// Initialize cart on first import
loadCart()

// Watch for changes and save to localStorage
watch(items, saveCart, { deep: true })

export function useCart() {
  // Computed properties
  const itemCount = computed(() => 
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )
  
  const subtotal = computed(() => 
    items.value.reduce((sum, item) => sum + (item.album.price * item.quantity), 0)
  )

  const tax = computed(() => subtotal.value * 0.1) // 10% tax

  const total = computed(() => subtotal.value + tax.value)
  
  // Methods
  const addToCart = (album: Album) => {
    const existingItem = items.value.find(item => item.album.id === album.id)
    
    if (existingItem) {
      existingItem.quantity++
    } else {
      items.value.push({
        album,
        quantity: 1
      })
    }
  }
  
  const removeFromCart = (albumId: number) => {
    const index = items.value.findIndex(item => item.album.id === albumId)
    if (index !== -1) {
      items.value.splice(index, 1)
    }
  }
  
  const updateQuantity = (albumId: number, quantity: number) => {
    const item = items.value.find(item => item.album.id === albumId)
    if (item && quantity > 0) {
      item.quantity = quantity
    }
  }
  
  const clearCart = () => {
    items.value = []
  }
  
  const toggleCart = () => {
    isOpen.value = !isOpen.value
  }

  const openCart = () => {
    isOpen.value = true
  }

  const closeCart = () => {
    isOpen.value = false
  }
  
  return {
    items,
    isOpen,
    itemCount,
    subtotal,
    tax,
    total,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
    openCart,
    closeCart
  }
}
