import React from 'react'
import { assets, footer_data } from '../assets/assets'

function Footer() {
    return (
        <footer className="bg-emerald-50 text-gray-700">
            {/* Main Footer */}
            <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-12 grid md:grid-cols-3 gap-10 border-b border-gray-200">

                {/* Logo & About */}
                <div>
                    <img src={assets.logo} alt="Logo" className="h-12 mb-4" />
                    <p className="text-sm leading-relaxed text-gray-600">
                        This is your space to think out loud, to share what matters, and to write without
                        filters. Whether it’s one word or a thousand, your story starts right here.
                    </p>
                </div>

                {/* Links Section */}
                <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-8">
                    {footer_data.map((section, index) => (
                        <div key={index}>
                            <h3 className="text-base font-semibold text-gray-900 mb-4">{section.title}</h3>
                            <ul className="space-y-2">
                                {section.links.map((link, i) => (
                                    <li key={i}>
                                        <a
                                            href="#"
                                            className="text-sm text-gray-600 hover:text-emerald-600 transition-colors duration-200"
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="py-4 text-center text-sm md:text-base text-gray-500/80 bg-emerald-100">
                © 2025 <span className="font-semibold text-emerald-700">QuickBlog</span> — All Rights Reserved.
            </div>
        </footer>
    )
}

export default Footer
