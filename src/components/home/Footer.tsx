import { 
  FaInstagram,
  FaTwitter,
  FaFacebook,
  FaLinkedin
} from "react-icons/fa"

export default function Footer() {
  const footerLinks = [
    {
      title: "About Us",
      links: ["Our Mission", "Team", "Partners"]
    },
    {
      title: "Resources",
      links: ["Blog", "Events", "FAQs"]
    },
    {
      title: "Contact",
      links: ["info@conces.org", "Support", "Partnerships"]
    },
    {
      title: "Legal",
      links: ["Terms of Service", "Privacy Policy", "Cookie Policy"]
    }
  ]

  return (
    <footer id="footer" className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h3 className="font-montserrat font-bold text-xl mb-4 md:mb-0">CONCES</h3>
          <div className="flex space-x-6">
            <span className="text-navy hover:text-gold transition-colors cursor-pointer">
              <FaInstagram className="text-xl" />
            </span>
            <span className="text-navy hover:text-gold transition-colors cursor-pointer">
              <FaTwitter className="text-xl" />
            </span>
            <span className="text-navy hover:text-gold transition-colors cursor-pointer">
              <FaFacebook className="text-xl" />
            </span>
            <span className="text-navy hover:text-gold transition-colors cursor-pointer">
              <FaLinkedin className="text-xl" />
            </span>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {footerLinks.map((section, index) => (
              <div key={index}>
                <h4 className="font-montserrat font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <span className="text-gray-600 hover:text-gold transition-colors cursor-pointer">
                        {link}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-center mt-8 text-gray-600">
            <p>© 2023 CONCES National Talent Directory. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}