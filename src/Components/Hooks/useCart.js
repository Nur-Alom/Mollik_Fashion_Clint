import { useEffect, useState } from "react";

const useCart = () => {
    const [cartLength, setCartLength] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [products, setProducts] = useState([]);
    const [cartProduct, setCartProduct] = useState([]);



    // Add & Update Quantity Product To Local Storage.
    const addedProduct = (_id) => {
        const exists = localStorage.getItem("cart");
        let cart = {};
        if (!exists) {
            cart[_id] = 1;
        }
        else {
            cart = JSON.parse(exists);
            if (cart[_id]) {
                cart[_id] = cart[_id] + 1;
            } else {
                cart[_id] = 1;
            }
        }
        localStorage.setItem("cart", JSON.stringify(cart));
    };



    // Set New Quantity From Product Info Page.
    const addedNewQuantity = (_id, newQuantity) => {
        const exists = localStorage.getItem("cart");
        let cart = {};
        if (!exists) {
            cart[_id] = 1;
        }
        else {
            cart = JSON.parse(exists);
            if (cart[_id]) {
                cart[_id] = cart[_id] + newQuantity;
            } else {
                cart[_id] = 1;
            }
        }
        localStorage.setItem("cart", JSON.stringify(cart));
    };



    // - Product from Local Storage.
    const removeProduct = (_id) => {
        const exists = localStorage.getItem("cart");
        const cart = JSON.parse(exists);
        if (cart[_id] > 1) {
            cart[_id] = cart[_id] - 1;
        } else {
            cart[_id] = 1;
        }
        localStorage.setItem("cart", JSON.stringify(cart));
    };



    // Remove Item from Local Storage.
    const removeItem = (_id) => {
        const exists = localStorage.getItem("cart");
        const cart = JSON.parse(exists);
        delete cart[_id];
        localStorage.setItem("cart", JSON.stringify(cart));
    };



    // Load Data in Cart Components.
    useEffect(() => {
        fetch("/Products.json")
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);



    // Set Cart Product.
    useEffect(() => {
        if (products.length) {
            const cartData = localStorage.getItem("cart")
            const data = JSON.parse(cartData)
            const productArray = [];
            for (const key in data) {
                // console.log(key, data[key])
                const product = products.find(pd => pd._id === parseInt(key))
                // console.log(product)
                if (product) {
                    const dataQuantity = data[key];
                    product.quantity = dataQuantity
                    productArray.push(product)
                }
            }
            setCartProduct(productArray)
        }
    }, [products, cartProduct]);



    // Calculate Total Cart Length.
    useEffect(() => {
        const cartData = localStorage.getItem("cart");
        const data = JSON.parse(cartData);
        let cartTotal = 0;
        for (const key in data) {
            const totalCart = data[key];
            cartTotal = cartTotal + totalCart;
            setCartLength(cartTotal);
        }
        if (cartTotal === 0) {
            setCartLength(0)
        }
    }, [cartLength, cartProduct]);



    // Calculate Total Cart Price.
    useEffect(() => {
        let productQuantity = 0;
        let productPrice = 0;
        let cartTotal = 0;
        let subTotal = 0;
        for (const product of cartProduct) {
            if (product) {
                productQuantity = product?.quantity;
                productPrice = product?.price;
                cartTotal = productQuantity * productPrice;
                subTotal = subTotal + cartTotal;
            }
        }
        setSubTotal(subTotal);
    }, [cartProduct]);


    return {
        addedProduct,
        addedNewQuantity,
        removeProduct,
        removeItem,
        products,
        cartProduct,
        cartLength,
        subTotal
    }
};

export default useCart;