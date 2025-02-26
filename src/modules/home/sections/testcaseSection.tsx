"use client";

import { Button } from "@/components/ui/button";
import { CircleGauge } from "lucide-react";
import KeyValueSection from "../components/keyValue";

const TestCaseSection = ({ handleSubmit }: any) => {
    return (
        <main className="flex-grow flex flex-col items-center justify-center gap-4">
            <div className="w-full h-[600px] overflow-auto max-w-4xl mx-auto p-6 space-y-6">
                <div className="text-2xl font-bold flex justify-between items-center">
                    <h1>Tạo các cặp Test Case cho ChatBot của bạn</h1>
                    <Button onClick={handleSubmit} className='flex justify-between items-center gap-10'>
                        Kiểm tra <CircleGauge size={18} />
                    </Button>
                </div>
                <div className="text-gray-600 py-4">
                    <p>Điền các cặp Question và Answer để test khả năng trả lời của Chatbot.</p>
                    <p className="mt-2">
                        Sau đó nhấn <a href="#" className="text-blue-600">Kiểm tra</a> để xem kết quả.
                    </p>
                </div>
                <KeyValueSection />
            </div>
        </main>
    );
};

export default TestCaseSection;