import { getBlogById } from '@/app/api/blog/blog';
import { getMessage } from '@/app/utils/messages';
import BlogViewComponent from '@/app/components/blog/BlogViewComponent';

export default async function BlogViewPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const blog = await getBlogById(id);

    return (
        <div className="mx-auto w-full">
            <h1 className="mb-8 text-2xl font-bold">{getMessage('common.blog')}</h1>
            <BlogViewComponent data={blog} />
        </div>
    );
}
