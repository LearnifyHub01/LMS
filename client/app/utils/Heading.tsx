import React, {FC} from "react";

interface HeadProps{
    title: string;
    description: string;
    keywords: string;
}

const Heading:FC<HeadProps>=({title, description, keywords}) => {
    return(
        <>
            <title>{title}</title>
            <meta name="viewport" content="width=device-width, initial-service-1"/>
            <meta name="description" content={description}/>
            <meta name="keywrods" content={keywords}/>

        </>
    )
}

export default Heading;