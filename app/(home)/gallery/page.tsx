"use client";

import React, { useEffect, useState } from 'react';
import { Product } from '../_components/DealOfTheWeek';
import DynamicProductShowCase from '@/components/shared/DynamicProductShowCase';
import { getAllProducts } from '@/components/features/products';

const Page = () => {
    const [products, setProducts] = useState<Product[]>([]);

    // Fetch products on component mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsData = await getAllProducts();
                setProducts(productsData);
            } catch (error) {
                console.error("Error loading products:", error);
            }
        };

        fetchProducts();
    }, []);

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
