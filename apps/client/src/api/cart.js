import api from "./api";

export const getCart = async (userId) => {
    return await api.get("/cart", { id: userId });
};
