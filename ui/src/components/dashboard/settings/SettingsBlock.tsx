export default function SettingsBlock({ title, children } : { title: string, children: React.ReactNode }) {
    return (
        <div className="py-6 last:mb-6">
            <h2 className="font-medium text-[0.9rem]">{title}</h2>
            {children}
        </div>
    )
}