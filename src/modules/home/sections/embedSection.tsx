"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { CopyButton } from "../components/copyButton";
import { Button } from "@/components/ui/button";
import { StepForward } from "lucide-react";

const EmbedIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 4L4 12L10 20M14 4L20 12L14 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const PythonIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="#3775A9" />
        <path d="M12 7.29V16.71C14.96 16.71 17.71 14.96 17.71 12C17.71 9.04 14.96 7.29 12 7.29Z" fill="#FFD43B" />
        <path d="M6.29 12C6.29 14.96 9.04 16.71 12 16.71V7.29C9.04 7.29 6.29 9.04 6.29 12Z" fill="#3775A9" />
    </svg>
);

const JavaScriptIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="2" fill="#F7DF1E" />
        <path d="M6 18.5L8 17.5C8.5 16 9 15 10.5 15C12 15 12.5 16 12.5 16.75C12.5 18.5 10.5 19 9 17.5M16.5 18.5L14.5 17.5C14 16 13.5 15 12 15" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

const CurlIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#0078A0" />
        <path d="M7 10C7 8.34 8.34 7 10 7C11.66 7 13 8.34 13 10M17 10C17 11.66 15.66 13 14 13C12.34 13 11 11.66 11 10M7 16C7 17.66 8.34 19 10 19C11.66 19 13 17.66 13 16M17 16C17 14.34 15.66 13 14 13C12.34 13 11 14.34 11 16" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

const ShareIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="6" cy="12" r="2.5" fill="#FF4081" stroke="#FF4081" />
        <circle cx="18" cy="6" r="2.5" fill="#FF4081" stroke="#FF4081" />
        <circle cx="18" cy="18" r="2.5" fill="#FF4081" stroke="#FF4081" />
        <path d="M8.4 13.2L15.6 16.8M8.4 10.8L15.6 7.2" stroke="#FF4081" strokeWidth="1.5" />
    </svg>
);

const EmbedSection = ({ handleContinue, embedUrl }: any) => {
    const [currentTab, setCurrentTab] = useState("embed");
    const [htmlTab, setHtmlTab] = useState("popup-html");
    const [authorization, setAuthorization] = useState("no-auth");
    const [showConfig, setShowConfig] = useState(false);

    const embedCode =
        `
    <script type="module">
        import Chatbot from "https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js"
        Chatbot.init({
            chatflowid: "d0e4af4d-226e-4ae6-a429-fb9583d373d0",
            apiHost: "https://flowise-sg.imutably.com",
        })
    </script>
    `;

    return (
        <main className="flex-grow flex flex-col items-center justify-center gap-4">
            <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
                <div className="text-2xl font-bold flex justify-between items-center">
                    <h1>Tiếp tục nhúng Chatbot vào website của bạn</h1>
                    <Button onClick={handleContinue} className='flex justify-between items-center gap-10'>
                        Tiếp tục <StepForward size={18} />
                    </Button>
                </div>
                <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
                    <TabsList className="grid grid-cols-5 w-full">
                        <TabsTrigger value="embed" className="flex items-center gap-2">
                            <EmbedIcon /> <span className="text-blue-500 font-medium">Embed</span>
                        </TabsTrigger>
                        <TabsTrigger value="python" className="flex items-center gap-2">
                            <PythonIcon /> <span className="text-gray-500 font-medium">Python</span>
                        </TabsTrigger>
                        <TabsTrigger value="javascript" className="flex items-center gap-2">
                            <JavaScriptIcon /> <span className="text-gray-500 font-medium">JavaScript</span>
                        </TabsTrigger>
                        <TabsTrigger value="curl" className="flex items-center gap-2">
                            <CurlIcon /> <span className="text-gray-500 font-medium">CURL</span>
                        </TabsTrigger>
                        <TabsTrigger value="share" className="flex items-center gap-2">
                            <ShareIcon /> <span className="text-gray-500 font-medium">Share Chatbot</span>
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="embed" className="space-y-4">
                        <Tabs value={htmlTab} onValueChange={setHtmlTab} className="w-full">
                            <TabsList className="grid grid-cols-4 w-full">
                                <TabsTrigger value="popup-html" className="text-blue-500 font-medium">Popup Html</TabsTrigger>
                                <TabsTrigger value="fullpage-html" className="text-gray-500 font-medium">Fullpage Html</TabsTrigger>
                                <TabsTrigger value="popup-react" className="text-gray-500 font-medium">Popup React</TabsTrigger>
                                <TabsTrigger value="fullpage-react" className="text-gray-500 font-medium">Fullpage React</TabsTrigger>
                            </TabsList>
                        </Tabs>
                        <div className="text-gray-600 py-4">
                            <p>Paste this anywhere in the &lt;body&gt; tag of your html file.</p>
                            <p className="mt-2">
                                You can also specify a <a href="#" className="text-blue-600">version</a>: {embedUrl}
                            </p>
                        </div>
                        <div className="relative bg-gray-900 text-gray-300 rounded-md p-4 font-mono text-sm">
                            <pre>{embedCode}</pre>
                            <div className="absolute top-2 right-2">
                                <CopyButton text={embedCode} />
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="show-config"
                                    checked={showConfig}
                                    onCheckedChange={(checked: any) => setShowConfig(checked as boolean)}
                                />
                                <label htmlFor="show-config" className="text-sm font-medium">
                                    Show Embed Chat Config
                                </label>
                            </div>
                            <div className="w-48">
                                <Select value={authorization} onValueChange={setAuthorization}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="No Authorization" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="no-auth">No Authorization</SelectItem>
                                        <SelectItem value="api-key">API Key</SelectItem>
                                        <SelectItem value="jwt">JWT</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="python">Python content here</TabsContent>
                    <TabsContent value="javascript">JavaScript content here</TabsContent>
                    <TabsContent value="curl">CURL content here</TabsContent>
                    <TabsContent value="share">Share Chatbot content here</TabsContent>
                </Tabs>
            </div>
        </main>
    );
};

export default EmbedSection;