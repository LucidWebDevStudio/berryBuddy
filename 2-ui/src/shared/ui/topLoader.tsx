interface Props {
  whatIsBeingLoaded: string;
}
export const TopLoader = ({ whatIsBeingLoaded }: Props) => {
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-[3px] bg-transparent z-[9999] overflow-hidden">
        <div className="h-[100dvh] w-1/3 bg-blue-500 animate-slide"></div>
      </div>
    </>
  );
};
