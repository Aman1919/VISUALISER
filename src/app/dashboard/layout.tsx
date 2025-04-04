import BackButton from "@/component/BackButton";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {   

    return (
        <div className="container mx-auto p-4">
            <BackButton route="/home" />
            {children}
        </div>
    );
}