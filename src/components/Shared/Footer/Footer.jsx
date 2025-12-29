// import React from "react";

// const Footer = () => {
//   return (
//     <div>
//       <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
//         <nav>
//           <h6 className="font-bold text-2xl">TicketBari</h6>
//           <p className="text-sm">
//             Book bus, train, launch & <br />
//             flight tickets easily.
//           </p>
//         </nav>
//         <nav>
//           <h6 className="footer-title">Quick Links</h6>
//           <a className="link link-hover">Home</a>
//           <a className="link link-hover">All Tickets</a>
//           <a className="link link-hover">Contact Us</a>
//           <a className="link link-hover">About</a>
//         </nav>
//         <nav>
//           <h6 className="footer-title">Contact Info</h6>
//           <a className="link link-hover">Email: support@ticketbari.com</a>
//           <a className="link link-hover">Phone: +880 1234-567890</a>
//           <a className="link link-hover">Facebook Page</a>
//         </nav>
//         <nav>
//           <h6 className="footer-title">Payment Method</h6>
//           <div>
//             <img
//               src="https://img.icons8.com/?size=100&id=23671&format=png"
//               alt="Stripe"
//               className="h-8"
//             />
//           </div>
//         </nav>
//       </footer>
//       <footer className="footer bg-base-200 text-base-content border-gray-400 border-t px-10 py-4">
//         <aside className="grid-flow-col items-center">
//           <img src="/logo.png" className="w-13" />
//           <p>
//             TicketBari
//             <br />
//             Online Ticket Booking App
//           </p>
//         </aside>
//         <nav className="flex gap-7 justify-between items-center w-full">
//           <div>@ 2025 TicketBari. All rights reserved.</div>
//           <div className="grid grid-flow-col gap-4">
//             <a>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 className="fill-current"
//               >
//                 <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
//               </svg>
//             </a>
//             <a>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 className="fill-current"
//               >
//                 <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
//               </svg>
//             </a>
//             <a>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 className="fill-current"
//               >
//                 <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
//               </svg>
//             </a>
//           </div>
//         </nav>
//       </footer>
//     </div>
//   );
// };

// export default Footer;


import React from "react";

const Footer = () => {
  return (
    <div className="bg-slate-900 text-slate-200"> {/* Dark background for a premium feel */}
      <footer className="footer container mx-auto p-10 py-16 grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand Section */}
        <aside className="space-y-4">
          <div className="flex items-center gap-2">
            <img src="/logo.png" className="w-10 h-10 object-contain" alt="Logo" />
            <h6 className="font-bold text-3xl tracking-tight text-white">Ticket<span className="text-primary">Bari</span></h6>
          </div>
          <p className="leading-relaxed opacity-80">
            Your trusted partner for hassle-free travel. 
            Book bus, train, launch, and flight tickets with just a few clicks.
          </p>
        </aside>

        {/* Quick Links */}
        <nav>
          <h6 className="footer-title text-white opacity-100 border-b border-primary/50 mb-4 w-12">Quick Links</h6>
          <a className="link link-hover hover:text-primary transition-colors">Home</a>
          <a className="link link-hover hover:text-primary transition-colors">All Tickets</a>
          <a className="link link-hover hover:text-primary transition-colors">Contact Us</a>
          <a className="link link-hover hover:text-primary transition-colors">About Us</a>
        </nav>

        {/* Contact Info */}
        <nav>
          <h6 className="footer-title text-white opacity-100 border-b border-primary/50 mb-4 w-12">Support</h6>
          <p className="text-sm">Email: <span className="text-white">support@ticketbari.com</span></p>
          <p className="text-sm">Phone: <span className="text-white">+880 1234-567890</span></p>
          <div className="mt-4 flex gap-3">
             {/* Social Button Style */}
             <a className="btn btn-ghost btn-sm btn-square bg-slate-800 hover:bg-primary hover:text-white transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg>
             </a>
             <a className="btn btn-ghost btn-sm btn-square bg-slate-800 hover:bg-primary hover:text-white transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
             </a>
          </div>
        </nav>

        {/* Payment & Trust */}
        <nav>
          <h6 className="footer-title text-white opacity-100 border-b border-primary/50 mb-4 w-12">Payments</h6>
          <div className="flex flex-wrap gap-2 opacity-70 grayscale hover:grayscale-0 transition-all">
            <img src="https://img.icons8.com/color/48/000000/visa.png" className="h-8 grayscale brightness-200" alt="Visa" />
            <img src="https://img.icons8.com/color/48/000000/mastercard.png" className="h-8 grayscale brightness-200" alt="Mastercard" />
            <img src="https://img.icons8.com/fluency/48/000000/stripe.png" className="h-8 grayscale brightness-200" alt="Stripe" />
          </div>
          <p className="mt-4 text-xs italic opacity-50">Secure SSL Encrypted Payment</p>
        </nav>
      </footer>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <footer className="footer container mx-auto px-10 py-6 items-center flex flex-col md:flex-row justify-between text-slate-400 text-sm">
          <aside className="flex items-center gap-4">
            <p>© 2025 <span className="text-white font-medium">TicketBari</span>. All rights reserved.</p>
          </aside> 
          <nav className="flex gap-6">
            <a className="link link-hover">Privacy Policy</a>
            <a className="link link-hover">Terms of Service</a>
            <a className="link link-hover">Cookies</a>
          </nav>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
