'use client'

import { ROUTES } from '@/utils/route';
import { AlignJustify, HeartHandshake, MessageCircleQuestion, MessageSquareMore, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

export default function Header() {

    const [isDrawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setDrawerOpen(!isDrawerOpen);
    };

    return (
        <header className="w-full fixed top-0 bg-white border-b shadow-md z-10 p-4">
            <nav className="flex justify-between max-w-7xl mx-auto">
                <a href={ROUTES.HOME} className="text-lg font-semibold">Useful Chatbot For You</a>
                <AlignJustify className='flex md:hidden lg:hidden cursor-pointer' onClick={toggleDrawer} />
                <div className="hidden md:flex lg:flex space-x-6">
                    <a href={ROUTES.HOME} className="hover:underline">Privacy Policy</a>
                    <a href={ROUTES.HOME} className="hover:underline">Terms and Conditions</a>
                    <a href={ROUTES.HOME} className="hover:underline">FAQs</a>
                    <a href={ROUTES.HOME} className="hover:underline">Feedback</a>
                </div>
                {isDrawerOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-20" onClick={toggleDrawer}>
                        <div className="fixed top-0 right-0 w-64 bg-white h-full shadow-lg z-30">
                            <nav className="flex flex-col space-y-4 p-4">
                                <a href={ROUTES.HOME} className="text-xl font-bold">TABS</a>
                                <a href={ROUTES.HOME} className="border-b pb-4 hover:underline flex justify-start items-center gap-2">
                                    <ShieldCheck size={18} />
                                    Privacy Policy
                                </a>
                                <a href={ROUTES.HOME} className="border-b pb-4 hover:underline flex justify-start items-center gap-2">
                                    <HeartHandshake size={18} />
                                    Terms and Conditions
                                </a>
                                <a href={ROUTES.HOME} className="border-b pb-4 hover:underline flex justify-start items-center gap-2">
                                    <MessageCircleQuestion size={18} />
                                    FAQs
                                </a>
                                <a href={ROUTES.HOME} className="border-b pb-4 hover:underline flex justify-start items-center gap-2">
                                    <MessageSquareMore size={18} />
                                    Feedback
                                </a>
                            </nav>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
