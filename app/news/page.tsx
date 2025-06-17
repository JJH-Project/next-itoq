import { getNewsData } from '@/app/api/news/news';
import NewsItems from '@/app/components/news/NewsItems';
import { getMessage } from '../utils/messages';
import type { NewsPage } from '@/app/types/news';

export default async function NewsPage() {
    const data = await getNewsData();

    return (
        <div className="mx-auto w-full">
            <h1 className="mb-8 text-2xl font-bold">{getMessage('common.news')}</h1>
            <section className="body-font text-gray-600">
                <div className="mx-auto">
                    <div className="-m-4 flex flex-wrap">
                        {data
                            .filter((item): item is NewsPage => item !== undefined)
                            .map((item) => (
                                <NewsItems key={item.id} data={item} />
                            ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
