import { DATABASE_ID, TOKEN } from '../config'
import SystemItem from '../components/systems/systemItem'

async function getNotionData() {
    const options = {
        method: 'POST',
        headers: {
        accept: 'application/json',
        'Notion-Version': '2022-06-28',
        'content-type': 'application/json',
        authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({ page_size: 100 }),
    };

    const res = await fetch(
        `https://api.notion.com/v1/databases/${DATABASE_ID}/query`,
        options
    );

    if (!res.ok) {
        throw new Error('cant read data');
    }

    const result = await res.json();
    const data = result.results.slice(1);
    
    return data;
    }

    export default async function SystemPage() {

    const data = await getNotionData();

    return (
        <main className="min-h-screen p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">社内制度 System</h1>
                <section className="text-gray-600 body-font">
                    <div className="container px-5 py-24 mx-auto">
                        <div className="flex flex-wrap -m-4">
                            {data.map((aProject: any) => (
                                <SystemItem key={aProject.id} data={aProject} />
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}