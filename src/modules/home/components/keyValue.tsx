"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Plus } from "lucide-react";

interface KeyValuePair {
    id: string;
    key: string;
    value: string;
}

const KeyValueSection = () => {
    const [pairs, setPairs] = useState<KeyValuePair[]>([
        { id: "1", key: "", value: "" }
    ]);

    const addPair = () => {
        setPairs([...pairs, { id: crypto.randomUUID(), key: "", value: "" }]);
    };

    const removePair = (id: string) => {
        setPairs(pairs.filter(pair => pair.id !== id));
    };

    const updatePair = (id: string, field: "key" | "value", newValue: string) => {
        setPairs(
            pairs.map(pair =>
                pair.id === id ? { ...pair, [field]: newValue } : pair
            )
        );
    };

    return (
        <div className="w-full max-w-4xl mx-auto space-y-4">
            {pairs?.map((pair: any, index: any) => (
                <div key={pair.id} className="flex space-x-4">
                    <div className="flex-1">
                        {
                            index === 0 && (
                                <label className="text-sm font-medium mb-2 block text-gray-700">Câu hỏi</label>
                            )
                        }
                        <Input
                            placeholder="e.g. Iphone 16 Pro Max giá bao nhiêu?"
                            value={pair.key}
                            onChange={(e) => updatePair(pair.id, "key", e.target.value)}
                            className="border border-gray-200 rounded-md"
                        />
                    </div>
                    <div className="flex-1">
                        {
                            index === 0 && (
                                <label className="text-sm font-medium mb-2 block text-gray-700">Câu trả lời</label>
                            )
                        }
                        <Input
                            placeholder=""
                            value={pair.value}
                            onChange={(e) => updatePair(pair.id, "value", e.target.value)}
                            className="border border-gray-200 rounded-md"
                        />
                    </div>
                    <div className="flex items-end space-x-2 mb-[2px]">
                        <Button variant="outline" size="icon" className="h-10 w-10">
                            <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-10 w-10"
                            onClick={() => removePair(pair.id)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            ))}
            <div>
                <Button
                    variant="outline"
                    onClick={addPair}
                    className="flex items-center space-x-2"
                >
                    <Plus className="h-4 w-4" />
                    <span>Thêm cặp mới</span>
                </Button>
            </div>
        </div>
    );
};

export default KeyValueSection;