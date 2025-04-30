export const ProfileField = ({ label, value, editable, onChange, name, error, type = "text" }) => {
    const maskValue = (val) => (val ? "*".repeat(val.length) : "");

    return (
    <div className="mb-2">
        <label className="font-semibold text-[#00328C]">{label}</label>
        {editable ? (
            <>
            <input className={`w-full border border-gray-300 px-2 py-1 rounded ${error ? "border-red-500" : "border-gray-300"}`}
                type={type}
                value = {value}
                onChange = {onChange}
                name = {name}
            />
            {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
            </>
        ) : (
            <p> {type === "password" ? "********" : value}</p>
        )}
    </div>
    );
};