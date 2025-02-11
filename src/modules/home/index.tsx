'use client'

import Footer from '@/layout/footer';
import Header from '@/layout/header';
import { CalendarCheck2, Camera, Figma, Globe, GraduationCap, Hammer, HeartPulse, MoonStar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowDownToLine, Baseline, Eye, EyeOff, KeyRound, QrCode, Trash2 } from 'lucide-react';
import { useRef, useState } from 'react';
import CryptoJS from 'crypto-js';
import { QRCodeCanvas } from 'qrcode.react';
import { saveAs } from 'file-saver';
import { useToast } from "@/hooks/use-toast"

export default function HomePage() {
    return (
        <div className="min-h-screen flex flex-col relative">
            <div className="hidden md:flex lg:flex absolute bottom-24 right-6 bg-gray-100 p-2 rounded-lg cursor-pointer hover:bg-gray-200 hover:text-blue-700">
                <MoonStar />
            </div>
            <Header />
            <main className="flex-grow flex flex-col items-center justify-center gap-4">
                <h1>Cho chúng tôi biết đường dẫn website của bạn</h1>
                <div className='w-5/6 lg:w-96 md:w-96 flex flex-col items-center justify-center gap-4'>
                    <div className="w-full relative flex items-center">
                        <Globe className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
                        <Input
                            type='text'
                            placeholder="https://example.com"
                            className='pl-8'
                        />
                    </div>
                    <div className='h-[20px]'></div>
                    <h1>Lĩnh vực bạn đang hướng đến là</h1>
                    <div className='flex justify-start items-center gap-4 mt-2'>
                        <Button className='bg-gray-200 text-gray-700 hover:bg-gray-300 gap-2'><Camera /> Chụp ảnh</Button>
                        <Button className='bg-blue-800 text-white hover:bg-blue-900 gap-2'><Figma /> Thiết kế</Button>
                        <Button className='bg-gray-200 text-gray-700 hover:bg-gray-300 gap-2'><CalendarCheck2 /> Sự kiện</Button>
                        <Button className='bg-gray-200 text-gray-700 hover:bg-gray-300 gap-2'><Hammer /> Xây dựng</Button>
                        <Button className='bg-blue-800 text-white hover:bg-blue-900 gap-2'><HeartPulse /> Y tế</Button>
                        <Button className='bg-gray-200 text-gray-700 hover:bg-gray-300 gap-2'><GraduationCap /> Giáo dục</Button>
                    </div>
                </div>
                <div className='h-[20px]'></div>
                <Button className='w-5/6 lg:w-96 md:w-96'>Bắt đầu tạo chatbot</Button>
            </main>
            <Footer />
        </div>
    );
}
