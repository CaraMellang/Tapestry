import { useState } from "react";
import { useSelector } from "react-redux";

export default function useAllowGroupService() {
  const userGroup: any = useSelector(
    (state: any) => state.userSliceReducer.user.group
  );
  const [allow, setAllow] = useState(false);

  const verifyGroupUser = (groupId: string) => {
    userGroup.forEach((item: any) => {
      
      if (item._id === groupId) {
        console.log(item._id,groupId)
        setAllow(true);
      }
    });
  };

  return [allow, verifyGroupUser, setAllow] as [
    boolean,
    typeof verifyGroupUser,
    React.Dispatch<React.SetStateAction<boolean>>
  ];
}
