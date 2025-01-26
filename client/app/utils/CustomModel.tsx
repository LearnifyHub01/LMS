// import React, { FC } from "react";
// import { Modal, Box } from "@mui/material";

// type Props = {
//   open: boolean;
//   setOpen: (open: boolean) => void;
//   activeItem?: any;
//   component: any;
//   setRoute?: (route: string) => void;
// };

// const CustomModel: FC<Props> = ({ open, setOpen, setRoute, component: Component }) => {
//   return (
//     <Modal
//       open={open}
//       onClose={() => setOpen(false)}
//       aria-labelledby="modal-modal-title"
//       aria-describedby="modal-modal-description"
//       closeAfterTransition
//       disableScrollLock
//     >
//       <Box
//         className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[450px] bg-white dark:bg-slate-700 rounded-[8px] shadow-lg p-6 outline-none"
//         sx={{
//           overflowY: "auto", // Ensures content is scrollable if it overflows
//           maxHeight: "90vh", // Prevents modal from exceeding viewport height
//         }}
//       >
//         <Component setOpen={setOpen} setRoute={setRoute} />
//       </Box>
//     </Modal>
//   );
// };

// export default CustomModel;

import React, { FC } from "react";
import { Modal, Box } from "@mui/material";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem?: any;
  component: any;
  setRoute?: (route: string) => void;
};

const CustomModel: FC<Props> = ({ open, setOpen, setRoute, component: Component }) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      closeAfterTransition
      disableScrollLock
    >
      <Box
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[450px] bg-white dark:bg-slate-700 rounded-[8px] shadow-lg p-6 outline-none"
        sx={{
          overflowY: "auto", // Ensures content is scrollable if it overflows
          maxHeight: "90vh", // Prevents modal from exceeding viewport height
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Component setOpen={setOpen} setRoute={setRoute} />
      </Box>
    </Modal>
  );
};

export default CustomModel;
