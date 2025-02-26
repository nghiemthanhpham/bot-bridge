'use client'

import Footer from '@/layout/footer';
import Header from '@/layout/header';
import { MoonStar } from 'lucide-react';
import { useState } from 'react';
import EmbedSection from './sections/embedSection';
import TestCaseSection from './sections/testcaseSection';
import CreateChatbotSection from './sections/createChatbotSection';
import Image from 'next/image';

export default function HomePage() {

    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(1);

    const handleChangeStep = (step: any) => {
        setStep(step);
    }

    const handleCreateChatbot = () => {
        setIsLoading(true);
        setTimeout(() => {
            handleChangeStep(2);
            setIsLoading(false);
        }, 3000);
    }

    const handleContinue = () => {
        setStep(3);
    }

    const handleSubmit = (step: any) => {

    }

    const renderStep = (step: any) => {
        switch (step) {
            case 1:
                return <CreateChatbotSection handleCreateChatbot={handleCreateChatbot} />;
            case 2:
                return <EmbedSection handleContinue={handleContinue} />;
            case 3:
                return <TestCaseSection handleSubmit={handleSubmit} />;
            default:
                return <CreateChatbotSection handleCreateChatbot={handleCreateChatbot} />;
        }
    }

    return (
        <div className="min-h-screen flex flex-col relative">
            <div className="hidden md:flex lg:flex absolute bottom-24 right-6 bg-gray-100 p-2 rounded-lg cursor-pointer hover:bg-gray-200 hover:text-blue-700">
                <MoonStar />
            </div>
            <Header />
            {
                isLoading
                    ?
                    <main className="flex-grow flex flex-col items-center justify-center">
                        <Image
                            src="/loading.gif"
                            alt='loading'
                            width={200}
                            height={200}
                            className="mx-auto"
                        />
                    </main>
                    :
                    renderStep(step)
            }
            <Footer />
        </div>
    );
}
