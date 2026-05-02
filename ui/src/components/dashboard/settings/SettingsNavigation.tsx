import { Link } from "@tanstack/react-router";

export default function SettingsNavigation({ cycleId } : { cycleId: string }) {
    return (
        <>
            <h1 className="text-xl font-medium mx-6">Settings</h1>
            <nav className="flex w-[calc(100%-3rem)] mx-6 text-sm mt-1.5 mb-4 border-b">
                <Link 
                    to="/dashboard/$cycleId/settings" 
                    params={{ cycleId }} 
                    className="px-4 py-2 border-b-[1.5px] border-transparent text-gray-500"
                    activeOptions={{ exact: true }}
                    activeProps={{
                        className: "border-black! font-medium text-black!",
                    }}
                >
                    General
                </Link>
                <Link 
                    to="/dashboard/$cycleId/settings/offerings" 
                    params={{ cycleId }} 
                    activeOptions={{ exact: true }}
                    className="px-4 py-2 border-b-[1.5px] border-transparent text-gray-500"
                    activeProps={{
                        className: "border-black! font-medium text-black!",
                    }}
                >
                    Offerings
                </Link>
                <Link 
                    to="/dashboard/$cycleId/settings/events" 
                    params={{ cycleId }} 
                    activeOptions={{ exact: true }}
                    className="px-4 py-2 border-b-[1.5px] border-transparent text-gray-500"
                    activeProps={{
                        className: "border-black! font-medium text-black!",
                    }}
                >
                    Event Log
                </Link>
                <Link 
                    to="/dashboard/$cycleId/settings/users" 
                    params={{ cycleId }} 
                    activeOptions={{ exact: true }}
                    className="px-4 py-2 border-b-[1.5px] border-transparent text-gray-500"
                    activeProps={{
                        className: "border-black! font-medium text-black!",
                    }}
                >
                    Users & Permissions
                </Link>
            </nav>
        </>
    )
}