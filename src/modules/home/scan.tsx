'use client'

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy, Eye, EyeOff, ImageUp, KeyRound, Sparkle, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import CryptoJS from 'crypto-js';
import { Html5Qrcode } from 'html5-qrcode';
import { useToast } from "@/hooks/use-toast"

export default function Scan({ tab, setTab }: { tab: any, setTab: any }) {

    const { toast } = useToast()

    const [showKeyTab, setShowKeyTab] = useState(false)
    const [qrUpload, setQrUpload] = useState(null as any);
    const [decryptedText, setDecryptedText] = useState('');
    const [key, setKey] = useState('');
    const [file, setFile] = useState(null as any);

    const handleUpload = async (e: any) => {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.onloadend = () => {
            setQrUpload(reader.result);
        }
        reader.readAsDataURL(file);
        setFile(file);
    }

    const generate = async () => {
        if (qrUpload === null || key === '') {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "Please fill all inputs.",
            })
        } else {
            const html5QrCode = new Html5Qrcode("reader");
            try {
                const result = await html5QrCode.scanFile(file, true);
                const bytes = CryptoJS.AES.decrypt(result, key);
                const decrypted = bytes.toString(CryptoJS.enc.Utf8);
                if (decrypted === '' || decrypted === null) {
                    toast({
                        variant: "destructive",
                        title: "Uh oh! Something went wrong.",
                        description: "Key is not correct",
                    })
                    setDecryptedText('');
                } else {
                    setDecryptedText(decrypted);
                    toast({
                        variant: "default",
                        title: "Successfully!",
                        description: "Descripting successfully",
                    })
                }
            } catch (err) {
                console.error(err);
            } finally {
                html5QrCode.clear();
            }
        }
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(decryptedText);
        toast({
            variant: "default",
            title: "Copied to clipboard!",
        })
    }

    const clear = () => {
        setQrUpload(null);
        setDecryptedText('');
        setKey('');
        setFile(null);
        setShowKeyTab(false);
    }

    return (
        <main className="flex-grow flex flex-col items-center justify-center gap-4">
            <div className="w-5/6 lg:w-96 md:w-96 text-center flex gap-4">
                <Button onClick={() => setTab(0)} variant={tab === 0 ? 'default' : 'secondary'} className='w-48'>CREATE</Button>
                <Button onClick={() => setTab(1)} variant={tab === 1 ? 'default' : 'secondary'} className='w-48'>SCAN</Button>
            </div>
            <div className='w-5/6 h-72 lg:w-96 lg:h-96 md:w-96 md:h-96 border p-10 rounded-md flex flex-col items-center justify-center relative'>
                <div id="reader" style={{ width: '100%', height: '0px' }} className='hidden'></div>
                {
                    qrUpload && (
                        <div className="absolute top-2 right-2 flex items-center justify-center gap-2">
                            <Trash2 className="cursor-pointer" onClick={clear} />
                        </div>
                    )
                }
                {
                    qrUpload
                        ?
                        <Image src={qrUpload} width={200} height={200} alt="img" />
                        :
                        <label className='flex flex-col items-center justify-center cursor-pointer'>
                            <ImageUp />
                            <p>Upload</p>
                            <input
                                type="file"
                                className="hidden"
                                onChange={handleUpload}
                                accept="image/png, image/jpeg, image/jpg, image/gif"
                            />

                        </label>
                }
            </div>
            <div className='w-5/6 lg:w-96 md:w-96 flex flex-col items-center justify-center gap-4'>
                <div className="w-full relative flex items-center">
                    <KeyRound className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
                    <Input
                        type={showKeyTab ? 'text' : 'password'}
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                        placeholder="Key"
                        className='pl-8'
                    />
                    {
                        showKeyTab
                            ?
                            <EyeOff onClick={() => setShowKeyTab(false)} className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 transform cursor-pointer" />
                            :
                            <Eye onClick={() => setShowKeyTab(true)} className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 transform cursor-pointer" />
                    }
                </div>
                <div className="w-full relative flex items-center">
                    <Sparkle className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
                    <Input
                        type="password"
                        value={decryptedText}
                        placeholder="---------"
                        className='pl-8'
                        readOnly
                    />
                    <Copy className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 transform cursor-pointer" onClick={handleCopy} />
                </div>
            </div>
            <Button className='w-5/6 lg:w-96 md:w-96' onClick={generate}>Generate</Button>
        </main>
    );
}
