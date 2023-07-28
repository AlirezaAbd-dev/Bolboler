import { useSession } from 'next-auth/react';

import Form from './Form';

export function NewTweetForm() {
    const session = useSession();
    if (session.status !== 'authenticated') return null;

    return <Form />;
}
