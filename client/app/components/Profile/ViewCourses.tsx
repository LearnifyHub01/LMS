import React,{FC} from 'react'

type Props = {
    user: any;
  };
const ViewCourses: FC<Props> = ({ user }) =>{
    console.log(user.courses)

  return (
    <div>
      ViewCourses
    </div>
  )

}
export default ViewCourses
