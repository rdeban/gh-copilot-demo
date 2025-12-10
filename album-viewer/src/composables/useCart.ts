import { ref, computed, watch } from 'vue'
import type { Album } from '../types/album'
import type { CartItem, CartState } from '../types/cart'

const CART_STORAGE_KEY = 'album-viewer-cart'

// Global cart state
const items = ref<CartItem[]>([])
const isOpen = ref<boolean>(false)

// Load cart from localStorage on initialization
const loadCart = (): void => {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY)
    if (savedCart) {
      const parsed = JSON.parse(savedCart)
      items.value = parsed.items || []
    }
  } catch (error) {
    console.error('Failed to load cart from localStorage:', error)
  }
}

// Save cart to localStorage
const saveCart = (): void => {
  try {
    const cartData = {
      items: items.value
    }
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartData))
  } catch (error) {
    console.error('Failed to save cart to localStorage:', error)
  }
}

// Watch items for changes and persist
watch(items, saveCart, { deep: true })

// Initialize cart on first import
loadCart()

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
  const addToCart = (album: Album): void => {
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

  const removeFromCart = (albumId: number): void => {
    const index = items.value.findIndex(item => item.album.id === albumId)
    if (index !== -1) {
      items.value.splice(index, 1)
    }
  }

  const updateQuantity = (albumId: number, quantity: number): void => {
    const item = items.value.find(item => item.album.id === albumId)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(albumId)
      } else {
        item.quantity = quantity
      }
    }
  }

  const clearCart = (): void => {
    items.value = []
  }

  const toggleCart = (): void => {
    isOpen.value = !isOpen.value
  }

  const openCart = (): void => {
    isOpen.value = true
  }

  const closeCart = (): void => {
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
