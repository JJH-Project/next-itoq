import { getSystemData } from '../api/system/system';
import SystemItems from '../components/systems/SystemItems';
import { getMessage } from '../utils/messages';

export default async function SystemPage() {
    const data = await getSystemData();

    return (
        <div className="mx-auto w-full">
            <h1 className="mb-8 text-2xl font-bold">{getMessage('common.system')}</h1>
            <section className="body-font text-gray-600">
                <div className="mx-auto">
                    <div className="-m-4 flex flex-wrap">
                        {data.map((item) => (
                            <SystemItems key={item.id} data={item} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
