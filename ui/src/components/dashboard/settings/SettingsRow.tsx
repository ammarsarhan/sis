export default function SettingsRow({ label, description, children } : { label: string, description: string, children: React.ReactNode }) {
    return (
        <div className="flex items-center gap-x-16 justify-between py-5 w-full">
            <div className="flex flex-col gap-y-0.5 flex-1">
                <span className="text-sm">{label}</span>
                <p className="text-[0.8125rem] text-gray-500">{description}</p>
            </div>
            {children}
        </div>
    )
}