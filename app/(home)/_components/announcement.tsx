"use client"

import { getAnnouncements } from "@/components/features/products";
import { useEffect, useState } from "react";

export const AnnouncementSection = () => {
  const [announcement, setAnnouncement] = useState<string>("");

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const announcementData = await getAnnouncements();
        setAnnouncement(announcementData.announcement); 
      } catch (error) {
        console.error("Error loading announcement:", error);
      }
    };

    fetchAnnouncement();
  }, []); 

  return (
    <section className="bg-black text-white py-16 px-4 w-full border-b border-gray-700">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h2 className="text-2xl font-extrabold">
          Today&apos;s Announcement
        </h2>

        {announcement ? (
          <div
            className="prose prose-invert mx-auto mt-6"
            dangerouslySetInnerHTML={{ __html: announcement }}
          />
        ) : (
          <p className="text-gray-400 mt-6">No announcement available.</p>
        )}

        <div className="pt-6 space-y-1 text-xs text-center text-gray-300">
          <p>🧾 NEW TELEGRAM ANNOUNCEMENT PAGE 🧾</p>
          <a
            href="https://t.me/+kEPmUjLS_ck2NzJh"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            https://t.me/+kEPmUjLS_ck2NzJh
          </a>
        </div>
      </div>
    </section>
  );
};
