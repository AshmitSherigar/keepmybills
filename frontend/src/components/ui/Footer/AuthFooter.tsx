const AuthFooter = () => {
  return (
    <>
      <div className="fixed bottom-0 w-full h-[8vh] flex items-center justify-between px-10 text-gray-500 text-sm">
        <h4>© 2025 KeepMyBills Corporation. All rights reserved.</h4>
        <div className="flex gap-10">
          <h4 className="hover:underline cursor-pointer">Security</h4>
          <h4 className="hover:underline cursor-pointer">Legal</h4>
          <h4 className="hover:underline cursor-pointer">Privacy</h4>
        </div>
      </div>
    </>
  );
};

export default AuthFooter;
