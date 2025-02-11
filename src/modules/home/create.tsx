'use client'

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowDownToLine, Baseline, Eye, EyeOff, KeyRound, QrCode, Trash2 } from 'lucide-react';
import { useRef, useState } from 'react';
import CryptoJS from 'crypto-js';
import { QRCodeCanvas } from 'qrcode.react';
import { saveAs } from 'file-saver';
import { useToast } from "@/hooks/use-toast"

export default function Create({ tab, setTab }: { tab: any, setTab: any }) {

    const qrRef = useRef() as any;
    const { toast } = useToast()

    const [showKeyTab, setShowKeyTab] = useState(false)
    const [showValue, setShowValue] = useState(false)
    const [encryptedText, setEncryptedText] = useState('');
    const [value, setValue] = useState('');
    const [key, setKey] = useState('');

    const generateQR = () => {
        if (value === '' || key === '') {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "Please fill all inputs.",
            })
        } else {
            const encrypted = CryptoJS.AES.encrypt(value, key).toString();
            setEncryptedText(encrypted);
            toast({
                variant: "default",
                title: "Successfully!",
                description: "QR is generated.",
            })
        }
    }

    const downloadQR = () => {
        if (qrRef.current) {
            const canvas = qrRef.current.querySelector('canvas');
            canvas.toBlob((blob: any) => {
                saveAs(blob, 'SECURE-QR.png');
            });
        }
    };

    const clear = () => {
        setEncryptedText('');
        setValue('');
        setKey('');
        setShowKeyTab(false);
    }

    return (
        <main className="flex-grow flex flex-col items-center justify-center gap-4">
            <div className="w-5/6 lg:w-96 md:w-96 text-center flex gap-4">
                <Button onClick={() => setTab(0)} variant={tab === 0 ? 'default' : 'secondary'} className='w-48'>CREATE</Button>
                <Button onClick={() => setTab(1)} variant={tab === 1 ? 'default' : 'secondary'} className='w-48'>SCAN</Button>
            </div>
            <div className='w-5/6 h-72 lg:w-96 lg:h-96 md:w-96 md:h-96 border p-10 rounded-md flex flex-col items-center justify-center relative'>
                {encryptedText
                    ?
                    (
                        <div ref={qrRef}>
                            <QRCodeCanvas value={encryptedText} size={200} />
                        </div>
                    )
                    :
                    <QrCode />
                }
                {
                    encryptedText && (
                        <div className="absolute top-2 right-2 flex items-center justify-center gap-2">
                            <ArrowDownToLine className="cursor-pointer" onClick={downloadQR} />
                            <Trash2 className="cursor-pointer" onClick={clear} />
                        </div>
                    )
                }
            </div>
            <div className='w-5/6 lg:w-96 md:w-96 flex flex-col items-center justify-center gap-4'>
                <div className="w-full relative flex items-center">
                    <Baseline className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
                    <Input
                        type={showValue ? 'text' : 'password'}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Value"
                        className='pl-8'
                    />
                    {
                        showValue
                            ?
                            <EyeOff onClick={() => setShowValue(false)} className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 transform cursor-pointer" />
                            :
                            <Eye onClick={() => setShowValue(true)} className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 transform cursor-pointer" />
                    }
                </div>
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
            </div>
            <Button className='w-5/6 lg:w-96 md:w-96' onClick={generateQR}>Generate</Button>
        </main>
    );
}
