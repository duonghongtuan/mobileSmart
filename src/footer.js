import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-white ">
            <div className="row py-4">
                <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                    <img
                        src="img/logo.png"
                        alt=""
                        width="180"
                        className="mb-3"
                    />
                    <p className="font-italic text-muted">
                        Trong năm 2020, GÕ TỐC KÝ với tầm nhìn mới là trở thành
                        nền tảng học gõ tốc ký thời gian ngắn nhất và gõ nhanh
                        nhất.
                    </p>
                    <ul className="list-inline mt-4">
                        <li className="list-inline-item">
                            <Link href="#" target="_blank" title="twitter">
                                <i className="fa fa-twitter"></i>
                            </Link>
                        </li>
                        <li className="list-inline-item">
                            <Link href="#" target="_blank" title="facebook">
                                <i className="fa fa-facebook"></i>
                            </Link>
                        </li>
                        <li className="list-inline-item">
                            <Link href="#" target="_blank" title="instagram">
                                <i className="fa fa-instagram"></i>
                            </Link>
                        </li>
                        <li className="list-inline-item">
                            <Link href="#" target="_blank" title="pinterest">
                                <i className="fa fa-pinterest"></i>
                            </Link>
                        </li>
                        <li className="list-inline-item">
                            <Link href="#" target="_blank" title="vimeo">
                                <i className="fa fa-vimeo"></i>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
                    <h6 className="text-uppercase font-weight-bold mb-4">
                        DANH MỤC CHÍNH
                    </h6>
                    <ul className="list-unstyled mb-0">
                        <li className="mb-2">
                            <Link href="#" className="text-muted">
                                Học quy tắc
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link href="#" className="text-muted">
                                Luyện gõ
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link href="#" className="text-muted">
                                Thi đấu
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link href="#" className="text-muted">
                                Soạn thảo
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
                    <h6 className="text-uppercase font-weight-bold mb-4">
                        CÔNG TY
                    </h6>
                    <ul className="list-unstyled mb-0">
                        <li className="mb-2">
                            <Link href="#" className="text-muted">
                                Login
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link href="#" className="text-muted">
                                Register
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link href="#" className="text-muted">
                                Wishlist
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link href="#" className="text-muted">
                                Our Products
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="col-lg-4 col-md-6 mb-lg-0">
                    <h6 className="text-uppercase font-weight-bold mb-4">
                        LIÊN HỆ
                    </h6>
                    <p className="text-muted mb-4">
                        Trụ sở: NP Tower, số 232/17 đường Tạ Quang Bủu, Hai Bà
                        Trưng, Hà Nội, Việt Nam
                    </p>
                    <div className="p-1 rounded border">
                        <div className="input-group">
                            <input
                                type="email"
                                placeholder="Nhập địa chỉ Email của bạn"
                                aria-describedby="button-addon1"
                                className="form-control border-0 shadow-0"
                            />
                            <div className="input-group-append">
                                <button
                                    id="button-addon1"
                                    type="submit"
                                    className="btn btn-link"
                                >
                                    <i className="fa fa-paper-plane"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
