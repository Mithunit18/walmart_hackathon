import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Twitter, Facebook, Linkedin, Phone, MapPin, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);



    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800">
            <nav className="fixed w-full top-0 left-0 z-50 bg-gray-800 text-gray-200 shadow-md">
                <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
                    <Link to="/" className="text-3xl font-extrabold">
                        Product
                        <span className="text-5xl bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent ml-1">
                            HUB
                        </span>
                    </Link>
                    <div className="hidden md:block">
                        <Link
                            to="/auth"
                            className="bg-gray-700 px-5 py-2 rounded-2xl hover:bg-purple-700 hover:text-white transition-all duration-500"
                        >
                            Login / SignUp
                        </Link>
                    </div>

                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {isOpen && (
                    <div
                        className={`fixed top-0 right-0 h-full w-64 bg-gray-900 text-white shadow-lg transform transition-transform duration-300 z-40 ${isOpen ? "translate-x-0" : "translate-x-full"
                            } md:hidden`}
                    >
                        <div className="p-6 flex flex-col space-y-6">
                            <button onClick={() => setIsOpen(false)} className="self-end">
                                <X className="w-6 h-6" />
                            </button>
                            <Link
                                to="/auth"
                                onClick={() => setIsOpen(false)}
                                className="bg-gray-700 text-center py-2 rounded-xl hover:bg-purple-700 transition"
                            >
                                Login / SignUp
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
            <div className="text-gray-300 mt-20 px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <p
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center pt-14 font-extrabold leading-tight"
                    data-aos="fade-up"
                    data-aos-delay="100"
                >
                    An intelligent, powerful <br />
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                        E-Commerce
                    </span>
                    <br />
                    platform for seamless Shopping
                </p>

                {/* Subheading */}
                <p
                    className="mt-8 text-base sm:text-lg md:text-xl text-center max-w-3xl mx-auto font-semibold"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    An intelligent eCommerce platform that transforms traditional shopping
                    into a seamless, data-driven experience.
                    <br /><br />
                </p>

                {/* Button */}
                <div className="flex justify-center pt-6" data-aos="fade-up" data-aos-delay="300">
                    <button
                        onClick={() => navigate("/auth")}
                        className="bg-purple-700 px-6 py-3 rounded-xl font-semibold text-lg hover:bg-purple-900 transition-all duration-500"
                    >
                        Get Started For Free
                    </button>
                </div>
            </div>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start text-gray-300 max-w-6xl mt-14 px-4 mx-auto" data-aos="fade-up" data-aos-delay="400">
                {/* Card 1 */}
                <div className="bg-gradient-to-l from-gray-700 to-gray-800 p-6 rounded-xl shadow-sm hover:shadow-purple-700 transition-all duration-300 h-full flex-col justify-between">
                    <h3 className="text-center text-2xl font-bold text-purple-400">Smart Browsing</h3>
                    <p className="text-center text-lg mt-3">
                        Filter by category, price, or popularity to quickly find the products you need — no extra clicks.
                    </p>
                </div>

                {/* Card 2 */}
                <div className="bg-gradient-to-l from-gray-700 to-gray-800 p-6 rounded-xl shadow-sm hover:shadow-purple-700 transition-all duration-300 h-full flex flex-col justify-between">
                    <h3 className="text-center text-2xl font-bold text-purple-400">Real-Time Offers</h3>
                    <p className="text-center text-lg mt-3">
                        Stay updated with the latest deals, flash sales, and discounts as they go live — all in one place.
                    </p>
                </div>

                {/* Card 3 */}
                <div className="bg-gradient-to-l from-gray-700 to-gray-800 p-6 rounded-xl shadow-sm hover:shadow-purple-700 transition-all duration-300 h-full flex flex-col justify-between">
                    <h3 className="text-center text-2xl font-bold text-purple-400">Smooth Checkout</h3>
                    <p className="text-center text-lg mt-3">
                        Enjoy a secure, fast, and user-friendly checkout experience with multiple payment options.
                    </p>
                </div>
            </section>

            <section className="text-gray-300 text-center space-y-8 px-4 mt-14 mx-auto">
                <h2 className="text-3xl lg:text-4xl font-bold">What Our <span className="text-purple-400">Customers Say</span> <span className="text-purple-500">?</span></h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-center mx-auto max-w-6xl">
                    <div className="bg-gradient-to-l from-gray-700 to-gray-800 p-6 rounded-xl shadow-sm hover:shadow-purple-700 transition-all duration-300 h-full flex flex-col justify-between">
                        <p className="text-center text-lg italic">"Product HUB made shopping so much easier! I found everything I needed in minutes."</p>
                        <p className="text-purple-400 font-semibold mt-4">— Riya K., Chennai</p>
                    </div>
                    <div className="bg-gradient-to-l from-gray-700 to-gray-800 p-6 rounded-xl shadow-sm hover:shadow-purple-700 transition-all duration-300 h-full flex flex-col justify-between">
                        <p className="text-center text-lg italic">"The real-time offers saved me money, and the checkout was incredibly fast."</p>
                        <p className="text-purple-400 font-semibold mt-4">— Aditya P., Mumbai</p>
                    </div>
                    <div className="bg-gradient-to-l from-gray-700 to-gray-800 p-6 rounded-xl shadow-sm hover:shadow-purple-700 transition-all duration-300 h-full flex flex-col justify-between">
                        <p className="text-center text-lg italic">"I love how smooth and secure the shopping experience is. Highly recommend!"</p>
                        <p className="text-purple-400 font-semibold mt-4">— Meena G., Delhi</p>
                    </div>
                </div>
            </section>

            <footer className="grid items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 bg-gray-800 mt-14 pt-4 pl-8 sm:pl-10 lg:pl-14">
                
                <div className="space-y-2  text-gray-400 max-w-sm">
                    <p className="text-xl text-gray-200">Product <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent font-bold text-3xl">HUB</span></p>
                    <p> Your intelligent e-commerce partner for seamless shopping.</p>
                    <div className="flex flex-row space-x-1">
                        <Twitter className="hover:bg-purple-700 rounded-full hover:text-white  p-1 w-7 h-7 transition-all duration-300 cursor-pointer" /> <Facebook className="hover:bg-purple-700  hover:text-white rounded-full p-1 w-7 h-7 transition-all duration-300 cursor-pointer" /> <Linkedin className="hover:bg-purple-700  hover:text-white rounded-full p-1 w-7 h-7 transition-all duration-300 cursor-pointer" />
                    </div>
                </div>
                <div className="text-gray-400 flex flex-col space-y-2 mt-6">
                    <p className="text-gray-200 text-xl mb-2">Product</p>
                    <Link to='/' className="hover:text-white">Features</Link>
                    <Link to='/' className="hover:text-white">Pricing</Link>
                    <Link to='/' className="hover:text-white">API</Link>
                    <Link to='/' className="hover:text-white">Integrations</Link>
                </div>
                <div className="text-gray-400 flex flex-col space-y-2 mt-6">
                    <p className="text-gray-200 text-xl mb-2">Resources</p>
                    <Link to='/' className="hover:text-white">Documentation</Link>
                    <Link to='/' className="hover:text-white">Help Center</Link>
                    <Link to='/' className="hover:text-white">Blog</Link>
                    <Link to='/' className="hover:text-white">Community</Link>
                </div>
                <div className="text-gray-400 flex flex-col space-y-2 mt-6">
                    <p className="text-gray-200 text-xl mb-2">Company</p>
                    <Link to='/' className="hover:text-white">About</Link>
                    <Link to='/' className="hover:text-white">Careers</Link>
                    <Link to='/' className="hover:text-white">Privacy</Link>
                    <Link to='/' className="hover:text-white">Terms</Link>
                </div>
                <div className="text-gray-300 space-y-4 mt-4">
                    <h2 className="text-xl text-white font-semibold">Contact</h2>
                    <div className="flex items-center gap-2">
                        <Phone className="w-5 h-5 text-purple-500" />
                        <a
                            href="tel:9791640220"
                            className="hover:text-white transition"
                        >
                            9087654321
                        </a>
                    </div>

                    <div className="flex items-center gap-2">
                        <Mail className="w-5 h-5 text-purple-500" />
                        <a
                            href="mailto:ProductHub@@gmail.com"
                            className="hover:text-white transition"
                        >
                            ProductHub@gmail.com
                        </a>
                    </div>

                    <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-purple-500" />
                        <span>poonamalle, Chennai</span>
                    </div>
                </div>
            </footer>
            <section className="bg-gray-800">    
            <br />
            <hr className="border-t border-gray-500 my-4" />
            <p className="text-gray-400 text-center">@2025 productHUB.All rights reserved</p>
            <br />
            </section>
   



        </div>
    );
};

export default Home;
