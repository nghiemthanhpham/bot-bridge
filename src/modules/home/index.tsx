'use client'

import Footer from '@/layout/footer';
import Header from '@/layout/header';
import { MoonStar } from 'lucide-react';
import { useEffect, useState } from 'react';
import EmbedSection from './sections/embedSection';
import TestCaseSection from './sections/testcaseSection';
import CreateChatbotSection from './sections/createChatbotSection';
import Image from 'next/image';
import ResultSection from './sections/resultSection';

export default function HomePage() {

    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [data, setData] = useState(null as any);
    const [embedUrl, setEmbedUrl] = useState("" as any);

    const handleChangeStep = (step: any) => {
        setStep(step);
    }

    const handleCreateChatbot = async (url: string, interest: any) => {
        setIsLoading(true);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const raw = JSON.stringify({
            "user_website": url,
            "interest": interest
        });
        const requestOptions: any = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };
        await fetch("https://n8n.khiemfle.com/webhook/51c30a5e-baed-4a39-8ea2-212c36479d24", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setEmbedUrl(result[0]?.result || "");
                handleChangeStep(2);
                setIsLoading(false);
            })
            .catch((error) => console.error(error));
    }

    const handleContinue = () => {
        setStep(3);
    }

    const handleSubmit = async (step: any) => {
        setIsLoading(true);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const raw = JSON.stringify({
            "test_cases": [
                {
                    "question": "n8n.khiemfle.com",
                    "answer": "n8n.khiemfle.com",
                    "unique": "abcd"
                },
            ]
        });
        const requestOptions: any = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };
        await fetch("https://n8n.khiemfle.com/webhook/ce5bfb91-e3cc-4441-8d49-ef53eae823b1", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                setData(result);
                setIsLoading(false);
                setStep(4);
            })
            .catch((error) => console.error(error));
    }

    const renderStep = (step: any) => {
        switch (step) {
            case 1:
                return <CreateChatbotSection handleCreateChatbot={handleCreateChatbot} />;
            case 2:
                return <EmbedSection handleContinue={handleContinue} embedUrl={embedUrl} />;
            case 3:
                return <TestCaseSection handleSubmit={handleSubmit} />;
            case 4:
                return <ResultSection data={data} />;
            default:
                return <CreateChatbotSection handleCreateChatbot={handleCreateChatbot} />;
        }
    }

    useEffect(() => { }, [data]);

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
