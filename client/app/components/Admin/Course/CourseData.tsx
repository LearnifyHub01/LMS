import { styles } from "@/app/styles/style";
import React, { FC } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import toast from "react-hot-toast";

type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequisites: (prerequisites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseData: FC<Props> = ({
  benefits,
  active,
  setActive,
  setBenefits,
  setPrerequisites,
  prerequisites,
}) => {
  const handleBenefitChnage = (index: any, value: any) => {
    const updateBenefits = [...benefits];
    updateBenefits[index].title = value;
    setBenefits(updateBenefits);
  };
  const handleAddBenefits = () => {
    setBenefits([...benefits, { title: "" }]);
  };

  const handlePrerequisitesChnage = (index: any, value: any) => {
    const updatePrerequisites = [...prerequisites];
    updatePrerequisites[index].title = value;
    setPrerequisites(updatePrerequisites);
  };
  const handleAddprerequisites = () => {
    setPrerequisites([...prerequisites, { title: "" }]);
  };

  const prevButton = () => {
    setActive(active - 1);
  }; 

  const handleOptions =()=>{
    if (benefits[benefits.length-1]?.title!=='' && prerequisites[prerequisites.length]?.title!=='') {
        setActive(active + 1);
    } else {
        toast.error('Please fill all fields for go to next')
    }
    
  }
  return (
    <div className="w-[100%] p-3 ml-2">
      <div>
        <label className={`${styles.label} text-[20px]`} htmlFor="email">
          What are the benefits for students in this course?
        </label>
        <br />
        {benefits.map((benefit: any, index: number) => (
          <input
            type="text"
            key={index}
            name="benifits"
            placeholder="You will be able to build a full stack LMS platform..."
            required
            className={`${styles.input} my-2`}
            value={benefit.title}
            onChange={(e) => handleBenefitChnage(index, e.target.value)}
          />
        ))}
        <AddCircleOutlineIcon
          className="text-black dark:text-white" 
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
        
          onClick={handleAddBenefits}
        />
      </div>
      <div>
        <label className={`${styles.label} text-[20px]`} htmlFor="email">
          What are the prerequisites for starting this course?
        </label>
        <br />
        {prerequisites.map((prerequisites: any, index: number) => (
          <input
            type="text"
            key={index}
            name="prerequisites"
            placeholder="You need basic knowledge of MERN stack"
            required
            className={`${styles.input} my-2`}
            value={prerequisites.title}
            onChange={(e) => handlePrerequisitesChnage(index, e.target.value)}
          />
        ))}
        <AddCircleOutlineIcon
        className="text-black dark:text-white" 
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          onClick={handleAddprerequisites}
        />
      </div>
      <div className="w-full flex items-center justify-between">
        <button
          className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => prevButton()}
        >
          prev
        </button>
        <button   className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => handleOptions()}>
            Next
        </button>
        
      </div>
    </div>
  );
};

export default CourseData;
