import type { Album } from './album'

export interface CartItem {
  album: Album
  quantity: number
}

export interface CartState {
  items: CartItem[]
  isOpen: boolean
}
