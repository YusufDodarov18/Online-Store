const NotFound = () => {
  return (
    <div className="min-h-[500px] flex flex-col items-center justify-center font-semibold ">
      <h1 className="text-[110px] text-center mt-[0px] ">404 Not Found</h1>
      <p className="text-[16px] mt-[20px] mb-[80px] text-center ">Your visited page not found. You may go home page.</p>
      <div className="text-center">
        <a href="/" className="text-[#FAFAFA] bg-[#DB4444] py-[16px] px-[48px] text-center m-auto rounded-[4px] ">
          Back to home page
        </a>
      </div>
    </div>
  );
};

export default NotFound;
