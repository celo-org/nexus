export default function Button({
    onClick,
    title,
    disabled,
}: React.HTMLProps<HTMLButtonElement>) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="rounded-md border border-black bg-prosperity px-3 py-1 text-base font-medium text-black shadow-sm disabled:bg-gray-200"
        >
            {title}
        </button>
    );
}
