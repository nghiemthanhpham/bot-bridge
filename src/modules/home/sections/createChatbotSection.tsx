"use client";

import { CalendarCheck2, Camera, Figma, Globe, GraduationCap, Hammer, HeartPulse } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface Field {
    id: string;
    name: string;
    icon: React.ReactNode;
}

const CreateChatbotSection = ({ handleCreateChatbot }: any) => {
    const fields: Field[] = [
        { id: 'photography', name: 'Chụp ảnh', icon: <Camera className="h-4 w-4" /> },
        { id: 'design', name: 'Thiết kế', icon: <Figma className="h-4 w-4" /> },
        { id: 'events', name: 'Sự kiện', icon: <CalendarCheck2 className="h-4 w-4" /> },
        { id: 'construction', name: 'Xây dựng', icon: <Hammer className="h-4 w-4" /> },
        { id: 'health', name: 'Y tế', icon: <HeartPulse className="h-4 w-4" /> },
        { id: 'education', name: 'Giáo dục', icon: <GraduationCap className="h-4 w-4" /> },
    ];

    const [selectedFields, setSelectedFields] = useState<string[]>([]);
    const [url, setUrl] = useState<any>("" as any);

    const handleSelectField = (fieldId: string) => {
        if (selectedFields.includes(fieldId)) {
            setSelectedFields(selectedFields.filter(id => id !== fieldId));
        } else {
            setSelectedFields([...selectedFields, fieldId]);
        }
    };

    return (
        <main className="flex-grow flex flex-col items-center justify-center gap-4">
            <h1 className="text-xl font-medium">Cho chúng tôi biết đường dẫn website của bạn</h1>
            <div className='w-5/6 lg:w-96 md:w-96 flex flex-col items-center justify-center gap-4'>
                <div className="w-full relative flex items-center">
                    <Globe className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
                    <Input
                        type='text'
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://example.com"
                        className='pl-8'
                    />
                </div>
                <div className='h-[20px]'></div>
                <h1 className="text-xl font-medium">Lĩnh vực bạn đang hướng đến là</h1>
                <div className='grid grid-cols-2 sm:grid-cols-3 gap-2 w-full mt-2'>
                    {fields.map((field) => (
                        <Button
                            key={field.id}
                            onClick={() => handleSelectField(field.id)}
                            className={`flex items-center justify-center gap-2 transition-colors ${selectedFields.includes(field.id)
                                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {field.icon} {field.name}
                        </Button>
                    ))}
                </div>
            </div>
            <div className='h-[20px]'></div>
            <Button
                onClick={() => handleCreateChatbot(url, selectedFields)}
                className='w-5/6 lg:w-80 md:w-80'
            >
                Bắt đầu tạo chatbot
            </Button>
        </main>
    );
};

export default CreateChatbotSection;