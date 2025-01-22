export default function HospitalSkeleton() {
    return (
        <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-100 rounded-lg p-6 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="space-y-2">
                        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

