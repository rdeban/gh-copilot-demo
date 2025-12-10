# 🛒 Feature: Shopping Cart Management

## Description

Add comprehensive shopping cart functionality to the Album Viewer application, allowing users to manage their album selections before purchase. This feature will enable users to add albums to their cart, view cart contents, manage quantities, and remove items.

## User Story

**As a** music lover browsing the album collection  
**I want** to add albums to a shopping cart and manage my selections  
**So that** I can review and organize my intended purchases before checkout

## Current State

- Users can view albums in a grid layout
- "Add to Cart" button exists but is not functional
- No cart state management or persistence
- No visual feedback for cart contents

## Proposed Solution

Implement a complete shopping cart system with the following components:

### 1. Cart State Management
- Create a composable (`useCart()`) for centralized cart state management
- Store cart items with album details and quantities
- Persist cart data to `localStorage` for session continuity
- Provide reactive cart operations (add, remove, update quantity, clear)

### 2. Header Cart Icon & Badge
- Add a cart icon in the application header (next to language selector)
- Display a badge showing the total number of items in cart
- Make the cart icon clickable to toggle cart drawer/modal
- Update badge count reactively when cart changes

### 3. Cart Drawer/Modal
- Implement a slide-out drawer or modal for cart display
- Show list of all cart items with:
  - Album cover image (thumbnail)
  - Album title and artist
  - Unit price
  - Quantity controls (increment/decrement)
  - Remove button
  - Subtotal per item
- Display cart summary:
  - Total number of items
  - Subtotal
  - Tax (if applicable)
  - Grand total
- Include "Clear Cart" button
- Add "Checkout" button (can be placeholder for now)
- Close button/overlay click to dismiss

### 4. Add to Cart Functionality
- Wire up "Add to Cart" buttons in `AlbumCard` component
- Show visual feedback when item is added (toast notification or button state change)
- Handle duplicate items by incrementing quantity
- Animate cart badge when items are added

### 5. Multi-language Support
- Add cart-related translations to all locale files (en, fr, de):
  - Cart labels and buttons
  - Quantity controls
  - Total/subtotal labels
  - Empty cart messages
  - Success notifications

## Implementation Details

### File Structure
```
src/
├── composables/
│   └── useCart.ts           # Cart state management composable
├── components/
│   ├── CartIcon.vue         # Header cart icon with badge
│   ├── CartDrawer.vue       # Cart display drawer/modal
│   └── CartItem.vue         # Individual cart item component
├── types/
│   └── cart.ts              # Cart-related TypeScript interfaces
└── i18n/
    └── locales/
        ├── en.ts            # Update with cart translations
        ├── fr.ts            # Update with cart translations
        └── de.ts            # Update with cart translations
```

### TypeScript Interfaces

```typescript
// src/types/cart.ts
export interface CartItem {
  album: Album
  quantity: number
}

export interface CartState {
  items: CartItem[]
  isOpen: boolean
}
```

### useCart Composable

```typescript
// src/composables/useCart.ts
export function useCart() {
  const items = ref<CartItem[]>([])
  const isOpen = ref(false)
  
  // Computed properties
  const itemCount = computed(() => 
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )
  const subtotal = computed(() => 
    items.value.reduce((sum, item) => sum + (item.album.price * item.quantity), 0)
  )
  
  // Methods
  const addToCart = (album: Album) => { /* ... */ }
  const removeFromCart = (albumId: number) => { /* ... */ }
  const updateQuantity = (albumId: number, quantity: number) => { /* ... */ }
  const clearCart = () => { /* ... */ }
  const toggleCart = () => { /* ... */ }
  
  // Persistence
  const loadCart = () => { /* from localStorage */ }
  const saveCart = () => { /* to localStorage */ }
  
  return {
    items,
    isOpen,
    itemCount,
    subtotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart
  }
}
```

### Integration Points

1. **App.vue**
   - Add `<CartIcon />` to header next to language selector
   - Add `<CartDrawer />` at root level for overlay display

2. **AlbumCard.vue**
   - Import and use `useCart()` composable
   - Wire click handler to "Add to Cart" button
   - Add visual feedback on successful addition

3. **i18n Updates**
   - Add cart-related translation keys to all locales

## Acceptance Criteria

### Functional Requirements
- [ ] Cart icon appears in header with badge showing item count
- [ ] Badge displays "0" when cart is empty, or shows actual count (e.g., "3")
- [ ] Clicking cart icon opens/closes the cart drawer
- [ ] Clicking "Add to Cart" on any album adds it to the cart
- [ ] Adding the same album twice increments its quantity instead of creating duplicates
- [ ] Cart drawer displays all added albums with correct information
- [ ] Users can increment/decrement quantity for each item in cart
- [ ] Quantity cannot go below 1 (show remove button instead)
- [ ] Users can remove individual items from cart
- [ ] "Clear Cart" button empties the entire cart with confirmation
- [ ] Cart displays correct subtotal and grand total calculations
- [ ] Cart persists across page refreshes (localStorage)
- [ ] Empty cart shows appropriate message (e.g., "Your cart is empty")

### UI/UX Requirements
- [ ] Cart drawer animates smoothly when opening/closing
- [ ] Badge count updates reactively and immediately
- [ ] Visual feedback when adding items (toast/notification or button animation)
- [ ] Cart drawer has close button and closes when clicking overlay
- [ ] Responsive design works on mobile, tablet, and desktop
- [ ] Cart icon is visually distinct and easy to identify
- [ ] All buttons have hover states and are keyboard accessible

### Translation Requirements
- [ ] All cart UI text is translated in English
- [ ] All cart UI text is translated in French
- [ ] All cart UI text is translated in German
- [ ] Language switching updates cart UI immediately

### Technical Requirements
- [ ] Cart state is managed through composable pattern
- [ ] TypeScript types are defined for all cart-related data
- [ ] Cart data persists to localStorage
- [ ] Cart data is loaded from localStorage on app initialization
- [ ] No console errors or warnings
- [ ] Code follows existing project structure and conventions

## Design Considerations

### Cart Drawer Layout
- **Position**: Right-side slide-out drawer (slides from right edge)
- **Width**: 400px on desktop, full width on mobile
- **Background**: White/light background with subtle shadow
- **Header**: "Shopping Cart" title with close button
- **Content**: Scrollable list of cart items
- **Footer**: Sticky footer with totals and action buttons

### Cart Badge
- **Style**: Small circular badge with bright color (e.g., red/orange)
- **Position**: Top-right corner of cart icon
- **Content**: Number only (e.g., "5"), hide if zero

### Visual Feedback
- **Add to Cart**: 
  - Option 1: Toast notification (e.g., "Album added to cart!")
  - Option 2: Button changes to "Added ✓" briefly
  - Option 3: Subtle cart icon shake/bounce animation
- **Remove Item**: Fade-out animation before removal

## Out of Scope (Future Enhancements)

The following items are NOT included in this initial implementation:
- Checkout/payment processing
- User accounts or saved carts
- Wishlist functionality
- Product recommendations in cart
- Coupon/discount codes
- Shipping calculations
- Cart item limits

## Testing Checklist

- [ ] Add single album to cart
- [ ] Add same album multiple times (quantity increment)
- [ ] Add multiple different albums
- [ ] Remove single item from cart
- [ ] Clear entire cart
- [ ] Increment quantity from cart drawer
- [ ] Decrement quantity from cart drawer
- [ ] Close cart drawer with close button
- [ ] Close cart drawer by clicking overlay
- [ ] Refresh page and verify cart persists
- [ ] Test with empty cart state
- [ ] Test with cart containing many items (scrolling)
- [ ] Switch languages and verify all cart text updates
- [ ] Test on mobile viewport
- [ ] Test on tablet viewport
- [ ] Test on desktop viewport
- [ ] Test keyboard navigation
- [ ] Verify calculations are correct for various quantities/prices

## Additional Notes

- Consider adding animation/transition effects for better UX
- Ensure accessibility (ARIA labels, keyboard navigation, screen reader support)
- Follow existing color scheme and design patterns
- Use existing icon library or add cart icon asset
- Consider adding sound/haptic feedback for mobile devices (optional)

## Priority

**Medium-High** - Core e-commerce functionality that enhances user experience

## Estimated Effort

**3-5 hours** for experienced Vue.js developer

---

**Labels**: `enhancement`, `feature`, `vue`, `ui/ux`, `i18n`  
**Milestone**: v1.1.0
