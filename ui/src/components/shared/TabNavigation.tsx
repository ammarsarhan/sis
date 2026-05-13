import { Link } from "@tanstack/react-router";

interface BaseTabItem {
  label: string;
}

interface LinkTabItem extends BaseTabItem {
  type: "link";
  to: string;
  params?: Record<string, string | undefined>;
  search?: Record<string, unknown> | ((prev: Record<string, unknown>) => Record<string, unknown>);
  activeOptions?: { exact?: boolean };
  isActive?: boolean;
}

interface IndexTabItem extends BaseTabItem {
    type: "index";
    isActive: boolean;
    onClick?: () => void;
}

export type TabItem = LinkTabItem | IndexTabItem;

interface TabNavigationProps {
    tabs: Array<TabItem>;
    className?: string;
}

function tabClass(isActive: boolean) {
    return `px-4 py-2 border-b-[1.5px] text-sm ${
        isActive
            ? "border-black font-medium text-black"
            : "border-transparent text-gray-500 hover:text-gray-700"
    }`;
}

export function TabNavigation({ tabs, className }: TabNavigationProps) {
    return (
        <div className={className ?? "mx-6"}>
            <nav className={`flex items-center justify-between gap-x-16 mt-1.5 border-b mb-2`}>
                <div className="flex w-full text-sm">
                    {
                        tabs.map((tab) =>
                            tab.type === "link" ? (
                                <Link
                                    key={tab.label}
                                    to={tab.to}
                                    params={tab.params}
                                    search={tab.search}
                                    activeOptions={tab.activeOptions}
                                    className={tabClass(tab.isActive ?? false)}
                                    {...(tab.isActive === undefined && {
                                        activeProps: { className: "border-black! font-medium text-black!" }
                                    })}
                                >
                                    {tab.label}
                                </Link>
                            ) : (
                                <button
                                    key={tab.label}
                                    onClick={tab.onClick}
                                    className={tabClass(tab.isActive)}
                                >
                                    {tab.label}
                                </button>
                            )
                        )
                    }
                </div>
            </nav>
        </div>
    );
}