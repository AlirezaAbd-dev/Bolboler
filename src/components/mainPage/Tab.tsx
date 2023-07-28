import type { SetStateAction } from 'react';

type Tabs = 'Recent' | 'Following';

type TabProps = {
    tab: Tabs;
    selectedTab: Tabs;
    setSelectedTab: (value: SetStateAction<'Recent' | 'Following'>) => void;
};

const Tab = (props: TabProps) => {
    return (
        <button
            className={`flex-grow dark:text-white p-2 hover:bg-gray-200 focus-visible:bg-gray-200 dark:hover:bg-gray-800 dark:focus-visible:bg-gray-800 ${
                props.tab === props.selectedTab
                    ? 'border-b-4 border-b-blue-500 font-bold'
                    : ''
            }`}
            onClick={() => props.setSelectedTab(props.tab)}
        >
            {props.tab}
        </button>
    );
};

export default Tab;
