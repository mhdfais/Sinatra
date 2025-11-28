import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footers from "./Footers";
import logo2 from "../assets/sinatra-logo2.png";
import { useLocation, useNavigate } from "react-router-dom";
import starbg from "../assets/sinatra-stars-bg.jpg";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const contentRef = useRef(null);
  const navRef = useRef(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // 🔥 Entry Animation on Mount
  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      bgRef.current,
      { scale: 1 },
      { scale: 1.3, duration: 1.2, ease: "power2.out", delay: 0.5 }
    );

    // Navbar comes from top
    tl.fromTo(
      navRef.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.3, ease: "power3.out", delay: 0.5 },
      0
    );

    // Content rises up
    tl.fromTo(
      contentRef.current,
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1.3, ease: "power2.out", delay: 0.5 },
      0
    );
    const scroller = contentRef.current;

    let lastScroll = 0;

    ScrollTrigger.scrollerProxy(scroller, {
      scrollTop(value) {
        return arguments.length
          ? (scroller.scrollTop = value)
          : scroller.scrollTop;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    ScrollTrigger.defaults({
      scroller: scroller,
    });

    ScrollTrigger.create({
      trigger: scroller,
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const current = scroller.scrollTop;

        // scrolling down → hide immediately
        if (self.direction === 1) {
          gsap.to(navRef.current, {
            y: -80,
            duration: 0.6,
            ease: "power3.out",
          });
        }

        // scrolling up → show ONLY if at TOP
        else {
          if (current <= 10) {
            gsap.to(navRef.current, {
              y: 0,
              duration: 0.6,
              ease: "power3.out",
            });
          }
        }

        lastScroll = current;
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact-section"
      className="relative h-screen w-full overflow-hidden"
    >
      {/* 🌌 FIXED BACKGROUND */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `
    linear-gradient(rgb(0 68 114), rgb(0 98 150)),
      url(${starbg})
    `,
          backgroundBlendMode: "screen",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* 🔝 NAVBAR */}
      <nav
        ref={navRef}
        className="absolute top-0 left-0 w-full flex items-center justify-between px-10 py-5  text-white text-sm z-[40] opacity-0"
      >
        <img src={logo2} className="h-13" />

        <div className="flex gap-12">
          {[
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
            { name: "Companies", path: "/companies" },
            { name: "Contact", path: "/contact" },
          ].map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`cursor-pointer transition ${
                pathname === item.path
                  ? "text-[#D8BF4A] underline"
                  : "text-white"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </nav>

      {/* 📜 SCROLLABLE CONTENT */}
      <div
        ref={contentRef}
        className="relative z-20 h-full overflow-y-scroll"
        style={{ scrollbarWidth: "none" }}
      >
        <div className=" px-6 md:px-32 pt-24 pb-32 text-white">
          {/* --- Section 1 --- */}
          <div className="min-h-screen flex flex-col items-center text-center pt-10 pb-10">
            <h1 className=" font-semibold mb-5 " style={{ fontSize: "2.6rem" }}>
              Contact Us
            </h1>
            <p className=" max-w-xl  leading-5">
              We’d Love to Hear From You <br />
              <br /> If you have any questions, feedback, business inquiries or{" "}
              <br /> partnership opportunities, feel free to reach out. Our
              doors are <br /> always open.
            </p>

            <h2 className="text-3xl font-semibold mt-14 mb-4">
              Share Your Inquiry
            </h2>
            <p className=" mb-6">
              We're here to assist you with any inquiries or information you may
              need.
            </p>

            {/* FORM 1 */}
            <div className="w-full max-w-3xl space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  className="form-input border rounded-sm py-1 px-2 placeholder:text-white"
                  placeholder="Full Name*"
                />
                <input
                  className="form-input border rounded-sm py-1 px-2 placeholder:text-white"
                  placeholder="Email ID*"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 placeholder:text-white">
                <input
                  className="form-input border rounded-sm py-1 px-2 placeholder:text-white"
                  placeholder="Phone Number*"
                />
                <input
                  className="form-input border rounded-sm py-1 px-2 placeholder:text-white"
                  placeholder="Subject*"
                />
              </div>
              <textarea
                className="form-input h-32 w-full border rounded-sm py-1 px-2 placeholder:text-white"
                placeholder="Message*"
              ></textarea>
            </div>
          </div>

          {/* --- Section 2 --- */}
          <div className=" flex flex-col items-center text-center ">
            {/* CONTACT DETAILS */}
            <div className="flex items-center flex-col mt-10 space-y-6">
              <div className="flex gap-2 items-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 30 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M28.125 0H1.125C0.826631 0 0.540483 0.118527 0.329505 0.329505C0.118526 0.540484 0 0.826631 0 1.125V20.25C0 20.8467 0.237053 21.419 0.65901 21.841C1.08097 22.2629 1.65326 22.5 2.25 22.5H27C27.5967 22.5 28.169 22.2629 28.591 21.841C29.0129 21.419 29.25 20.8467 29.25 20.25V1.125C29.25 0.826631 29.1315 0.540484 28.9205 0.329505C28.7095 0.118527 28.4234 0 28.125 0ZM14.625 11.9742L4.01766 2.25H25.2323L14.625 11.9742ZM10.5061 11.25L2.25 18.817V3.68297L10.5061 11.25ZM12.1711 12.7758L13.8586 14.3297C14.0661 14.5202 14.3376 14.6259 14.6194 14.6259C14.9011 14.6259 15.1726 14.5202 15.3802 14.3297L17.0677 12.7758L25.2239 20.25H4.01766L12.1711 12.7758ZM18.7439 11.25L27 3.68156V18.8184L18.7439 11.25Z"
                    fill="white"
                  />
                </svg>
                <p>Phone: +971 52 SINATRA (7462872)</p>
              </div>
              <div className="flex gap-2 items-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 29 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M26.7708 18.9082L20.146 15.9396L20.1277 15.9311C19.7837 15.784 19.4086 15.725 19.0361 15.7594C18.6636 15.7937 18.3056 15.9204 17.9944 16.128C17.9577 16.1522 17.9225 16.1785 17.8889 16.2067L14.4661 19.1247C12.2977 18.0714 10.0589 15.8496 9.00564 13.7092L11.9278 10.2344C11.956 10.1992 11.9827 10.1641 12.008 10.1261C12.2111 9.81577 12.3343 9.46001 12.3667 9.09052C12.3991 8.72103 12.3396 8.34927 12.1936 8.00831V7.99143L9.21658 1.35534C9.02355 0.909931 8.69166 0.538893 8.27043 0.297613C7.84921 0.0563337 7.36124 -0.0422458 6.87939 0.0165904C4.97388 0.267334 3.2248 1.20314 1.95883 2.64922C0.692854 4.09531 -0.00343256 5.95278 1.27247e-05 7.87472C1.27247e-05 19.0403 9.08439 28.1247 20.25 28.1247C22.1719 28.1282 24.0294 27.4319 25.4755 26.1659C26.9216 24.8999 27.8574 23.1509 28.1081 21.2453C28.1671 20.7636 28.0687 20.2758 27.8277 19.8546C27.5867 19.4334 27.2159 19.1014 26.7708 18.9082ZM20.25 25.8747C15.4777 25.8695 10.9024 23.9714 7.52785 20.5969C4.15332 17.2224 2.25522 12.647 2.25001 7.87472C2.24472 6.5015 2.73946 5.1733 3.64183 4.13818C4.5442 3.10305 5.7925 2.43178 7.15361 2.24972C7.15305 2.25533 7.15305 2.26098 7.15361 2.26659L10.1067 8.87597L7.20001 12.355C7.17051 12.389 7.14371 12.4252 7.11986 12.4633C6.90824 12.788 6.78409 13.1619 6.75946 13.5487C6.73482 13.9356 6.81052 14.3222 6.97923 14.6711C8.25329 17.2769 10.8788 19.8827 13.5127 21.1553C13.8642 21.3225 14.253 21.3956 14.6412 21.3675C15.0295 21.3394 15.4037 21.211 15.7275 20.995C15.7636 20.9707 15.7984 20.9444 15.8316 20.9163L19.2502 17.9997L25.8595 20.9599C25.8595 20.9599 25.8708 20.9599 25.875 20.9599C25.6952 22.3229 25.0249 23.5737 23.9896 24.4783C22.9543 25.3829 21.6248 25.8793 20.25 25.8747Z"
                    fill="white"
                  />
                </svg>
                <p> Email: Askme@Sinatraholding.com</p>
              </div>
              <div className="flex gap-2 items-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 32 31"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.5 9C13.5 8.55499 13.632 8.11998 13.8792 7.74997C14.1264 7.37996 14.4778 7.09157 14.889 6.92127C15.3001 6.75097 15.7525 6.70642 16.189 6.79323C16.6254 6.88005 17.0263 7.09434 17.341 7.40901C17.6557 7.72368 17.87 8.12459 17.9568 8.56105C18.0436 8.9975 17.999 9.4499 17.8287 9.86104C17.6584 10.2722 17.37 10.6236 17 10.8708C16.63 11.118 16.195 11.25 15.75 11.25C15.1533 11.25 14.581 11.0129 14.159 10.591C13.7371 10.169 13.5 9.59674 13.5 9ZM6.75 9C6.75 6.61305 7.69821 4.32387 9.38604 2.63604C11.0739 0.948212 13.3631 0 15.75 0C18.1369 0 20.4261 0.948212 22.114 2.63604C23.8018 4.32387 24.75 6.61305 24.75 9C24.75 17.4305 16.6528 22.1541 16.3125 22.3523C16.1425 22.4495 15.95 22.5006 15.7542 22.5006C15.5584 22.5006 15.366 22.4495 15.1959 22.3523C14.8472 22.1541 6.75 17.4375 6.75 9ZM9 9C9 14.9344 14.04 18.8733 15.75 20.0391C17.4586 18.8747 22.5 14.9344 22.5 9C22.5 7.20979 21.7888 5.4929 20.523 4.22703C19.2571 2.96116 17.5402 2.25 15.75 2.25C13.9598 2.25 12.2429 2.96116 10.977 4.22703C9.71116 5.4929 9 7.20979 9 9ZM26.2645 18.5105C25.9876 18.419 25.6861 18.4386 25.4233 18.5652C25.1606 18.6917 24.9573 18.9154 24.8563 19.1889C24.7553 19.4625 24.7644 19.7646 24.8818 20.0315C24.9992 20.2984 25.2156 20.5094 25.4855 20.6198C27.8072 21.4791 29.25 22.6294 29.25 23.625C29.25 25.5037 24.1144 28.125 15.75 28.125C7.38562 28.125 2.25 25.5037 2.25 23.625C2.25 22.6294 3.69281 21.4791 6.01453 20.6213C6.28441 20.5108 6.50085 20.2998 6.61822 20.0329C6.73559 19.766 6.74472 19.4639 6.64369 19.1903C6.54266 18.9168 6.33937 18.6931 6.07666 18.5666C5.81395 18.44 5.51236 18.4204 5.23547 18.5119C1.85906 19.7564 0 21.5733 0 23.625C0 28.0097 8.11547 30.375 15.75 30.375C23.3845 30.375 31.5 28.0097 31.5 23.625C31.5 21.5733 29.6409 19.7564 26.2645 18.5105Z"
                    fill="white"
                  />
                </svg>
                <p>Address: Dubai, United Arab Emirates</p>
              </div>
            </div>
          </div>
        </div>
        <Footers />
      </div>
      {/* Next Section Example */}
      {/* <div id="footer" className="h-screen"></div> */}
    </section>
  );
}
