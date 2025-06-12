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
            <div className="my-8 flex flex-row items-center justify-center">
                <div className="w-1/2">
                    <ChartComponent labels={labels} values={values} />
                </div>
            </div>

            <img
                src="/images/fv01.webp"
                alt="itoq"
                className="m-auto h-auto w-[70%] object-cover p-2"
            />
        </div>
    );
}
