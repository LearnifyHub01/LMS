// 'use client'
// import CourseDeatilPage from "@/app/components/Course/CourseDeatilPage";
// import React from "react";

// const Page = ({params} : any) => {
//     return(
//         <div>
//         <CourseDeatilPage id={params.id}/>
//         </div>
//     )
// }

// export default Page

'use client'
import CourseDeatilPage from "@/app/components/Course/CourseDetailsPage";
import React, { use } from "react";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = use(params); 
    
    return (
        <div>
            <CourseDeatilPage id={id} />
        </div>
    );
};

export default Page;
