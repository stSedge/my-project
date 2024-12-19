import React, { useState } from "react";
import axios from "../axiosConfig.ts";
import { userJwtSelector } from "../reducer/UserStore/reducer.ts";
import { useSelector } from "react-redux";

const ProductForm = () => {
    const jwt = useSelector(userJwtSelector);
    const [productName, setproductName] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        const productData = {
            name: productName,
        };
        try {
            const response = await axios.post("/api/create_additional_product", productData, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("Товар успешно добавлен:", response.data);
        } catch (err) {
            console.error("Ошибка при добавлении товара:", err);
            setError("Произошла ошибка при добавлении товара");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <h2>Добавить новый цветок</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="productName">Название:</label>
                    <input
                        type="text"
                        id="productName"
                        value={productName}
                        onChange={(e) => setproductName(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Загружается..." : "Добавить товар"}
                </button>
                {error && <div style={{ color: "red" }}>{error}</div>}
            </form>
        </div>
    );
};

export default ProductForm;
