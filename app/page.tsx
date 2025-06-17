import { getContactChart } from './api/contact/contact';
import ChartComponent from './components/chart/chartComponent';
import { FORM_TITLE } from './utils/enums';

export const dynamic = 'force-dynamic';

export default async function Home() {
    const data = await getContactChart();
    const labels = data.map((item) => FORM_TITLE[item.label as keyof typeof FORM_TITLE]);
    const values = data.map((item) => item.value);

    return (
        <div>
            <img
                src="/images/fv01.webp"
                alt="itoq"
                className="m-auto h-auto w-full object-cover p-2 md:w-[70%]"
            />{' '}
            <div className="my-8 flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold">お問い合せの種類</h2>
                <div className="w-full md:w-1/2 lg:w-1/4">
                    <ChartComponent labels={labels} values={values} />
                </div>
            </div>
        </div>
    );
}
