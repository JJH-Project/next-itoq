import { SystemPage } from '@/app/types/system';

interface SystemItemProps {
    data: SystemPage;
}

export default function SystemItems({ data }: SystemItemProps) {
    const title = data.properties.title.title[0]?.plain_text || 'No title';
    const contents = data.properties.contents.rich_text[0]?.plain_text || 'No contents';
    const imgSrc = data.properties.image?.rich_text?.[0]?.plain_text || '';

    return (
        <div className="xl:w-1/4 lg:w-1/3 md:w-1/2 sm:w-full p-4">
            <div className="bg-gray-100 p-6 rounded-lg">
                <div className="relative h-40 w-full mb-6">
                    <img
                        src={imgSrc}
                        alt={title}
                        className="rounded object-cover w-full h-full"
                    />
                </div>
                <h2 className="tracking-widest text-indigo-500 text-lg font-medium title-font pb-4 font-bold">
                    {title}
                </h2>
                <p className="leading-relaxed text-base whitespace-pre-line">
                    {contents}
                </p>
            </div>
        </div>
    )
}