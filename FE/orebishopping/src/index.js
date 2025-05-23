import React from "react";
import ReactDOM from "react-dom/client";
import { PersistGate } from "redux-persist/integration/react";
import "slick-carousel/slick/slick.css";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import "./index.css";
import App from "./App";
import { CartProvider } from "./redux/CartContext";
import { AuthProvider } from "./redux/AuthContext";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <AuthProvider>
            <CartProvider>
                <PersistGate loading={null} persistor={persistor}>
                    <App />
                </PersistGate>
            </CartProvider>
        </AuthProvider>
    </Provider>
);
