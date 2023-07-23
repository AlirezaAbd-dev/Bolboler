import Link from 'next/link';
import { ProfileImage } from '~/components/ProfileImage';

type FolloweLsitProps = {
    userId: string;
    userImage: string | null;
    userName: string | null;
};

const FollowList = (props: FolloweLsitProps) => {
    return (
        <Link href={`/profiles/${props.userId}`}>
            <li className="flex items-center gap-2 rounded-lg p-3 font-bold transition-colors delay-100 hover:bg-gray-200">
                <ProfileImage src={props.userImage} />
                <span>{props.userName}</span>
            </li>
        </Link>
    );
};

export default FollowList;
