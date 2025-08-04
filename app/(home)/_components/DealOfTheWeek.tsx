
import ProductCard from '@/components/shared/productCard';
import SectionHeader from '@/components/shared/sectionHeader';
import { Button } from '@/components/ui/button';
import Link from 'next/link';


// Types
export interface Price {
    weight: string;
    amount: string;
}

export interface Product {
    id: number;
    image: string;
    discount: number;
    category: string;
    subcategory: string;
    name: string;
    prices: Price[];
}

interface DealSectionProps {
    title?: string;
    subtitle?: string;
    products?: Product[];
    onShopMore?: () => void;
    className?: string;
}


// Reusable Section Header Component


// Main Deal Section Component
export const DealSection: React.FC<DealSectionProps> = ({
    title,
    subtitle,
    products = [],
    onShopMore,
    className = ""
}) => {

    // Default products data
    const defaultProducts: Product[] = [
        {
            id: 1,
            image: "/Product_Demo_Image.png",
            discount: 75,
            category: "LICENSED INDOORS",
            subcategory: "DAILY SPECIAL",
            name: "LEMON BUBBLEGUM 🍋⚡",
            prices: [
                { weight: "1 LB", amount: "750" },
                { weight: "2 LB", amount: "750" },
                { weight: "3 LB", amount: "750" }
            ]
        },
        {
            id: 2,
            image: "/Product_Demo_Image.png",
            discount: 75,
            category: "LICENSED INDOORS",
            subcategory: "DAILY SPECIAL",
            name: "CHERRY 7UP 🍒🥤",
            prices: [
                { weight: "1 LB", amount: "750" },
                { weight: "2 LB", amount: "750" },
                { weight: "3 LB", amount: "750" }
            ]
        },
        {
            id: 3,
            image: "/Product_Demo_Image.png",
            discount: 75,
            category: "LICENSED INDOORS",
            subcategory: "DAILY SPECIAL",
            name: "CALIFORNIA DREAM 🌟🌊",
            prices: [
                { weight: "1 LB", amount: "750" },
                { weight: "2 LB", amount: "750" },
                { weight: "3 LB", amount: "750" }
            ]
        },
        {
            id: 4,
            image: "/Product_Demo_Image.png",
            discount: 75,
            category: "LICENSED INDOORS",
            subcategory: "DAILY SPECIAL",
            name: "CAKE POPZ 🧁🎉",
            prices: [
                { weight: "1 LB", amount: "750" },
                { weight: "2 LB", amount: "750" },
                { weight: "3 LB", amount: "750" }
            ]
        }
    ];

    const displayProducts = products.length > 0 ? products : defaultProducts;


    return (
        <section className={`bg-black text-white py-20 px-4 w-full ${className}`}>
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <SectionHeader
                    title={title}
                    subtitle={subtitle}
                />

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {displayProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            image={product.image}
                            discount={product.discount}
                            category={product.category}
                            subcategory={product.subcategory}
                            name={product.name}
                            prices={product.prices}
                        />
                    ))}
                </div>

                {/* Shop More Button */}
                <div className="text-center">
                    <Link href={"/gallery"}>
                        <Button
                            size="lg"
                            className="bg-green-500/10 hover:bg-green-500/20 border border-white/20 text-white hover:text-white hover:scale-105 transition-all duration-300 group"
                        >
                            <span>Shop More Deals</span>
                            <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};