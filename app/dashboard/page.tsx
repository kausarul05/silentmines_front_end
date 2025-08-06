'use client';

import { useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Trash2, X } from 'lucide-react';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from '@/components/ui/select';
import Header from '@/components/dashboard/header/header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AllProducts from '@/components/dashboard/allProducts/allProducts';
import { addProduct } from '@/components/features/products';
import { toast } from 'sonner';

interface AddProduct {
    name: string;
    description: string;
    category: string;
    type: string;
    priceOptions: { price: string; unit: string }[];
    photoUrls: File[];
    videoUrls: File[];
}

const AddProductForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [type, setType] = useState('');
    const [priceInput, setPriceInput] = useState('');
    const [unitInput, setUnitInput] = useState('');
    const [priceOptions, setPriceOptions] = useState<{ price: string; unit: string }[]>([]);
    const [photoUrls, setPhotoUrls] = useState<File[]>([]);
    const [videoUrls, setVideoUrls] = useState<File[]>([]);
    const photoInputRef = useRef<HTMLInputElement>(null);
    const videoInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name.trim());
        formData.append("description", description.trim());
        formData.append("category", category.trim());
        formData.append("type", type.trim());
        formData.append("priceOptions", JSON.stringify(priceOptions.map(item => ({
            unit: item.unit,
            price: Number(item.price),
        }))));

        // Append multiple photos
        photoUrls.forEach((file) => {
            formData.append("photos", file);
        });

        // Append multiple videos
        videoUrls.forEach((file) => {
            formData.append("videos", file);
        });

        try {
            const res = await addProduct(formData);
            if (res._id) {
                setName('');
                setDescription('');
                setCategory('');
                setType('');
                setPriceOptions([]);
                setPhotoUrls([]);
                setVideoUrls([]);
                // Reset file inputs
                if (photoInputRef.current) photoInputRef.current.value = '';
                if (videoInputRef.current) videoInputRef.current.value = '';
                // success toast
                toast.success("Product added successfully!");
            } else {
                console.error("Error:", res.error);
                toast.error("Failed to add product. Please try again.");
            }
        } catch (err) {
            console.error("❌ Submit error:", err);
        }
    };


    const handleAddPriceUnit = () => {
        if (!priceInput || !unitInput) return;
        setPriceOptions([...priceOptions, { price: priceInput, unit: unitInput }]);
        setPriceInput('');
        setUnitInput('');
    };

    const handleDeletePriceUnit = (index: number) => {
        setPriceOptions(priceOptions.filter((_, i) => i !== index));
    };

    const handleFileChange = (
        files: FileList | null,
        type: 'photo' | 'video'
    ) => {
        if (!files) return;
        const fileArray = Array.from(files);
        type === 'photo'
            ? setPhotoUrls([...photoUrls, ...fileArray])
            : setVideoUrls([...videoUrls, ...fileArray]);
    };

    return (
        <div>
            <Header title="Add New Product" subTitle="Fill in the product details below" />

            <Tabs defaultValue="add">
                <TabsList className="bg-[#0f1b0f]/60 border-b border-white/10 mb-8">
                    <TabsTrigger
                        className="text-white cursor-pointer data-[state=active]:bg-green-600 data-[state=active]:text-white"
                        value="add"
                    >
                        Add Product
                    </TabsTrigger>
                    <TabsTrigger
                        className="text-white cursor-pointer data-[state=active]:bg-green-600 data-[state=active]:text-white"
                        value="allProducts"
                    >
                        All Products
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="add">
                    <form onSubmit={handleSubmit} className="p-6 bg-[#0f1b0f]/60 rounded-xl shadow-lg border border-white/10 text-white space-y-6">

                        <div className="space-y-1">
                            <Label>Name</Label>
                            <Input
                                placeholder="Product Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="bg-[#1a2a1a] mt-3 text-white"
                            />
                        </div>

                        <div className="space-y-1">
                            <Label>Description</Label>
                            <Textarea
                                placeholder="Write a short description..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="bg-[#1a2a1a] mt-3 text-white"
                            />
                        </div>

                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-4">
                            <div className="flex-1">
                                <Label>Category</Label>
                                <Select value={category} onValueChange={setCategory}>
                                    <SelectTrigger className="bg-[#1a2a1a] mt-3 w-full text-white">
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#1a2a1a] text-white">
                                        <SelectItem value="flower">Flower</SelectItem>
                                        <SelectItem value="tier-1-(EXOTIC) ">Tier 1 (EXOTIC)</SelectItem>
                                        <SelectItem value="tier-2-(TOP-SHELF)">Tier 2 (TOP SHELF)</SelectItem>
                                        <SelectItem value="tier-3-(CHEAP)">Tier 3 (CHEAP)</SelectItem>
                                        <SelectItem value="snowcaps">Snowcaps</SelectItem>
                                        <SelectItem value="moonrocks">Moonrocks</SelectItem>
                                        <SelectItem value="pre-rolls">Pre-Rolls</SelectItem>
                                        <SelectItem value="extracts">Extracts</SelectItem>
                                        <SelectItem value="edibles">Edibles</SelectItem>
                                        <SelectItem value="vapes">Vapes</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex-1">
                                <Label>Type (optional)</Label>
                                <Select value={type} onValueChange={setType}>
                                    <SelectTrigger className="bg-[#1a2a1a] mt-3 w-full text-white">
                                        <SelectValue placeholder="e.g. jar, packwood" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#1a2a1a] text-white">
                                        <SelectItem value="jar">Jar</SelectItem>
                                        <SelectItem value="packwood">Packwood</SelectItem>
                                        <SelectItem value="sluggers">Sluggers</SelectItem>
                                        <SelectItem value="shatter">Shatter</SelectItem>
                                        <SelectItem value="sugar">Sugar</SelectItem>
                                        <SelectItem value="live-resin">Live Resin</SelectItem>
                                        <SelectItem value="hash-rosin">Hash Rosin</SelectItem>
                                        <SelectItem value="badder">Badder</SelectItem>
                                        <SelectItem value="cartridges">Cartridges</SelectItem>
                                        <SelectItem value="disposables">Disposables</SelectItem>
                                        <SelectItem value="live-resin-pens">Live Resin Pens</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                            <div className="space-y-1">
                                <Label>Price</Label>
                                <Input
                                    placeholder="Price"
                                    value={priceInput}
                                    onChange={(e) => setPriceInput(e.target.value)}
                                    className="bg-[#1a2a1a] mt-3 text-white"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label>Unit</Label>
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="e.g. 1LB"
                                        value={unitInput}
                                        onChange={(e) => setUnitInput(e.target.value)}
                                        className="bg-[#1a2a1a] mt-3 text-white"
                                    />
                                    <Button
                                        type='button'
                                        onClick={handleAddPriceUnit}
                                        className="bg-green-600 hover:bg-green-700 mt-3"
                                    >
                                        Add
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {priceOptions.length > 0 && (
                            <div className="space-y-3">
                                <Label className="text-sm text-white">Price Options</Label>
                                <div className="space-y-2">
                                    {priceOptions.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between bg-[#1a2a1a] border border-white/10 rounded-lg p-3 shadow-sm"
                                        >
                                            <div className="flex gap-4 text-sm text-white/90">
                                                <span><span className="font-medium text-white"></span> {item.unit}</span>
                                                <span><span className="font-medium text-white"></span> ${item.price}</span>
                                            </div>
                                            <Button
                                                type="button"
                                                size="icon"
                                                variant="ghost"
                                                onClick={() => handleDeletePriceUnit(index)}
                                                className="hover:bg-red-500/10"
                                            >
                                                <Trash2 className="h-4 w-4 text-red-500" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className='flex gap-3'>
                            <div className="flex-1">
                                <Label>Upload photoUrls</Label>
                                <Input
                                    ref={photoInputRef}
                                    className='bg-[#1a2a1a] mt-3'
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={(e) => handleFileChange(e.target.files, 'photo')}
                                />
                                <div className="flex flex-wrap gap-3">
                                    {photoUrls.map((file, idx) => (
                                        <div key={idx} className="relative w-20 h-20">
                                            <img
                                                src={URL.createObjectURL(file)}
                                                className="rounded object-cover w-full h-full"
                                            />
                                            <button
                                                onClick={() => setPhotoUrls(photoUrls.filter((_, i) => i !== idx))}
                                                className="absolute top-0 right-0 bg-black/60 hover:bg-red-600 rounded-full p-1"
                                            >
                                                <X className="w-4 h-4 text-white" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex-1">
                                <Label>Upload videoUrls</Label>
                                <Input
                                    ref={videoInputRef}
                                    className='bg-[#1a2a1a] mt-3'
                                    type="file"
                                    accept="video/*"
                                    multiple
                                    onChange={(e) => handleFileChange(e.target.files, 'video')}
                                />
                                <div className="flex flex-wrap gap-3">
                                    {videoUrls.map((file, idx) => (
                                        <div key={idx} className="relative w-24 h-20">
                                            <video
                                                src={URL.createObjectURL(file)}
                                                controls
                                                className="rounded w-full h-full object-cover"
                                            />
                                            <button
                                                onClick={() => setVideoUrls(videoUrls.filter((_, i) => i !== idx))}
                                                className="absolute top-0 right-0 bg-black/60 hover:bg-red-600 rounded-full p-1"
                                            >
                                                <X className="w-4 h-4 text-white" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <Button type='submit' className="w-full bg-green-600 hover:bg-green-700">
                            Submit
                        </Button>
                    </form>
                </TabsContent>
                <TabsContent value="allProducts">

                    <AllProducts />
                </TabsContent>
            </Tabs>


        </div>
    );
};

export default AddProductForm;