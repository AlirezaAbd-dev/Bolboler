import { memo, useState } from 'react';

import getLogoNameArray from '~/utils/getLogoNameArray';

const Logo = () => {
    const [LOGO] = useState(() => {
        const logoName = 'BOLBOLER';
        return getLogoNameArray(logoName);
    });
    return (
        <h1 className="text-gray-900 dark:text-blue-400  mb-2 px-4 text-lg font-bold">
            {LOGO.map((l, index) => (
                <p key={index} className="logo inline-block opacity-0">
                    {l}
                </p>
            ))}
        </h1>
    );
};

export default memo(Logo);
