import { getBlogData } from '@/app/api/blog/blog';
import BlogViewComponent from '@/app/components/blog/BlogViewComponent';
import { getMessage } from '../utils/messages';
import type { BlogPage } from '@/app/types/blog';
import BlogItems from '../components/blog/BlogItems';

export default async function BlogPage() {
    const data = await getBlogData();

    return (
        <div className="mx-auto w-full">
            <h1 className="mb-8 text-2xl font-bold">{getMessage('common.blog')}</h1>
            <section className="body-font text-gray-600">
                <div className="mx-auto">
                    <div className="-m-4 flex flex-wrap">
                        {data
                            .filter((item): item is BlogPage => item !== undefined)
                            .map((item) => (
                                <BlogItems key={item.id} data={item} />
                            ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
