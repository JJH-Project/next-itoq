import { SystemPage } from '@/app/types/system';
import LikeComponent from '../common/LikeComponent';

interface SystemItemProps {
    data: SystemPage;
}

export default function SystemItems({ data }: SystemItemProps) {
    const title = data.properties.title.title[0]?.plain_text || 'No title';
    const contents = data.properties.contents.rich_text[0]?.plain_text || 'No contents';
    const imgSrc = data.properties.image?.rich_text?.[0]?.plain_text || '';

    return (
        <div className="p-4 sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
            <div className="rounded-lg bg-gray-100 p-6">
                <div className="relative mb-6 h-40 w-full">
                    <img src={imgSrc} alt={title} className="h-full w-full rounded object-cover" />
                </div>
                <h2 className="title-font pb-4 text-lg font-bold font-medium tracking-widest text-indigo-500">
                    {title}
                </h2>
                <p className="whitespace-pre-line text-base leading-relaxed">{contents}</p>
            </div>
        </div>
    );
}
