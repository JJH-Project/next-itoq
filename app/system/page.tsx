import { getSystemData } from '@/app/api/system/system'
import SystemItems from '@/app/components/systems/SystemItems'
import { getMessage } from '@/app/utils/messages';

export default async function SystemPage() {
    const data = await getSystemData();

    return (
        <div className="w-full  mx-auto">
            <h1 className="text-2xl font-bold mb-8">{getMessage('common.system')}</h1>
            <section className="text-gray-600 body-font">
                <div className="mx-auto">
                    <div className="flex flex-wrap -m-4">
                        {data.map((item) => (
                            <SystemItems key={item.id} data={item} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}