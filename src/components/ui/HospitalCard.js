import React from "react";

export default function HospitalCard({ id, name, address, distance })
{
    return (
        <a href={`/clinics/${id}`}>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform">
                <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{name}</h3>
                    <p className="text-gray-600">{address}</p>
                    <p className="text-sm text-gray-500">Расстояние: {distance}м</p>
                </div>
            </div>
        </a>
    );
};