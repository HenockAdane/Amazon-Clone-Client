export const addItemToCartAction = (item, quantity) => ({
    type: "ADDTOCART",
    item,
    quantity
})

export const reduceItemFromCartAction = (item) => ({
    type: "REDUCEFROMCART",
    item
})

export const removeItemFromCartAction = (item) => ({
    type: "REMOVEFROMCART",
    item
})

export const addLocalStorageCartAction = (array) => ({
    type: "ADDLOCALSTORAGECART",
    array
})

export const removeAllItemsFromCart = () => ({
    type: "REMOVEALLITEMSFROMCART"
})

const addItemToCartFunction = (shoppingCart, item, quantity) => {

    //checking if quantity is specificed
    if (!quantity){
        quantity = 1
    }

    //checking if item is already in cart
    const exists = shoppingCart.find(itemInCart => itemInCart._id === item._id)

    if (exists){
        //increasing the quantity of the item in the cart by 1
        return shoppingCart.map(itemInCart => itemInCart === exists ? {...itemInCart, quantity: itemInCart.quantity + quantity} : itemInCart)
    }

    else{
        //adding the item to the cart
        return [...shoppingCart, {...item, quantity: quantity}]
    }

}

const reduceItemFromCartFunction = (shoppingCart, item) => {

        //getting the item in the cart
        const cartItem = shoppingCart.find(itemInCart => itemInCart._id === item._id)

        if (cartItem.quantity > 1){
            //reducing its quantity by 1
            return shoppingCart.map(itemInCart => itemInCart._id === cartItem._id ? {...itemInCart, quantity: itemInCart.quantity - 1} : itemInCart)
        }
    
        else{
            //removing it from the cart
            return shoppingCart.filter(itemInCart => itemInCart._id !== cartItem._id)
        }

}

const removeItemFromCartFunction = (shoppingCart, item) => {

    //getting the item in the cart
    const cartItem = shoppingCart.find(itemInCart => itemInCart === item)

    //removing it from the cart
    return shoppingCart.filter(itemInCart => itemInCart !== cartItem)


}

const IS = {
    shoppingCart: []
}

const shoppingCartReducer = (state = IS, action) => {
    switch(action.type){
        case "ADDTOCART":
            return {...state, shoppingCart: addItemToCartFunction(state.shoppingCart, action.item, action.quantity)};
        case "REDUCEFROMCART":
            return {...state, shoppingCart: reduceItemFromCartFunction(state.shoppingCart, action.item)}
        case "REMOVEFROMCART":
            return {...state, shoppingCart: removeItemFromCartFunction(state.shoppingCart, action.item)}
        case "REMOVEALLITEMSFROMCART":
            return {...state, shoppingCart: []}
        case "ADDLOCALSTORAGECART":
            return {...state, shoppingCart: action.array}
        default: return state
    }
}

export default shoppingCartReducer