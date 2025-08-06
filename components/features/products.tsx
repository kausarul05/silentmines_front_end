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
            description: item.description,
            subcategory: item.type,
            name: item.name,
            prices: item.priceOptions.length > 0
                ? item.priceOptions.map((option: any) => ({
                    weight: option.unit,
                    amount: option.price.toString()
                }))
                : [],
            photoUrls: item.photoUrls.map((url: string) => url),
            videoUrls: item.videoUrls.map((url: string) => url),
        }));

        return formattedProducts;
    } catch (error) {
        console.error("Failed to fetch products:", error);
        throw error;
    }
};

export const addProduct = async (product: any) => {
    try {
        const response = await fetch("http://localhost:5000/api/products", {
            method: "POST",
            // headers: {
            //     "Content-Type": "application/json",
            // },
            body: product,
        });

        if (!response.ok) {
            throw new Error("Failed to create product");
        }

        const resData = await response.json();
        return resData;
    } catch (error) {
        console.error("Error creating product:", error);
        throw error;
    }
}

export const updateProduct = async (id: string, product: FormData) => {
    try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`, {
            method: "PUT",
            body: product,  // FormData
        });

        if (!response.ok) {
            throw new Error("Failed to update product");
        }

        const resData = await response.json();
        return resData;
    } catch (error) {
        console.error("Error updating product:", error);
        throw error;
    }
};

export const deleteProduct = async (id: string) => {
    try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Failed to delete product");
        }

        const resData = await response.json();
        return resData;
    } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
    }
}