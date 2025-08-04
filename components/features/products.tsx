import { Product } from "@/app/(home)/_components/DealOfTheWeek";

export const getAllProducts = async () => {
    try {
        const response = await fetch("http://localhost:5000/api/products", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const resData = await response.json();

        const formattedProducts: Product[] = resData.data.map((item: any) => ({
            id: item._id,
            image: item.photoUrls[0],
            discount: Math.floor(Math.random() * 80) + 10, // after send backend discount data then show like item.discount
            category: item.category,
            subcategory: item.type || 'Specials',
            name: item.name,
            prices: item.priceOptions.length > 0
                ? item.priceOptions.map((option: any) => ({
                    weight: option.unit,
                    amount: option.price.toString()
                }))
                : [
                    { weight: "1 LB", amount: "100" },
                    { weight: "2 LB", amount: "180" }
                ]
        }));

        return formattedProducts;
    } catch (error) {
        console.error("Failed to fetch products:", error);
        throw error;
    }
};