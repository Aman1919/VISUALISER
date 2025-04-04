import BackButton from "@/component/BackButton";

export default function LessonsLayout({ children }: { children: React.ReactNode }) {   

    return (
        <div className="container mx-auto p-4">
            <BackButton route="/dashboard" />
            {children}
        </div>
    );
}