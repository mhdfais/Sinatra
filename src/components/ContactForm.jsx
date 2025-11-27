import pattern from "../assets/sinatra-contact-pattern.jpg";

const styles = {
  input: {
    width: "100%",
    backgroundColor: "transparent",
    border: "1px solid #4B5563",
    color: "white",
    padding: "8px 12px",
    borderRadius: "2px",
    fontSize: "0.875rem",
  },
};

const ContactForm = () => {
  return (
    <div className="w-full bg-[#0F0F0F] text-white flex ">
      {/* LEFT SIDE — 60% */}
      <div className="w-[60%] px-9 py-4">
        <h2 className="text-3xl font-bold mb-2">Get in Touch</h2>
        <p className="text-gray-300 mb-6 text-xs">
          We're here to assist you with any inquiries or information you may
          need.
        </p>

        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Full Name*"
            className="bg-transparent border border-gray-500 px-4 py-1 rounded placeholder:text-xs h-9"
          />
          <input
            type="email"
            placeholder="Email ID*"
            className="bg-transparent border border-gray-500 px-4 py-1 rounded placeholder:text-xs h-9"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 mt-3">
          <input
            type="text"
            placeholder="Phone Number*"
          className="bg-transparent border border-gray-500 px-4 py-1 rounded placeholder:text-xs h-9"
          />
          <input
            type="text"
            placeholder="subject*"
            className="bg-transparent border border-gray-500 px-4 py-1 rounded placeholder:text-xs h-9"
          />
        </div>

        <textarea
          placeholder="Enter Your Message*"
          className="bg-transparent border border-gray-500 px-4 py-2 rounded w-full h-20 mt-3 placeholder:text-xs"
        />

        <button className="mt-2 px-5 py-2 bg-[#d4b537] text-black font-semibold rounded text-sm mb-6">
          Send Message
        </button>
      </div>

      {/* RIGHT SIDE — 40% */}

      <div
        className="w-[40%] p-10 relative"
        style={{
          backgroundImage: "url('/src/assets/sinatra-contact-pattern.jpg')",
          backgroundSize: "cover",
        }}
      >
        <div className="mt-3">
        <div className="bg-[#d4b537] p-6 rounded shadow-lg relative top-10">
          {/* <p className="absolute top-2 right-4 text-xs">SCROLL TO DISCOVER ↓</p> */}

          {/* PHONE */}
          <div className="flex items-center gap-3 mb-8">
            <svg
              width="20"
              height="20"
              viewBox="0 0 29 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M26.7708 18.9082L20.146 15.9396L20.1277 15.9311C19.7837 15.784 19.4086 15.725 19.0361 15.7594C18.6636 15.7937 18.3056 15.9204 17.9944 16.128C17.9577 16.1522 17.9225 16.1785 17.8889 16.2067L14.4661 19.1247C12.2977 18.0714 10.0589 15.8496 9.00564 13.7092L11.9278 10.2344C11.956 10.1992 11.9827 10.1641 12.008 10.1261C12.2111 9.81577 12.3343 9.46001 12.3667 9.09052C12.3991 8.72103 12.3396 8.34927 12.1936 8.00831V7.99143L9.21658 1.35534C9.02355 0.909931 8.69166 0.538893 8.27043 0.297613C7.84921 0.0563337 7.36124 -0.0422458 6.87939 0.0165904C4.97388 0.267334 3.2248 1.20314 1.95883 2.64922C0.692854 4.09531 -0.00343256 5.95278 1.27247e-05 7.87472C1.27247e-05 19.0403 9.08439 28.1247 20.25 28.1247C22.1719 28.1282 24.0294 27.4319 25.4755 26.1659C26.9216 24.8999 27.8574 23.1509 28.1081 21.2453C28.1671 20.7636 28.0687 20.2758 27.8277 19.8546C27.5867 19.4334 27.2159 19.1014 26.7708 18.9082ZM20.25 25.8747C15.4777 25.8695 10.9024 23.9714 7.52785 20.5969C4.15332 17.2224 2.25522 12.647 2.25001 7.87472C2.24472 6.5015 2.73946 5.1733 3.64183 4.13818C4.5442 3.10305 5.7925 2.43178 7.15361 2.24972C7.15305 2.25533 7.15305 2.26098 7.15361 2.26659L10.1067 8.87597L7.20001 12.355C7.17051 12.389 7.14371 12.4252 7.11986 12.4633C6.90824 12.788 6.78409 13.1619 6.75946 13.5487C6.73482 13.9356 6.81052 14.3222 6.97923 14.6711C8.25329 17.2769 10.8788 19.8827 13.5127 21.1553C13.8642 21.3225 14.253 21.3956 14.6412 21.3675C15.0295 21.3394 15.4037 21.211 15.7275 20.995C15.7636 20.9707 15.7984 20.9444 15.8316 20.9163L19.2502 17.9997L25.8595 20.9599C25.8595 20.9599 25.8708 20.9599 25.875 20.9599C25.6952 22.3229 25.0249 23.5737 23.9896 24.4783C22.9543 25.3829 21.6248 25.8793 20.25 25.8747Z"
                fill="black"
              />
            </svg>

            <p className="text-black font-normal">
              Phone: +971 52 SINATRA (7462872)
            </p>
          </div>

          {/* EMAIL */}
          <div className="flex items-center gap-3 mb-8">
            <svg
              width="20"
              height="20"
              viewBox="0 0 30 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M28.125 0H1.125C0.826631 0 0.540483 0.118527 0.329505 0.329505C0.118526 0.540484 0 0.826631 0 1.125V20.25C0 20.8467 0.237053 21.419 0.65901 21.841C1.08097 22.2629 1.65326 22.5 2.25 22.5H27C27.5967 22.5 28.169 22.2629 28.591 21.841C29.0129 21.419 29.25 20.8467 29.25 20.25V1.125C29.25 0.826631 29.1315 0.540484 28.9205 0.329505C28.7095 0.118527 28.4234 0 28.125 0ZM14.625 11.9742L4.01766 2.25H25.2323L14.625 11.9742ZM10.5061 11.25L2.25 18.817V3.68297L10.5061 11.25ZM12.1711 12.7758L13.8586 14.3297C14.0661 14.5202 14.3376 14.6259 14.6194 14.6259C14.9011 14.6259 15.1726 14.5202 15.3802 14.3297L17.0677 12.7758L25.2239 20.25H4.01766L12.1711 12.7758ZM18.7439 11.25L27 3.68156V18.8184L18.7439 11.25Z"
                fill="black"
              />
            </svg>

            <p className="text-black font-normal">
              Email: Askme@Sinatraholding.com
            </p>
          </div>

          {/* ADDRESS */}
          <div className="flex items-center gap-3">
            <svg
              width="20"
              height="20"
              viewBox="0 0 32 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.5 9C13.5 8.55499 13.632 8.11998 13.8792 7.74997C14.1264 7.37996 14.4778 7.09157 14.889 6.92127C15.3001 6.75097 15.7525 6.70642 16.189 6.79323C16.6254 6.88005 17.0263 7.09434 17.341 7.40901C17.6557 7.72368 17.87 8.12459 17.9568 8.56105C18.0436 8.9975 17.999 9.4499 17.8287 9.86104C17.6584 10.2722 17.37 10.6236 17 10.8708C16.63 11.118 16.195 11.25 15.75 11.25C15.1533 11.25 14.581 11.0129 14.159 10.591C13.7371 10.169 13.5 9.59674 13.5 9ZM6.75 9C6.75 6.61305 7.69821 4.32387 9.38604 2.63604C11.0739 0.948212 13.3631 0 15.75 0C18.1369 0 20.4261 0.948212 22.114 2.63604C23.8018 4.32387 24.75 6.61305 24.75 9C24.75 17.4305 16.6528 22.1541 16.3125 22.3523C16.1425 22.4495 15.95 22.5006 15.7542 22.5006C15.5584 22.5006 15.366 22.4495 15.1959 22.3523C14.8472 22.1541 6.75 17.4375 6.75 9ZM9 9C9 14.9344 14.04 18.8733 15.75 20.0391C17.4586 18.8747 22.5 14.9344 22.5 9C22.5 7.20979 21.7888 5.4929 20.523 4.22703C19.2571 2.96116 17.5402 2.25 15.75 2.25C13.9598 2.25 12.2429 2.96116 10.977 4.22703C9.71116 5.4929 9 7.20979 9 9ZM26.2645 18.5105C25.9876 18.419 25.6861 18.4386 25.4233 18.5652C25.1606 18.6917 24.9573 18.9154 24.8563 19.1889C24.7553 19.4625 24.7644 19.7646 24.8818 20.0315C24.9992 20.2984 25.2156 20.5094 25.4855 20.6198C27.8072 21.4791 29.25 22.6294 29.25 23.625C29.25 25.5037 24.1144 28.125 15.75 28.125C7.38562 28.125 2.25 25.5037 2.25 23.625C2.25 22.6294 3.69281 21.4791 6.01453 20.6213C6.28441 20.5108 6.50085 20.2998 6.61822 20.0329C6.73559 19.766 6.74472 19.4639 6.64369 19.1903C6.54266 18.9168 6.33937 18.6931 6.07666 18.5666C5.81395 18.44 5.51236 18.4204 5.23547 18.5119C1.85906 19.7564 0 21.5733 0 23.625C0 28.0097 8.11547 30.375 15.75 30.375C23.3845 30.375 31.5 28.0097 31.5 23.625C31.5 21.5733 29.6409 19.7564 26.2645 18.5105Z"
                fill="black"
              />
            </svg>

            <p className="text-black font-normal">
              Address: Dubai, United Arab Emirates
            </p>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
