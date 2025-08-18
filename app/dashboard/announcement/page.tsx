"use client";

import React, { useState, useRef, useMemo } from 'react';
import Header from '@/components/dashboard/header/header';
import dynamic from 'next/dynamic';
import { updateAnnouncements } from '@/components/features/products';
import { toast } from 'sonner';
// Dynamically import JoditEditor with SSR disabled
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Announcement = () => {
    const editor = useRef(null);
    const [content, setContent] = useState('');

    const config = useMemo(
        () => ({
            readonly: false,
            placeholder: "Write your announcement here...",
            toolbarAdaptive: false,
            theme: "dark",
            toolbarSticky: false,
            style: {
                backgroundColor: "#0f1b0f",
                color: "#fff",
                height: "370px",
            },
        }), 
        []
    );

    const handlePublish = async () => {
        try {
            const response = await updateAnnouncements(content)
            if(response?.data?._id){
                toast.success("Announcement published successfully!");
            }
        } catch (error) {
            console.error("Error publishing announcement:", error);
            toast.error("Failed to publish announcement. Please try again.");
        }
    };

    return (
        <div className="lg:p-6 pt-8">
            <Header title='Announcement' subTitle='Create and manage announcements' />

            <div className="bg-white/5 lg:h-[500px] border border-white/10 backdrop-blur-md rounded-lg p-4 shadow-md">
                <JoditEditor
                    ref={editor}
                    value={content}
                    config={config}
                    onChange={(newContent) => setContent(newContent)}
                />
            </div>

            <div className="flex justify-end mt-4">
                <button onClick={handlePublish} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow transition">
                    Publish
                </button>
            </div>
        </div>
    )
}

export default Announcement