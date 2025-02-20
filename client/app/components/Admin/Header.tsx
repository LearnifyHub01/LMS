import { Typography, Box, useTheme } from "@mui/material";
import { FC } from "react";

type Props ={
    title:string,
    subtitle:string
}
const Header:FC<Props> = ({ title, subtitle }) => {

 
  return (
    <div className="ml-4 mt-4">
   <Box mb="30px">
      <Typography
        variant="h4"
        className='dark:text-[#e0e0e0] text-black'
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </Typography>
      <Typography  color='#70d8bd'>
        {subtitle}  
      </Typography>
    </Box>
    </div>
 
  );
};

export default Header;
