export const ProfileField = ({ label, value, editable, onChange, name }) => (
    <div className="mb-2">
        <label className="font-semibold text-[#00328C]">{label}</label>
        {editable ? (
            <input className="w-full border border-gray-300 px-2 py-1 rounded"
                value = {value}
                onChange = {onChange}
                name = {name}
            />
        ) : (
            <p>{value}</p>
        )}
    </div>
);