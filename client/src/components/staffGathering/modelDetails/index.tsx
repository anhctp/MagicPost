import React from "react";

interface Props {
  openDetail: number | null;
  setOpenDetail: React.Dispatch<React.SetStateAction<number | null>>;
}

export const ModelDetail: React.FC<Props> = (props) => {
  const { openDetail, setOpenDetail } = props;
  return (
    <>
      <div>alo</div>
      <div onClick={() => setOpenDetail(null)}>Close</div>
    </>
  );
};
