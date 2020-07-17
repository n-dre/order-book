function reconcileOrder(existingBook, incomingOrder) {
  let updatedBook = []

  if (existingBook === 0) {
    updatedBook = existingBook.concat(incomingOrder)

    return updatedBook
  }

  while (existingBook.length > 0 && incomingOrder.quantity > 0) {
    const item = existingBook.shift()

    if (
      item.type !== incomingOrder.type &&
      item.price === incomingOrder.price
    ) {
      if (incomingOrder.quantity >= item.quantity) {
        incomingOrder = {
          type: incomingOrder.type,
          price: incomingOrder.price,
          quantity: incomingOrder.quantity - item.quantity,
        }
      } else {
        incomingOrder = {
          type: item.type,
          price: item.price,
          quantity: item.quantity - incomingOrder.quantity,
        }
      }
    } else {
      updatedBook.push(item)
    }
  }
  if (existingBook.length > 0) {
    updatedBook = updatedBook.concat(existingBook)
  }
  if (incomingOrder.quantity > 0) {
    updatedBook.push(incomingOrder)
  }
  if (incomingOrder.quantity < 0) {
    return updatedBook.push([incomingOrder])
  }

  return updatedBook
}

module.exports = reconcileOrder
