"use client";

const ResultSection = ({ data }: any) => {
    return (
        <main className="flex-grow flex flex-col items-center justify-center gap-4">
            <span>{data}</span>
        </main>
    );
};

export default ResultSection;