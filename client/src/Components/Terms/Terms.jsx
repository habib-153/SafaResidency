import { BiLinkExternal } from "react-icons/bi";
import { useState } from "react";

const TermsAndConditions = () => {
  const [activeTab, setActiveTab] = useState("terms");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleAcceptTerms = () => {
    setTermsAccepted(true);
  };

  const browserLinks = [
    {
      name: "Google Chrome",
      url: "#",
    },
    {
      name: "Mozilla Firefox",
      url: "#",
    },
    {
      name: "MacOS Safari",
      url: "#",
    },
    {
      name: "Microsoft Internet Explorer",
      url: "#",
    },
  ];

  const cookieLinks = [
    {
      name: "About Cookies",
      url: "http://www.aboutcookies.org/",
    },
    {
      name: "Cookie Central",
      url: "http://www.cookiecentral.com/faq/",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-center">
            Safa Residency - Legal Notices
          </h1>
          <p className="text-center text-gray-600 mt-2">
            Last Updated: November 2024
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b text-center justify-center">
          <button
            className={`px-6 py-3 ${
              activeTab === "terms"
                ? "border-b-2 border-gold text-gold"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("terms")}
          >
            Terms & Conditions
          </button>
          <button
            className={`px-6 py-3 ${
              activeTab === "cookies"
                ? "border-b-2 border-gold text-gold"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("cookies")}
          >
            Cookie Policy
          </button>
          <button
            className={`px-6 py-3 ${
              activeTab === "privacy"
                ? "border-b-2 border-gold text-gold"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("privacy")}
          >
            Privacy Notice
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6">
          {activeTab === "terms" && (
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-bold mb-4">Company Information</h2>
                <p className="text-gray-600">
                  Safa Residency
                  <br />
                  House#08, Road No-18
                  <br />
                  Nikunja-02, Khilkhet
                  <br />
                  Dhaka-1229, Bangladesh
                  <br />
                  Phone: +8801831335222
                  <br />
                  Email: info@safaresidency.com
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">
                  Advance Reservation and Guarantee
                </h2>
                <p className="text-gray-600">
                  All reservations should be made through your Company by email
                  or online request with the Hotel. The Hotel will confirm the
                  reservation subject to availability.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">Terms & Conditions</h2>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>
                    Group reservation should be made at least 5 to 10 days
                    before by written request to the Hotel.
                  </li>
                  <li>
                    Payments shall be settled by Cash / Credit Card by guests
                    during the time of check-out. In Case of Company payment,
                    will be made through Cheque / Bank Transfer in favour of
                    &quot;Safa Residency Hospitality & Tour Services&quot;.
                  </li>
                  <li>
                    Payment confirmation to be made by Cheque of the Corporate
                    Company shall inform the Hotel during reservation.
                  </li>
                  <li>
                    For long staying guest, payment to be made in every end of
                    the end.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">No Show Policy</h2>
                <p className="text-gray-600">
                  In the eventually that a guest with a confirmed reservation
                  does not arrive at the date specified, &quot;NO SHOW&quot;
                  charges will be automatically charged to the guests&apos;
                  master account (Company), towards retention of ONE NIGHT.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">
                  Cancellation Policy for Group Booking
                </h2>
                <p className="text-gray-600">
                  Cancellation should be 24 hours prior to arrival otherwise 50%
                  room charge of One Night will be posted on your account
                  billing for each of the reserved rooms. Cancellation at 02
                  (two) days prior to arrival will attract 100% charge of the
                  FIRST NIGHT for each of the reserved rooms.
                </p>
              </section>
            </div>
          )}

          {activeTab === "cookies" && (
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-bold mb-4">What Are Cookies?</h2>
                <p className="text-gray-600">
                  When you visit our Website, one or more &quot;cookies&quot;
                  are generated and deployed with your consent, if required.
                  Cookies are files or pieces of information stored on your
                  computer when you visit our Site. They help make the Site
                  easier to use and better tailor our web presence and products
                  to your interests and needs.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">Types of Cookies</h2>
                <p className="text-gray-600 mb-4">
                  Two types of cookies will be used on the Site:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>
                    <span className="font-semibold">Session cookies:</span>{" "}
                    Temporary cookies that remain on your device until you leave
                    the Site.
                  </li>
                  <li>
                    <span className="font-semibold">Persistent cookies:</span>{" "}
                    Cookies that remain on your device for much longer or until
                    you manually delete them.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">
                  Categories of Cookies
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Essential/Necessary:
                    </h3>
                    <p className="text-gray-600">
                      Cookies that are essential to making the Site work
                      correctly. They enable visitors to move around our Site
                      and use our features. These cookies prevent crashes,
                      display information, fix bugs and ensure the security of
                      our website.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Functional:</h3>
                    <p className="text-gray-600">
                      Cookies that allow our web properties to remember your
                      choices to provide a more personalized online experience.
                      If you reject these cookies, it may affect Site
                      performance.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Performance/Analytical:
                    </h3>
                    <p className="text-gray-600">
                      Cookies that help us understand how visitors interact with
                      our web properties by providing information about areas
                      visited, time spent, and any issues encountered.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Targeting/Marketing:
                    </h3>
                    <p className="text-gray-600">
                      These cookies are used to deliver adverts more relevant to
                      your interests and measure advertising campaign
                      effectiveness.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">Managing Cookies</h2>
                <p className="text-gray-600 mb-4">
                  You can manage which optional cookies are deployed on your
                  device. To do this you can set browser settings accordingly.
                  Guidance on how to control cookies for common browsers:
                </p>
                <ul className="space-y-2 mb-4">
                  {browserLinks.map((link) => (
                    <li
                      key={link.name}
                      className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <BiLinkExternal className="w-4 h-4 mr-2" />
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="text-gray-600 mb-4">
                  For additional information about cookies:
                </p>
                <ul className="space-y-2">
                  {cookieLinks.map((link) => (
                    <li
                      key={link.name}
                      className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <BiLinkExternal className="w-4 h-4 mr-2" />
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          )}

          {activeTab === "privacy" && (
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-bold mb-4">
                  Personal Information We Collect
                </h2>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>
                    Identity information (name, age, gender, passport
                    information)
                  </li>
                  <li>Contact information (address, email, phone number)</li>
                  <li>Images (CCTV images, photographs)</li>
                  <li>Financial and payment information</li>
                  <li>Reservation information</li>
                  <li>Health information (where relevant to services)</li>
                  <li>Preference information</li>
                  <li>Purchase history</li>
                  <li>Public information</li>
                  <li>Technical information</li>
                  <li>Correspondence information</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">
                  How We Use Your Information
                </h2>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>To remember your information and preferences</li>
                  <li>To recognize or identify you</li>
                  <li>To enable site functionality</li>
                  <li>To assist with reservations</li>
                  <li>To process transactions</li>
                  <li>For billing purposes</li>
                  <li>To contact you about your stays</li>
                  <li>To send newsletters and marketing communications</li>
                  <li>To personalize your experience</li>
                  <li>To conduct surveys</li>
                  <li>To analyze customer trends</li>
                  <li>For internal operations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">Your Rights</h2>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Access your personal information</li>
                  <li>Request corrections to your data</li>
                  <li>Request deletion of your data</li>
                  <li>Object to processing</li>
                  <li>Request restriction of processing</li>
                  <li>Withdraw consent</li>
                  <li>Request data portability</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                <p className="text-gray-600">
                  For questions about your personal information or privacy
                  rights, contact:
                  <br />
                  <br />
                  Corporate Guest Historian
                  <br />
                  Email: info@safaresidency.com
                  <br />
                  Phone: +8801831335222
                  <br />
                  <br />
                  Or write to:
                  <br />
                  Safa Residency
                  <br />
                  House#8, Road No-18
                  <br />
                  Nikunja-02, Khilkhet
                  <br />
                  Dhaka-1229, Bangladesh
                </p>
              </section>
            </div>
          )}
        </div>

        {/* Footer with Accept Button */}
        <div className="border-t p-6 flex flex-col md:flex-row justify-between gap-2 items-center bg-gray-50">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="accept-terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="rounded"
            />
            <label htmlFor="accept-terms" className="text-sm text-gray-600">
              I have read and accept all terms, conditions, and policies
            </label>
          </div>
          <button
            onClick={handleAcceptTerms}
            disabled={!termsAccepted}
            className={`px-6 py-2 rounded-lg ${
              termsAccepted
                ? "bg-gold text-white hover:bg-gold"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
