import React, { useState } from "react";
import axios from "../axiosConfig";
import { userJwtSelector } from "../reducer/UserStore/reducer";
import { useSelector } from "react-redux";

const FlowerForm = () => {
    const jwt = useSelector(userJwtSelector);
    const [flowerName, setFlowerName] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        const flowerData = {
            name: flowerName,
        };
        try {
            const response = await axios.post("/api/create_flower", flowerData, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
        } catch (err) {
            console.error("Ошибка при добавлении цветка:", err);
            setError("Произошла ошибка при добавлении цветка");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <h2>Добавить новый цветок</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="flowerName">Название:</label>
                    <input
                        type="text"
                        id="flowerName"
                        value={flowerName}
                        onChange={(e) => setFlowerName(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Загружается..." : "Добавить цветок"}
                </button>
                {error && <div style={{ color: "red" }}>{error}</div>}
            </form>
        </div>
    );
};

export default FlowerForm;
