

export default function InputField({ id, label, type = "text", value, onChange, placeholder }) {
    return (
        <div className="mb-4">
            <label htmlFor={id} className=" block text-sm font-medium text-gray-700">{label}</label>
            <input
                type={type}
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required
                placeholder={placeholder}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
        </div>
    );
}
