import BackButton from "@/component/BackButton";

export default function({ children }: { children: React.ReactNode }) {   

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto p-4">
            <BackButton route="/home" />
            {children}
        </div>
        </div>
    );
}