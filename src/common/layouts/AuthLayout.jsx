import React from "react";
import { Link, Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="grid grid-rows-[1fr_5fr_1fr] h-screen">
      <header className="py-2 ">
        <div className="flex items-center max-w-7xl xl:mx-auto justify-center">
          <div className="flex flex-col gap-2 items-center">
            <Link className="text-4xl font-bold m-0! text-black!">MPV</Link>
            <p>Movie Plus VietNam</p>
          </div>
        </div>
      </header>

      <div className="bg-gray-300/30">
        <Outlet />
      </div>

      <footer className="bg-black py-4 text-center text-white text-sm">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-white/80 mb-2">
            Liên hệ:{" "}
            <a
              href="mailto:support@mpv.vn"
              className="text-primary! hover:underline"
            >
              support@mpv.vn
            </a>{" "}
            | Hotline:{" "}
            <a href="tel:19001009" className="text-primary! hover:underline">
              1900 1009
            </a>{" "}
            | Địa chỉ: Trịnh Văn Bô, Nam Từ Liêm, Hà Nội
          </p>
          <p className="text-white/60">
            © 2025 MPV — Movie Plus Vietnam. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AuthLayout;