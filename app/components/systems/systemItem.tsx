// import Image from 'next/image'

export default function SystemItem({data}) {
    console.log("data1",data);
    const title =  data.properties.title.title[0].plain_text;
    const contents =  data.properties.contents.rich_text[0].plain_text;
    const imgSrc =  data.properties.image.rich_text[0].plain_text;

    return(
    <div className="xl:w-1/4 md:w-1/2 p-4">
        <div className="bg-gray-100 p-6 rounded-lg">
        <div className="relative h-40 w-full mb-6">
            <img
                src={imgSrc}
                className="rounded object-cover w-full h-full"
                alt={title}
            />
        </div>
        <h2 className="tracking-widest text-indigo-500 text-lg font-medium title-font pb-4 font-bold">
            {title}
        </h2>
        <p className="leading-relaxed text-base">
            {contents}
        </p>
        </div>
    </div>
        
    )
}