export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (!(product && typeof product === 'object' && product.id)) return;

    let  
      cartItem,
      findItem = this.cartItems.find( el => el.product.id === product.id);

    if (findItem) {
      findItem.count++
      cartItem = findItem
    } else {
      cartItem = {product, count: 1};
      this.cartItems.push(cartItem);
    }
    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    let 
      cartItems = this.cartItems, 
      findItemIndex = this.cartItems.findIndex( el => el.product.id === productId);
      if (findItemIndex > -1) {
        if (cartItems[findItemIndex].count + amount > 0) {
          cartItems[findItemIndex].count += amount;
          this.onProductUpdate(cartItems[findItemIndex])
        } else {
          cartItems.splice(findItemIndex, 1);
        }
      }
  }

  isEmpty() {
    return this.cartItems.length === 0
  }

  getTotalCount() {
    // ваш код
    return this.cartItems.reduce((sum, el) => sum + el.count, 0)
  }

  getTotalPrice() {
    // ваш код
    return this.cartItems.reduce((sum, el) => sum + el.product.price * el.count, 0)
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

