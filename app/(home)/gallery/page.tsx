"use client";

import React, { useEffect, useState } from 'react';
import { Product } from '../_components/DealOfTheWeek';
import DynamicProductShowCase from '@/components/shared/DynamicProductShowCase';

const Page = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/products"); 
                const data = await response.json();

                const formattedProducts: Product[] = data.data.map((item: any, index: number) => ({
                    id: item._id,
                    image: item.photoUrls[0], // Taking first image
                    discount: Math.floor(Math.random() * 80) + 10, // Dummy discount
                    category: item.category,
                    subcategory: item.type || 'Specials', // fallback if 'type' not present
                    name: item.name,
                    prices: item.priceOptions.length > 0 
                        ? item.priceOptions.map((option: any) => ({
                            weight: option.unit,
                            amount: option.price.toString()
                        })) 
                        : [
                            { weight: "1 LB", amount: "100" }, // Fallback dummy price
                            { weight: "2 LB", amount: "180" }
                        ]
                }));

                setProducts(formattedProducts);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch products:", error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);
    
    // console.log("Products fetched:", products);

    return (
        <>
            <DynamicProductShowCase
                mockProducts={products}
                title="Full Gallery"
                description="Discover our complete collection of premium products. Browse through our carefully curated items."
            />
        </>
    );
};

export default Page;
